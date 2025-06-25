import React, { useState, useEffect } from 'react';
import { Car, Calculator, FileText, TrendingUp, Plus, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SEOHead from '../components/SEOHead';

interface MileageRecord {
  id: string;
  date: string;
  miles: number;
  purpose: string;
  deduction: number;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [records, setRecords] = useState<MileageRecord[]>([]);
  const [newRecord, setNewRecord] = useState({
    date: new Date().toISOString().split('T')[0],
    miles: '',
    purpose: ''
  });

  const currentRate = 0.70; // 2025 business rate

  const addRecord = () => {
    if (!newRecord.miles || !newRecord.purpose) return;

    const miles = parseFloat(newRecord.miles);
    const record: MileageRecord = {
      id: Date.now().toString(),
      date: newRecord.date,
      miles,
      purpose: newRecord.purpose,
      deduction: miles * currentRate
    };

    setRecords([record, ...records]);
    setNewRecord({
      date: new Date().toISOString().split('T')[0],
      miles: '',
      purpose: ''
    });
  };

  const totalMiles = records.reduce((sum, record) => sum + record.miles, 0);
  const totalDeduction = records.reduce((sum, record) => sum + record.deduction, 0);
  const thisMonthRecords = records.filter(record => 
    new Date(record.date).getMonth() === new Date().getMonth()
  );
  const thisMonthMiles = thisMonthRecords.reduce((sum, record) => sum + record.miles, 0);

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
              <div className="bg-white rounded-2xl shadow-xl p-6">
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
            </div>

            {/* Recent Records */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Recent Records</h2>
                  <a
                    href="/mileage-log-generator"
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    Export All
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
                            <td className="py-3 text-sm text-gray-900">{record.purpose}</td>
                            <td className="py-3 text-sm text-gray-900 text-right">
                              {record.miles.toFixed(1)}
                            </td>
                            <td className="py-3 text-sm font-medium text-gray-900 text-right">
                              ${record.deduction.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
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