import { supabase } from '../lib/supabase';

interface EmailData {
  to: string;
  subject: string;
  html: string;
  type: 'calculation' | 'log' | 'reminder';
}

export const sendEmail = async (emailData: EmailData) => {
  try {
    // Call the edge function
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: emailData
    });

    if (error) throw error;

    // Log the email in our database
    const { error: logError } = await supabase
      .from('email_logs')
      .insert([
        {
          recipient: emailData.to,
          subject: emailData.subject,
          type: emailData.type,
          sent_at: new Date().toISOString(),
        }
      ]);

    if (logError) console.error('Error logging email:', logError);
    
    return { success: true, data };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
};

export const generateCalculationEmail = (data: any) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .result { background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>IRS Mileage Calculator 2025</h1>
            <p>Your Mileage Deduction Calculation</p>
        </div>
        <div class="content">
            <h2>Calculation Results</h2>
            <div class="result">
                <h3>Business Miles: ${data.businessMiles || 0}</h3>
                <p>Deduction: $${((data.businessMiles || 0) * 0.70).toFixed(2)}</p>
            </div>
            <div class="result">
                <h3>Medical Miles: ${data.medicalMiles || 0}</h3>
                <p>Deduction: $${((data.medicalMiles || 0) * 0.21).toFixed(2)}</p>
            </div>
            <div class="result">
                <h3>Charity Miles: ${data.charityMiles || 0}</h3>
                <p>Deduction: $${((data.charityMiles || 0) * 0.14).toFixed(2)}</p>
            </div>
            <div class="result">
                <h3>Total Deduction: $${data.totalDeduction?.toFixed(2) || '0.00'}</h3>
            </div>
        </div>
        <div class="footer">
            <p>This calculation is for informational purposes only. Please consult with a tax professional.</p>
            <p>© 2025 IRS Mileage Calculator. All rights reserved.</p>
        </div>
    </body>
    </html>
  `;
};