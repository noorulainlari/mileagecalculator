/*
  # Database Schema Setup for IRS Mileage Calculator

  1. New Tables
    - `admin_settings` - Store admin configuration settings
    - `email_logs` - Track sent emails for audit purposes  
    - `mileage_logs` - Store user mileage entries with full details

  2. Security
    - Enable RLS on all tables
    - Admin-only access for settings and email logs
    - User-specific access for mileage logs

  3. Performance
    - Add indexes for common queries
    - Optimize for user lookups and date ranges
*/

-- Check if admin_settings table exists, if not create it
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'admin_settings') THEN
    CREATE TABLE admin_settings (
      key text PRIMARY KEY,
      value text NOT NULL DEFAULT '',
      enabled boolean DEFAULT false,
      updated_at timestamptz DEFAULT now()
    );
  END IF;
END $$;

-- Enable RLS and create policy for admin_settings
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists and create new one
DROP POLICY IF EXISTS "Admin only access to settings" ON admin_settings;
CREATE POLICY "Admin only access to settings"
  ON admin_settings
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.email = auth.email() 
      AND users.role = 'admin'
    )
  );

-- Check if email_logs table exists, if not create it
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'email_logs') THEN
    CREATE TABLE email_logs (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      recipient text NOT NULL,
      subject text NOT NULL,
      type text NOT NULL CHECK (type IN ('calculation', 'log', 'reminder')),
      sent_at timestamptz DEFAULT now()
    );
  END IF;
END $$;

-- Enable RLS and create policy for email_logs
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists and create new one
DROP POLICY IF EXISTS "Admin only access to email logs" ON email_logs;
CREATE POLICY "Admin only access to email logs"
  ON email_logs
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.email = auth.email() 
      AND users.role = 'admin'
    )
  );

-- Handle mileage_logs table - add user_id column if it doesn't exist
DO $$ 
BEGIN
  -- Add user_id column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'mileage_logs' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE mileage_logs ADD COLUMN user_id uuid REFERENCES users(id) ON DELETE CASCADE;
  END IF;

  -- Add other missing columns
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'mileage_logs' AND column_name = 'date'
  ) THEN
    ALTER TABLE mileage_logs ADD COLUMN date date;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'mileage_logs' AND column_name = 'start_location'
  ) THEN
    ALTER TABLE mileage_logs ADD COLUMN start_location text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'mileage_logs' AND column_name = 'end_location'
  ) THEN
    ALTER TABLE mileage_logs ADD COLUMN end_location text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'mileage_logs' AND column_name = 'business_purpose'
  ) THEN
    ALTER TABLE mileage_logs ADD COLUMN business_purpose text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'mileage_logs' AND column_name = 'start_odometer'
  ) THEN
    ALTER TABLE mileage_logs ADD COLUMN start_odometer text DEFAULT '0';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'mileage_logs' AND column_name = 'end_odometer'
  ) THEN
    ALTER TABLE mileage_logs ADD COLUMN end_odometer text DEFAULT '0';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'mileage_logs' AND column_name = 'created_at'
  ) THEN
    ALTER TABLE mileage_logs ADD COLUMN created_at timestamptz DEFAULT now();
  END IF;
END $$;

-- Enable RLS for mileage_logs
ALTER TABLE mileage_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists and create new one
DROP POLICY IF EXISTS "Users can manage their own mileage logs" ON mileage_logs;
CREATE POLICY "Users can manage their own mileage logs"
  ON mileage_logs
  FOR ALL
  TO authenticated
  USING (
    auth.uid()::text = user_id::text OR 
    user_email = auth.email()
  );

-- Insert default admin settings
INSERT INTO admin_settings (key, value, enabled) VALUES
  ('google_analytics', '', false),
  ('google_search_console', '', false),
  ('adsense_code', '', false),
  ('ads_txt_content', '', false),
  ('custom_script', '', false),
  ('custom_script_location', 'head', false)
ON CONFLICT (key) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_mileage_logs_user_id ON mileage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_mileage_logs_user_email ON mileage_logs(user_email);
CREATE INDEX IF NOT EXISTS idx_mileage_logs_date ON mileage_logs(date);
CREATE INDEX IF NOT EXISTS idx_email_logs_sent_at ON email_logs(sent_at);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);