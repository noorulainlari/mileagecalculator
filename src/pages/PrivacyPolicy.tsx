import React from 'react';
import SEOHead from '../components/SEOHead';

export default function PrivacyPolicy() {
  return (
    <>
      <SEOHead 
        title="Privacy Policy - IRS Mileage Calculator"
        description="Privacy policy for IRS Mileage Calculator. Learn how we collect, use, and protect your personal information."
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
                <p className="text-gray-700 mb-4">
                  We collect information you provide directly to us, such as when you create an account, 
                  use our mileage calculator, or contact us for support.
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Account information (email address, name)</li>
                  <li>Mileage calculation data</li>
                  <li>Usage information and preferences</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
                <p className="text-gray-700 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Provide and maintain our services</li>
                  <li>Process your mileage calculations</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Improve our services and develop new features</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing</h2>
                <p className="text-gray-700">
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except as described in this privacy policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
                <p className="text-gray-700">
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-700">
                  If you have any questions about this Privacy Policy, please contact us through our 
                  contact page or email us directly.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}