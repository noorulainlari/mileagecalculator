import React, { useState } from 'react';
import { Download, Plus, Trash2, FileText } from 'lucide-react';
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
}

export default function MileageLogGenerator() {
  const [entries, setEntries] = useState<MileageEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<Partial<MileageEntry>>({
    date: new Date().toISOString().split('T')[0],
    startLocation: '',
    endLocation: '',
    businessPurpose: '',
    startOdometer: '',
    endOdometer: '',
  });

  const calculateMiles = (start: string, end: string): number => {
    const startMiles = parseFloat(start) || 0;
    const endMiles = parseFloat(end) || 0;
    return Math.max(0, endMiles - startMiles);
  };

  const addEntry = () => {
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
    };

    setEntries([...entries, newEntry]);
    setCurrentEntry({
      date: new Date().toISOString().split('T')[0],
      startLocation: '',
      endLocation: '',
      businessPurpose: '',
      startOdometer: currentEntry.endOdometer || '',
      endOdometer: '',
    });
  };

  const removeEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const exportToCSV = () => {
    if (entries.length === 0) {
      alert('No entries to export');
      return;
    }

    const headers = ['Date', 'Start Location', 'End Location', 'Business Purpose', 'Start Odometer', 'End Odometer', 'Total Miles'];
    const csvContent = [
      headers.join(','),
      ...entries.map(entry => [
        entry.date,
        `"${entry.startLocation}"`,
        `"${entry.endLocation}"`,
        `"${entry.businessPurpose}"`,
        entry.startOdometer,
        entry.endOdometer,
        entry.totalMiles.toString()
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

  const totalMiles = entries.reduce((sum, entry) => sum + entry.totalMiles, 0);
  const currentRate = 0.70; // 2025 business rate
  const totalDeduction = totalMiles * currentRate;

  return (
    <>
      <SEOHead 
        title="Mileage Log Generator - Create IRS Compliant Mileage Records"
        description="Generate IRS-compliant mileage logs for tax deductions. Track business miles, export to CSV, and maintain proper documentation."
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Entry Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Mileage Entry</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
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
                </div>

                {currentEntry.startOdometer && currentEntry.endOdometer && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      Calculated Miles: <span className="font-semibold">
                        {calculateMiles(currentEntry.startOdometer, currentEntry.endOdometer)} miles
                      </span>
                    </p>
                  </div>
                )}

                <button
                  onClick={addEntry}
                  className="mt-6 w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Entry
                </button>
              </div>
            </div>

            {/* Summary */}
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

              <button
                onClick={exportToCSV}
                disabled={entries.length === 0}
                className="w-full flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <Download className="h-5 w-5 mr-2" />
                Export to CSV
              </button>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Miles</th>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {entry.totalMiles.toFixed(1)}
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
        </div>
      </div>
    </>
  );
}