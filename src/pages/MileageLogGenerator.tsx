import React, { useState, useEffect } from 'react';
import { Download, Plus, Trash2, FileText, Send, Globe } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { sendEmail } from '../components/EmailService';
import SEOHead from '../components/SEOHead';

interface MileageEntry {
  id: string;
  date: string;
  startLocation: string;
  endLocation: string;
  businessPurpose: string;
  startOdometer: string;
  endOdometer: string;
  totalMiles: number;
  country: string;
}

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 
  'Italy', 'Spain', 'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Sweden',
  'Norway', 'Denmark', 'Finland', 'Ireland', 'Portugal', 'Greece', 'Poland',
  'Czech Republic', 'Hungary', 'Slovakia', 'Slovenia', 'Croatia', 'Romania',
  'Bulgaria', 'Lithuania', 'Latvia', 'Estonia', 'Luxembourg', 'Malta', 'Cyprus'
];

export default function MileageLogGenerator() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<MileageEntry[]>([]);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<Partial<MileageEntry>>({
    date: new Date().toISOString().split('T')[0],
    startLocation: '',
    endLocation: '',
    businessPurpose: '',
    startOdometer: '',
    endOdometer: '',
    country: 'United States',
  });

  useEffect(() => {
    if (user) {
      loadUserEntries();
    }
  }, [user]);

  const loadUserEntries = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('mileage_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });
      
      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error loading entries:', error);
    }
  };

  const calculateMiles = (start: string, end: string): number => {
    const startMiles = parseFloat(start) || 0;
    const endMiles = parseFloat(end) || 0;
    return Math.max(0, endMiles - startMiles);
  };

  const addEntry = async () => {
    if (!currentEntry.date || !currentEntry.startLocation || !currentEntry.endLocation || !currentEntry.businessPurpose) {
      alert('Please fill in all required fields');
      return;
    }

    const totalMiles = calculateMiles(currentEntry.startOdometer || '0', currentEntry.endOdometer || '0');
    
    const newEntry: MileageEntry = {
      id: Date.now().toString(),
      date: currentEntry.date!,
      startLocation: currentEntry.startLocation!,
      endLocation: currentEntry.endLocation!,
      businessPurpose: currentEntry.businessPurpose!,
      startOdometer: currentEntry.startOdometer || '0',
      endOdometer: currentEntry.endOdometer || '0',
      totalMiles,
      country: currentEntry.country || 'United States',
    };

    // Save to Supabase if user is logged in
    if (user) {
      try {
        const { error } = await supabase
          .from('mileage_logs')
          .insert([{
            ...newEntry,
            user_id: user.id,
          }]);
        
        if (error) throw error;
      } catch (error) {
        console.error('Error saving entry:', error);
      }
    }

    setEntries([newEntry, ...entries]);
    setCurrentEntry({
      date: new Date().toISOString().split('T')[0],
      startLocation: '',
      endLocation: '',
      businessPurpose: '',
      startOdometer: currentEntry.endOdometer || '',
      endOdometer: '',
      country: currentEntry.country || 'United States',
    });
  };

  const removeEntry = async (id: string) => {
    if (user) {
      try {
        const { error } = await supabase
          .from('mileage_logs')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);
        
        if (error) throw error;
      } catch (error) {
        console.error('Error deleting entry:', error);
      }
    }
    
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const generatePDF = () => {
    if (entries.length === 0) {
      alert('No entries to export');
      return;
    }

    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(37, 99, 235);
    doc.text('Mileage Log Report - 2025', 20, 30);
    
    // Date and branding
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('irs2025mileagecalculator.com', 20, 55);
    
    // Summary
    const totalMiles = entries.reduce((sum, entry) => sum + entry.totalMiles, 0);
    const estimatedDeduction = totalMiles * 0.70; // Using business rate
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Total Miles: ${totalMiles.toFixed(1)}`, 20, 75);
    doc.text(`Estimated Business Deduction: $${estimatedDeduction.toFixed(2)}`, 20, 90);
    
    // Table header
    let yPos = 110;
    doc.setFontSize(10);
    doc.text('Date', 20, yPos);
    doc.text('From', 50, yPos);
    doc.text('To', 90, yPos);
    doc.text('Purpose', 130, yPos);
    doc.text('Miles', 170, yPos);
    
    // Draw line
    doc.line(20, yPos + 2, 190, yPos + 2);
    yPos += 10;
    
    // Table content
    entries.slice(0, 25).forEach((entry) => { // Limit to 25 entries per page
      if (yPos > 270) {
        doc.addPage();
        yPos = 30;
      }
      
      doc.text(new Date(entry.date).toLocaleDateString(), 20, yPos);
      doc.text(entry.startLocation.substring(0, 15), 50, yPos);
      doc.text(entry.endLocation.substring(0, 15), 90, yPos);
      doc.text(entry.businessPurpose.substring(0, 20), 130, yPos);
      doc.text(entry.totalMiles.toFixed(1), 170, yPos);
      yPos += 8;
    });
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('This log is for tax record-keeping purposes. Consult a tax professional for advice.', 20, 280);
    
    doc.save(`mileage-log-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const exportToCSV = () => {
    if (entries.length === 0) {
      alert('No entries to export');
      return;
    }

    const headers = ['Date', 'Start Location', 'End Location', 'Business Purpose', 'Start Odometer', 'End Odometer', 'Total Miles', 'Country'];
    const csvContent = [
      headers.join(','),
      ...entries.map(entry => [
        entry.date,
        `"${entry.startLocation}"`,
        `"${entry.endLocation}"`,
        `"${entry.businessPurpose}"`,
        entry.startOdometer,
        entry.endOdometer,
        entry.totalMiles.toString(),
        `"${entry.country}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mileage-log-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSendEmail = async () => {
    if (!email || entries.length === 0) return;
    
    setLoading(true);
    try {
      const totalMiles = entries.reduce((sum, entry) => sum + entry.totalMiles, 0);
      const estimatedDeduction = totalMiles * 0.70;
      
      const emailData = {
        to: email,
        subject: 'Your Mileage Log Report - 2025',
        html: generateLogEmail(entries, totalMiles, estimatedDeduction),
        type: 'log' as const
      };
      
      const result = await sendEmail(emailData);
      if (result.success) {
        setEmailSent(true);
        setTimeout(() => setEmailSent(false), 5000);
      }
    } catch (error) {
      console.error('Failed to send email:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateLogEmail = (entries: MileageEntry[], totalMiles: number, estimatedDeduction: number) => {
    const entriesHtml = entries.slice(0, 10).map(entry => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${new Date(entry.date).toLocaleDateString()}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${entry.startLocation}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${entry.endLocation}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${entry.businessPurpose}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${entry.totalMiles.toFixed(1)}</td>
      </tr>
    `).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; }
              table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              th { background: #f3f4f6; padding: 10px; border: 1px solid #ddd; }
              .summary { background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0; }
              .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #666; }
          </style>
      </head>
      <body>
          <div class="header">
              <h1>IRS Mileage Calculator 2025</h1>
              <p>Your Mileage Log Report</p>
          </div>
          <div class="content">
              <div class="summary">
                  <h3>Summary</h3>
                  <p><strong>Total Entries:</strong> ${entries.length}</p>
                  <p><strong>Total Miles:</strong> ${totalMiles.toFixed(1)}</p>
                  <p><strong>Estimated Business Deduction:</strong> $${estimatedDeduction.toFixed(2)}</p>
              </div>
              
              <h3>Recent Entries</h3>
              <table>
                  <thead>
                      <tr>
                          <th>Date</th>
                          <th>From</th>
                          <th>To</th>
                          <th>Purpose</th>
                          <th>Miles</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${entriesHtml}
                  </tbody>
              </table>
              
              ${entries.length > 10 ? `<p><em>Showing first 10 entries. Total entries: ${entries.length}</em></p>` : ''}
          </div>
          <div class="footer">
              <p>This log is for tax record-keeping purposes. Please consult with a tax professional.</p>
              <p>© 2025 IRS Mileage Calculator. All rights reserved.</p>
          </div>
      </body>
      </html>
    `;
  };

  const totalMiles = entries.reduce((sum, entry) => sum + entry.totalMiles, 0);
  const currentRate = 0.70; // 2025 business rate
  const totalDeduction = totalMiles * currentRate;

  return (
    <>
      <SEOHead 
        title="Mileage Log Generator - Create IRS Compliant Mileage Records"
        description="Generate IRS-compliant mileage logs for tax deductions. Track business miles, export to PDF/CSV, and maintain proper documentation."
        keywords="mileage log generator, IRS mileage tracking, business mileage log, tax record keeping, mileage documentation"
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">
                Mileage Log Generator
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create IRS-compliant mileage logs for your business travel. 
              Track your trips and export professional documentation for tax purposes.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Entry Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Mileage Entry</h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={currentEntry.date || ''}
                      onChange={(e) => setCurrentEntry({...currentEntry, date: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <select
                        value={currentEntry.country || 'United States'}
                        onChange={(e) => setCurrentEntry({...currentEntry, country: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {countries.map(country => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Purpose *
                    </label>
                    <input
                      type="text"
                      placeholder="Client meeting, conference, etc."
                      value={currentEntry.businessPurpose || ''}
                      onChange={(e) => setCurrentEntry({...currentEntry, businessPurpose: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Location *
                    </label>
                    <input
                      type="text"
                      placeholder="Office, home, etc."
                      value={currentEntry.startLocation || ''}
                      onChange={(e) => setCurrentEntry({...currentEntry, startLocation: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Location *
                    </label>
                    <input
                      type="text"
                      placeholder="Client office, venue, etc."
                      value={currentEntry.endLocation || ''}
                      onChange={(e) => setCurrentEntry({...currentEntry, endLocation: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Odometer
                    </label>
                    <input
                      type="number"
                      placeholder="Starting mileage"
                      value={currentEntry.startOdometer || ''}
                      onChange={(e) => setCurrentEntry({...currentEntry, startOdometer: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Odometer
                    </label>
                    <input
                      type="number"
                      placeholder="Ending mileage"
                      value={currentEntry.endOdometer || ''}
                      onChange={(e) => setCurrentEntry({...currentEntry, endOdometer: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Miles
                    </label>
                    <input
                      type="number"
                      placeholder="Or enter manually"
                      value={currentEntry.startOdometer && currentEntry.endOdometer ? 
                        calculateMiles(currentEntry.startOdometer, currentEntry.endOdometer) : ''}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Deduction
                    </label>
                    <input
                      type="text"
                      value={currentEntry.startOdometer && currentEntry.endOdometer ? 
                        `$${(calculateMiles(currentEntry.startOdometer, currentEntry.endOdometer) * currentRate).toFixed(2)}` : '$0.00'}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                </div>

                <button
                  onClick={addEntry}
                  className="mt-6 w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Entry
                </button>
              </div>
            </div>

            {/* Summary & Actions */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Entries:</span>
                    <span className="font-semibold">{entries.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Miles:</span>
                    <span className="font-semibold">{totalMiles.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rate (2025):</span>
                    <span className="font-semibold">${currentRate.toFixed(3)}/mile</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="text-gray-900 font-semibold">Est. Deduction:</span>
                    <span className="font-bold text-green-600">${totalDeduction.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Export Options</h3>
                <div className="space-y-3">
                  <button
                    onClick={generatePDF}
                    disabled={entries.length === 0}
                    className="w-full flex items-center justify-center px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download PDF
                  </button>
                  
                  <button
                    onClick={exportToCSV}
                    disabled={entries.length === 0}
                    className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Export CSV
                  </button>
                </div>
              </div>

              {/* Email Section */}
              {entries.length > 0 && (
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Email Report</h3>
                  <div className="space-y-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleSendEmail}
                      disabled={!email || loading}
                      className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
                    >
                      {loading ? (
                        'Sending...'
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Report
                        </>
                      )}
                    </button>
                    {emailSent && (
                      <p className="text-green-600 text-sm text-center">
                        ✓ Email sent successfully!
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Entries Table */}
          {entries.length > 0 && (
            <div className="mt-12 bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="px-8 py-6 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Mileage Entries</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Miles</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deduction</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {entries.map((entry) => (
                      <tr key={entry.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(entry.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{entry.startLocation}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{entry.endLocation}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{entry.businessPurpose}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{entry.country}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {entry.totalMiles.toFixed(1)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          ${(entry.totalMiles * currentRate).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => removeEntry(entry.id)}
                            className="text-red-600 hover:text-red-900 transition-colors duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!user && (
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Save Your Data
              </h3>
              <p className="text-blue-800 mb-4">
                Create a free account to automatically save your mileage entries and access them from any device.
              </p>
              <a
                href="/signup"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Free Account
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}