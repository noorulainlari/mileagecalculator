import React from 'react';
import SEOHead from '../components/SEOHead';

export default function TermsOfService() {
  return (
    <>
      <SEOHead 
        title="Terms of Service - IRS Mileage Calculator"
        description="Terms of service for IRS Mileage Calculator. Read our terms and conditions for using our service."
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
                <p className="text-gray-700">
                  By accessing and using this website, you accept and agree to be bound by the terms 
                  and provision of this agreement.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Use License</h2>
                <p className="text-gray-700 mb-4">
                  Permission is granted to temporarily download one copy of the materials on our website 
                  for personal, non-commercial transitory viewing only.
                </p>
                <p className="text-gray-700">This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose or for any public display</li>
                  <li>attempt to reverse engineer any software contained on the website</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Disclaimer</h2>
                <p className="text-gray-700">
                  The materials on our website are provided on an 'as is' basis. We make no warranties, 
                  expressed or implied, and hereby disclaim and negate all other warranties including 
                  without limitation, implied warranties or conditions of merchantability, fitness for 
                  a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitations</h2>
                <p className="text-gray-700">
                  In no event shall our company or its suppliers be liable for any damages (including, 
                  without limitation, damages for loss of data or profit, or due to business interruption) 
                  arising out of the use or inability to use the materials on our website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Revisions</h2>
                <p className="text-gray-700">
                  We may revise these terms of service at any time without notice. By using this website, 
                  you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}