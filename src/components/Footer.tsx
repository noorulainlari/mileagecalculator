import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Mail, FileText, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Calculator className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">IRS Mileage Calculator 2025</span>
            </div>
            <p className="text-gray-400 mb-4">
              Calculate your IRS mileage deductions accurately for the 2025 tax season. 
              Track business, medical, and charity miles with our free tools.
            </p>
            <p className="text-sm text-gray-500">
              <strong>Disclaimer:</strong> This tool is for informational purposes only and does not constitute legal or financial advice. 
              Please consult with a tax professional for specific tax situations.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/irs-mileage-calculator-2025" className="text-gray-400 hover:text-white transition-colors">
                  Mileage Calculator
                </Link>
              </li>
              <li>
                <Link to="/mileage-log-generator" className="text-gray-400 hover:text-white transition-colors">
                  Log Generator
                </Link>
              </li>
              <li>
                <Link to="/mileage-rates-history" className="text-gray-400 hover:text-white transition-colors">
                  Rates History
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 mb-4 sm:mb-0">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
          <div className="text-gray-400 text-sm">
            © 2025 IRS Mileage Calculator. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}