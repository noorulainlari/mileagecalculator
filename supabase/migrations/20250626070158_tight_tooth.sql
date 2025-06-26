/*
  # Admin Settings and Email Logs

  1. New Tables
    - `admin_settings`
      - `key` (text, primary key) - Setting identifier
      - `value` (text) - Setting value
      - `enabled` (boolean) - Whether setting is active
      - `updated_at` (timestamp)
    
    - `email_logs`
      - `id` (uuid, primary key)
      - `recipient` (text) - Email address
      - `subject` (text) - Email subject
      - `type` (text) - Type of email (calculation, log, reminder)
      - `sent_at` (timestamp)
    
    - `mileage_logs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `date` (date)
      - `start_location` (text)
      - `end_location` (text)
      - `business_purpose` (text)
      - `start_odometer` (text)
      - `end_odometer` (text)
      - `total_miles` (numeric)
      - `country` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Admin-only access for admin_settings and email_logs
*/

-- Admin Settings Table
CREATE TABLE IF NOT EXISTS admin_settings (
  key text PRIMARY KEY,
  value text NOT NULL DEFAULT '',
  enabled boolean DEFAULT false,
  updated_at timestamptz DEFAULT now()
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
      AND users.is_admin = true
    )
  );

-- Email Logs Table
CREATE TABLE IF NOT EXISTS email_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient text NOT NULL,
  subject text NOT NULL,
  type text NOT NULL CHECK (type IN ('calculation', 'log', 'reminder')),
  sent_at timestamptz DEFAULT now()
);

ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin only access to email logs"
  ON email_logs
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.is_admin = true
    )
  );

-- Mileage Logs Table
CREATE TABLE IF NOT EXISTS mileage_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  date date NOT NULL,
  start_location text NOT NULL,
  end_location text NOT NULL,
  business_purpose text NOT NULL,
  start_odometer text DEFAULT '0',
  end_odometer text DEFAULT '0',
  total_miles numeric DEFAULT 0,
  country text DEFAULT 'United States',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE mileage_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own mileage logs"
  ON mileage_logs
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

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
CREATE INDEX IF NOT EXISTS idx_mileage_logs_date ON mileage_logs(date);
CREATE INDEX IF NOT EXISTS idx_email_logs_sent_at ON email_logs(sent_at);