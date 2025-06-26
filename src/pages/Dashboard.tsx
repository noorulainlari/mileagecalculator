import React, { useState, useEffect } from 'react';
import { Car, Calculator, FileText, TrendingUp, Plus, Calendar, Bell, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import NewsletterSignup from '../components/NewsletterSignup';
import SEOHead from '../components/SEOHead';

interface MileageRecord {
  id: string;
  date: string;
  total_miles: number;
  business_purpose: string;
  start_location: string;
  end_location: string;
}

interface Reminder {
  id: string;
  frequency: string;
  custom_date: string | null;
  active: boolean;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [records, setRecords] = useState<MileageRecord[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newRecord, setNewRecord] = useState({
    date: new Date().toISOString().split('T')[0],
    miles: '',
    purpose: '',
    startLocation: '',
    endLocation: ''
  });
  const [reminderFrequency, setReminderFrequency] = useState('weekly');
  const [customDate, setCustomDate] = useState('');

  const currentRate = 0.70; // 2025 business rate

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;

    try {
      // Load mileage records
      const { data: mileageData } = await supabase
        .from('mileage_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(10);

      if (mileageData) {
        setRecords(mileageData);
      }

      // Load reminders
      const { data: reminderData } = await supabase
        .from('reminders')
        .select('*')
        .eq('user_id', user.id);

      if (reminderData) {
        setReminders(reminderData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const addRecord = async () => {
    if (!newRecord.miles || !newRecord.purpose || !user) return;

    try {
      const miles = parseFloat(newRecord.miles);
      const recordData = {
        user_id: user.id,
        date: newRecord.date,
        total_miles: miles,
        business_purpose: newRecord.purpose,
        start_location: newRecord.startLocation || 'Not specified',
        end_location: newRecord.endLocation || 'Not specified',
        start_odometer: '0',
        end_odometer: miles.toString(),
        country: 'United States'
      };

      const { data, error } = await supabase
        .from('mileage_logs')
        .insert([recordData])
        .select()
        .single();

      if (error) throw error;

      setRecords([data, ...records]);
      setNewRecord({
        date: new Date().toISOString().split('T')[0],
        miles: '',
        purpose: '',
        startLocation: '',
        endLocation: ''
      });
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  const addReminder = async () => {
    if (!user) return;

    try {
      const reminderData = {
        user_id: user.id,
        frequency: reminderFrequency,
        custom_date: reminderFrequency === 'custom' ? customDate : null,
        active: true
      };

      const { data, error } = await supabase
        .from('reminders')
        .insert([reminderData])
        .select()
        .single();

      if (error) throw error;

      setReminders([...reminders, data]);
      setReminderFrequency('weekly');
      setCustomDate('');
    } catch (error) {
      console.error('Error adding reminder:', error);
    }
  };

  const toggleReminder = async (id: string, active: boolean) => {
    try {
      const { error } = await supabase
        .from('reminders')
        .update({ active })
        .eq('id', id);

      if (error) throw error;

      setReminders(reminders.map(r => 
        r.id === id ? { ...r, active } : r
      ));
    } catch (error) {
      console.error('Error updating reminder:', error);
    }
  };

  const totalMiles = records.reduce((sum, record) => sum + record.total_miles, 0);
  const totalDeduction = totalMiles * currentRate;
  const thisMonthRecords = records.filter(record => 
    new Date(record.date).getMonth() === new Date().getMonth()
  );
  const thisMonthMiles = thisMonthRecords.reduce((sum, record) => sum + record.total_miles, 0);

  return (
    <>
      <SEOHead 
        title="Dashboard - IRS Mileage Calculator"
        description="Track your mileage, calculate deductions, and manage your business travel records."
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.email?.split('@')[0]}!
            </h1>
            <p className="text-gray-600 mt-2">
              Track your mileage and manage your tax deductions
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Car className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Miles</p>
                  <p className="text-2xl font-bold text-gray-900">{totalMiles.toFixed(1)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Calculator className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Deduction</p>
                  <p className="text-2xl font-bold text-gray-900">${totalDeduction.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">{thisMonthMiles.toFixed(1)} mi</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <FileText className="h-6 w-6 text-amber-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Records</p>
                  <p className="text-2xl font-bold text-gray-900">{records.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Add New Record */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Add Mileage Record</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newRecord.date}
                      onChange={(e) => setNewRecord({...newRecord, date: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Miles
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Enter miles"
                      value={newRecord.miles}
                      onChange={(e) => setNewRecord({...newRecord, miles: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Purpose
                    </label>
                    <input
                      type="text"
                      placeholder="Client meeting, conference, etc."
                      value={newRecord.purpose}
                      onChange={(e) => setNewRecord({...newRecord, purpose: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Location
                    </label>
                    <input
                      type="text"
                      placeholder="Office, home, etc."
                      value={newRecord.startLocation}
                      onChange={(e) => setNewRecord({...newRecord, startLocation: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Location
                    </label>
                    <input
                      type="text"
                      placeholder="Client office, venue, etc."
                      value={newRecord.endLocation}
                      onChange={(e) => setNewRecord({...newRecord, endLocation: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {newRecord.miles && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        Estimated Deduction: <span className="font-semibold">
                          ${(parseFloat(newRecord.miles || '0') * currentRate).toFixed(2)}
                        </span>
                      </p>
                    </div>
                  )}

                  <button
                    onClick={addRecord}
                    className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Record
                  </button>
                </div>
              </div>

              {/* Email Reminders */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  <Bell className="h-5 w-5 inline mr-2" />
                  Email Reminders
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Frequency
                    </label>
                    <select
                      value={reminderFrequency}
                      onChange={(e) => setReminderFrequency(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="custom">Custom Date</option>
                    </select>
                  </div>

                  {reminderFrequency === 'custom' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Custom Date
                      </label>
                      <input
                        type="date"
                        value={customDate}
                        onChange={(e) => setCustomDate(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  <button
                    onClick={addReminder}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add Reminder
                  </button>
                </div>

                {/* Active Reminders */}
                {reminders.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Active Reminders</h4>
                    <div className="space-y-2">
                      {reminders.map((reminder) => (
                        <div key={reminder.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-700 capitalize">
                            {reminder.frequency}
                            {reminder.custom_date && ` - ${new Date(reminder.custom_date).toLocaleDateString()}`}
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={reminder.active}
                              onChange={(e) => toggleReminder(reminder.id, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Records */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Recent Records</h2>
                  <a
                    href="/mileage-log-generator"
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    View All & Export
                  </a>
                </div>

                {records.length === 0 ? (
                  <div className="text-center py-12">
                    <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No mileage records yet</p>
                    <p className="text-sm text-gray-400">Add your first record to get started</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 text-sm font-medium text-gray-600">Date</th>
                          <th className="text-left py-3 text-sm font-medium text-gray-600">Purpose</th>
                          <th className="text-left py-3 text-sm font-medium text-gray-600">Route</th>
                          <th className="text-right py-3 text-sm font-medium text-gray-600">Miles</th>
                          <th className="text-right py-3 text-sm font-medium text-gray-600">Deduction</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {records.slice(0, 10).map((record) => (
                          <tr key={record.id} className="hover:bg-gray-50">
                            <td className="py-3 text-sm text-gray-900">
                              {new Date(record.date).toLocaleDateString()}
                            </td>
                            <td className="py-3 text-sm text-gray-900">{record.business_purpose}</td>
                            <td className="py-3 text-sm text-gray-600">
                              {record.start_location} → {record.end_location}
                            </td>
                            <td className="py-3 text-sm text-gray-900 text-right">
                              {record.total_miles.toFixed(1)}
                            </td>
                            <td className="py-3 text-sm font-medium text-gray-900 text-right">
                              ${(record.total_miles * currentRate).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Newsletter Signup */}
              <NewsletterSignup />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <a
              href="/irs-mileage-calculator-2025"
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <Calculator className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Mileage Calculator</h3>
              </div>
              <p className="text-gray-600">Calculate your tax deductions with current IRS rates</p>
            </a>

            <a
              href="/mileage-log-generator"
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <FileText className="h-8 w-8 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Log Generator</h3>
              </div>
              <p className="text-gray-600">Create detailed mileage logs for tax purposes</p>
            </a>

            <a
              href="/mileage-rates-history"
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Rate History</h3>
              </div>
              <p className="text-gray-600">View historical IRS mileage rates and trends</p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}