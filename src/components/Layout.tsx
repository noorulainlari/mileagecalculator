import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CookieConsent from './CookieConsent';
import StickyCallToAction from './StickyCallToAction';
import { supabase } from '../lib/supabase';

export default function Layout() {
  const [adminSettings, setAdminSettings] = useState<Record<string, any>>({});

  useEffect(() => {
    loadAdminSettings();
  }, []);

  const loadAdminSettings = async () => {
    try {
      const { data } = await supabase
        .from('admin_settings')
        .select('*')
        .eq('enabled', true);
      
      const settings: Record<string, any> = {};
      data?.forEach(setting => {
        settings[setting.key] = setting.value;
      });
      setAdminSettings(settings);
    } catch (error) {
      console.error('Error loading admin settings:', error);
    }
  };

  useEffect(() => {
    // Inject Google Analytics
    if (adminSettings.google_analytics) {
      const script = document.createElement('script');
      script.innerHTML = adminSettings.google_analytics;
      document.head.appendChild(script);
    }

    // Inject Google Search Console verification
    if (adminSettings.google_search_console) {
      const meta = document.createElement('meta');
      meta.innerHTML = adminSettings.google_search_console;
      document.head.appendChild(meta);
    }

    // Inject custom scripts
    if (adminSettings.custom_script) {
      const script = document.createElement('script');
      script.innerHTML = adminSettings.custom_script;
      document.head.appendChild(script);
    }
  }, [adminSettings]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
        {/* AdSense placement */}
        {adminSettings.adsense_code && (
          <div 
            className="max-w-4xl mx-auto px-4 py-8"
            dangerouslySetInnerHTML={{ __html: adminSettings.adsense_code }}
          />
        )}
      </main>
      <Footer />
      <CookieConsent />
      <StickyCallToAction />
    </div>
  );
}