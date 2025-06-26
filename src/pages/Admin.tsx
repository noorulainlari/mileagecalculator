import React, { useState, useEffect } from 'react';
import { Users, FileText, TrendingUp, Settings, Shield, Code, Mail, Download, Eye, EyeOff, Save, Globe } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SEOHead from '../components/SEOHead';

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  calculationsToday: number;
  logsGenerated: number;
}

interface AdminSetting {
  key: string;
  value: string;
  enabled: boolean;
}

interface EmailLog {
  id: string;
  recipient: string;
  subject: string;
  type: string;
  sent_at: string;
}

export default function Admin() {
  const [stats] = useState<AdminStats>({
    totalUsers: 1247,
    activeUsers: 89,
    calculationsToday: 156,
    logsGenerated: 43
  });

  const [selectedTab, setSelectedTab] = useState('overview');
  const [settings, setSettings] = useState<Record<string, AdminSetting>>({});
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>('');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'scripts', label: 'Scripts & Analytics', icon: Code },
    { id: 'seo', label: 'SEO Settings', icon: Globe },
    { id: 'emails', label: 'Email Logs', icon: Mail },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'System Settings', icon: Settings }
  ];

  useEffect(() => {
    loadAdminSettings();
    loadEmailLogs();
  }, []);

  const loadAdminSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*');
      
      if (error) throw error;
      
      const settingsMap: Record<string, AdminSetting> = {};
      data?.forEach(setting => {
        settingsMap[setting.key] = setting;
      });
      setSettings(settingsMap);
    } catch (error) {
      console.error('Error loading admin settings:', error);
    }
  };

  const loadEmailLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('email_logs')
        .select('*')
        .order('sent_at', { ascending: false })
        .limit(100);
      
      if (error) throw error;
      setEmailLogs(data || []);
    } catch (error) {
      console.error('Error loading email logs:', error);
    }
  };

  const updateSetting = async (key: string, value: string, enabled: boolean) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('admin_settings')
        .upsert({
          key,
          value,
          enabled,
          updated_at: new Date().toISOString()
        });
      
      if (error) throw error;
      
      setSettings(prev => ({
        ...prev,
        [key]: { key, value, enabled }
      }));
      
      setSaveStatus('Settings saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('Error updating setting:', error);
      setSaveStatus('Error saving settings');
    } finally {
      setLoading(false);
    }
  };

  const exportEmailLogs = () => {
    const csvContent = [
      ['Date', 'Recipient', 'Subject', 'Type'].join(','),
      ...emailLogs.map(log => [
        new Date(log.sent_at).toLocaleDateString(),
        log.recipient,
        `"${log.subject}"`,
        log.type
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const ScriptToggle = ({ settingKey, label, description }: { settingKey: string, label: string, description: string }) => {
    const setting = settings[settingKey] || { key: settingKey, value: '', enabled: false };
    const [showCode, setShowCode] = useState(false);

    return (
      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-900">{label}</h4>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowCode(!showCode)}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              {showCode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={setting.enabled}
                onChange={(e) => updateSetting(settingKey, setting.value, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
        
        {showCode && (
          <div className="space-y-3">
            <textarea
              value={setting.value}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                [settingKey]: { ...setting, value: e.target.value }
              }))}
              placeholder={`Enter ${label.toLowerCase()} code here...`}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            />
            <button
              onClick={() => updateSetting(settingKey, setting.value, setting.enabled)}
              disabled={loading}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Code
            </button>
          </div>
        )}
      </div>
    );
  };

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

          {saveStatus && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">{saveStatus}</p>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="bg-white rounded-2xl shadow-xl mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-8 overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id)}
                      className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
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

              {selectedTab === 'scripts' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Scripts & Analytics Management</h2>
                  
                  <ScriptToggle
                    settingKey="google_analytics"
                    label="Google Analytics"
                    description="Google Analytics tracking code (injected in <head>)"
                  />
                  
                  <ScriptToggle
                    settingKey="google_search_console"
                    label="Google Search Console"
                    description="Google Search Console verification meta tag"
                  />
                  
                  <ScriptToggle
                    settingKey="adsense_code"
                    label="Google AdSense"
                    description="AdSense code blocks for content areas"
                  />
                  
                  <ScriptToggle
                    settingKey="custom_script"
                    label="Custom Scripts"
                    description="Custom scripts (Facebook Pixel, etc.)"
                  />

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Ads.txt Management</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Manage your ads.txt file content for AdSense compliance
                    </p>
                    <textarea
                      value={settings.ads_txt_content?.value || ''}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        ads_txt_content: { 
                          key: 'ads_txt_content', 
                          value: e.target.value, 
                          enabled: settings.ads_txt_content?.enabled || false 
                        }
                      }))}
                      placeholder="google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                    />
                    <button
                      onClick={() => updateSetting('ads_txt_content', settings.ads_txt_content?.value || '', true)}
                      disabled={loading}
                      className="mt-3 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Update ads.txt
                    </button>
                  </div>
                </div>
              )}

              {selectedTab === 'seo' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">SEO Settings</h2>
                  <div className="bg-gray-50 rounded-xl p-8 text-center">
                    <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">SEO management features coming soon</p>
                    <p className="text-sm text-gray-500 mt-2">
                      This will include meta title/description management, OpenGraph settings, and more.
                    </p>
                  </div>
                </div>
              )}

              {selectedTab === 'emails' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Email Logs</h2>
                    <button
                      onClick={exportEmailLogs}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </button>
                  </div>
                  
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {emailLogs.map((log) => (
                            <tr key={log.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {new Date(log.sent_at).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-900">{log.recipient}</td>
                              <td className="px-6 py-4 text-sm text-gray-900">{log.subject}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  log.type === 'calculation' ? 'bg-blue-100 text-blue-800' :
                                  log.type === 'log' ? 'bg-green-100 text-green-800' :
                                  'bg-purple-100 text-purple-800'
                                }`}>
                                  {log.type}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {emailLogs.length === 0 && (
                      <div className="text-center py-12">
                        <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No email logs found</p>
                      </div>
                    )}
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