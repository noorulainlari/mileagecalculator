import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          created_at: string;
          is_admin: boolean;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          created_at?: string;
          is_admin?: boolean;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          created_at?: string;
          is_admin?: boolean;
        };
      };
      reminders: {
        Row: {
          id: string;
          user_id: string;
          frequency: string;
          custom_date: string | null;
          active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          frequency: string;
          custom_date?: string | null;
          active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          frequency?: string;
          custom_date?: string | null;
          active?: boolean;
          created_at?: string;
        };
      };
      admin_settings: {
        Row: {
          key: string;
          value: string;
          enabled: boolean;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: string;
          enabled?: boolean;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: string;
          enabled?: boolean;
          updated_at?: string;
        };
      };
      email_logs: {
        Row: {
          id: string;
          recipient: string;
          subject: string;
          type: string;
          sent_at: string;
        };
        Insert: {
          id?: string;
          recipient: string;
          subject: string;
          type: string;
          sent_at?: string;
        };
        Update: {
          id?: string;
          recipient?: string;
          subject?: string;
          type?: string;
          sent_at?: string;
        };
      };
      mileage_logs: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          start_location: string;
          end_location: string;
          business_purpose: string;
          start_odometer: string;
          end_odometer: string;
          total_miles: number;
          country: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          start_location: string;
          end_location: string;
          business_purpose: string;
          start_odometer?: string;
          end_odometer?: string;
          total_miles?: number;
          country?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          start_location?: string;
          end_location?: string;
          business_purpose?: string;
          start_odometer?: string;
          end_odometer?: string;
          total_miles?: number;
          country?: string;
          created_at?: string;
        };
      };
    };
  };
};