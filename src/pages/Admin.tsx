import React, { useState } from 'react';
import { Users, FileText, TrendingUp, Settings, Shield } from 'lucide-react';
import SEOHead from '../components/SEOHead';

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  calculationsToday: number;
  logsGenerated: number;
}

export default function Admin() {
  const [stats] = useState<AdminStats>({
    totalUsers: 1247,
    activeUsers: 89,
    calculationsToday: 156,
    logsGenerated: 43
  });

  const [selectedTab, setSelectedTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <>
      <SEOHead 
        title="Admin Dashboard - IRS Mileage Calculator"
        description="Administrative dashboard for managing users, content, and system settings."
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Shield className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-2xl shadow-xl mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-8">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id)}
                      className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        selectedTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-2" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-8">
              {selectedTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">System Overview</h2>
                  
                  {/* Stats Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-blue-50 rounded-xl p-6">
                      <div className="flex items-center">
                        <Users className="h-8 w-8 text-blue-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-blue-600">Total Users</p>
                          <p className="text-2xl font-bold text-blue-900">{stats.totalUsers.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-6">
                      <div className="flex items-center">
                        <TrendingUp className="h-8 w-8 text-green-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-green-600">Active Today</p>
                          <p className="text-2xl font-bold text-green-900">{stats.activeUsers}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-6">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-purple-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-purple-600">Calculations</p>
                          <p className="text-2xl font-bold text-purple-900">{stats.calculationsToday}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 rounded-xl p-6">
                      <div className="flex items-center">
                        <Settings className="h-8 w-8 text-amber-600" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-amber-600">Logs Generated</p>
                          <p className="text-2xl font-bold text-amber-900">{stats.logsGenerated}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2">
                        <span className="text-gray-700">New user registration</span>
                        <span className="text-sm text-gray-500">2 minutes ago</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-gray-700">Mileage calculation completed</span>
                        <span className="text-sm text-gray-500">5 minutes ago</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-gray-700">Log exported to CSV</span>
                        <span className="text-sm text-gray-500">12 minutes ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'users' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>
                  <div className="bg-gray-50 rounded-xl p-8 text-center">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">User management features coming soon</p>
                  </div>
                </div>
              )}

              {selectedTab === 'content' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Content Management</h2>
                  <div className="bg-gray-50 rounded-xl p-8 text-center">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Content management features coming soon</p>
                  </div>
                </div>
              )}

              {selectedTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">System Settings</h2>
                  <div className="bg-gray-50 rounded-xl p-8 text-center">
                    <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">System settings coming soon</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}