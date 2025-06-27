/*
  # Database schema update for admin features

  1. New Tables
    - `admin_settings` - Store admin configuration settings
    - `email_logs` - Track sent emails for audit purposes
    - Update `mileage_logs` table structure to match application needs

  2. Security
    - Enable RLS on all new tables
    - Add policies for admin access to settings and email logs
    - Add policies for user access to their own mileage logs

  3. Performance
    - Add indexes for frequently queried columns
*/

-- Admin Settings Table
CREATE TABLE IF NOT EXISTS admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  content text,
  enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin only access to settings"
  ON admin_settings
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Email Logs Table (if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'email_logs') THEN
    CREATE TABLE email_logs (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      recipient text NOT NULL,
      subject text NOT NULL,
      type text NOT NULL CHECK (type IN ('calculation', 'log', 'reminder')),
      sent_at timestamptz DEFAULT now()
    );
  END IF;
END $$;

-- Enable RLS on email_logs if it exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'email_logs') THEN
    ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Create policy for email_logs if table exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'email_logs') THEN
    -- Drop existing policy if it exists
    DROP POLICY IF EXISTS "Admin only access to email logs" ON email_logs;
    
    CREATE POLICY "Admin only access to email logs"
      ON email_logs
      FOR ALL
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM users 
          WHERE users.id = auth.uid() 
          AND users.role = 'admin'
        )
      );
  END IF;
END $$;

-- Update mileage_logs table structure if needed
DO $$
BEGIN
  -- Add user_email column if it doesn't exist (for compatibility)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'mileage_logs' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE mileage_logs ADD COLUMN user_id uuid REFERENCES users(id) ON DELETE CASCADE;
  END IF;

  -- Add date column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'mileage_logs' AND column_name = 'date'
  ) THEN
    ALTER TABLE mileage_logs ADD COLUMN date date;
  END IF;

  -- Add start_location column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'mileage_logs' AND column_name = 'start_location'
  ) THEN
    ALTER TABLE mileage_logs ADD COLUMN start_location text;
  END IF;

  -- Add end_location column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'mileage_logs' AND column_name = 'end_location'
  ) THEN
    ALTER TABLE mileage_logs ADD COLUMN end_location text;
  END IF;

  -- Add business_purpose column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'mileage_logs' AND column_name = 'business_purpose'
  ) THEN
    ALTER TABLE mileage_logs ADD COLUMN business_purpose text;
  END IF;

  -- Add start_odometer column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'mileage_logs' AND column_name = 'start_odometer'
  ) THEN
    ALTER TABLE mileage_logs ADD COLUMN start_odometer text DEFAULT '0';
  END IF;

  -- Add end_odometer column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'mileage_logs' AND column_name = 'end_odometer'
  ) THEN
    ALTER TABLE mileage_logs ADD COLUMN end_odometer text DEFAULT '0';
  END IF;

  -- Add total_miles column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'mileage_logs' AND column_name = 'total_miles'
  ) THEN
    ALTER TABLE mileage_logs ADD COLUMN total_miles numeric DEFAULT 0;
  END IF;
END $$;

-- Enable RLS on mileage_logs
ALTER TABLE mileage_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Users can manage their own mileage logs" ON mileage_logs;

CREATE POLICY "Users can manage their own mileage logs"
  ON mileage_logs
  FOR ALL
  TO authenticated
  USING (auth.uid()::text = user_email OR auth.uid() = user_id);

-- Create reminders table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'reminders') THEN
    CREATE TABLE reminders (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      email text,
      pdf_url text,
      sent boolean DEFAULT false,
      created_at timestamptz DEFAULT now()
    );
  END IF;
END $$;

-- Enable RLS on reminders
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;

-- Create policy for reminders
DROP POLICY IF EXISTS "Users can manage their own reminders" ON reminders;

CREATE POLICY "Users can manage their own reminders"
  ON reminders
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.email = reminders.email 
      AND users.id = auth.uid()
    )
  );

-- Insert default admin settings
INSERT INTO admin_settings (type, content, enabled) VALUES
  ('google_analytics', '', false),
  ('google_search_console', '', false),
  ('adsense_code', '', false),
  ('ads_txt_content', '', false),
  ('custom_script', '', false)
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_mileage_logs_user_id ON mileage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_mileage_logs_user_email ON mileage_logs(user_email);
CREATE INDEX IF NOT EXISTS idx_mileage_logs_date ON mileage_logs(date);
CREATE INDEX IF NOT EXISTS idx_mileage_logs_created_at ON mileage_logs(created_at);

-- Create index on email_logs if table exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'email_logs') THEN
    CREATE INDEX IF NOT EXISTS idx_email_logs_sent_at ON email_logs(sent_at);
    CREATE INDEX IF NOT EXISTS idx_email_logs_recipient ON email_logs(recipient);
  END IF;
END $$;

-- Create indexes on admin_settings
CREATE INDEX IF NOT EXISTS idx_admin_settings_type ON admin_settings(type);
CREATE INDEX IF NOT EXISTS idx_admin_settings_enabled ON admin_settings(enabled);

-- Create indexes on reminders
CREATE INDEX IF NOT EXISTS idx_reminders_email ON reminders(email);
CREATE INDEX IF NOT EXISTS idx_reminders_sent ON reminders(sent);