import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, DollarSign, FileText, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "IRS Mileage Calculator 2025",
    "description": "Calculate your IRS mileage deductions for business, medical, and charity miles with official 2025 rates",
    "url": window.location.origin,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser"
  };

  return (
    <>
      <SEOHead
        title="IRS Mileage Calculator 2025 – Calculate Your Tax Deduction"
        description="Calculate your IRS mileage deductions for 2025 tax season. Free calculator for business, medical, and charity miles using official IRS rates."
        keywords="IRS mileage calculator 2025, mileage deduction, business miles, medical miles, charity miles, tax deduction"
        schema={schema}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              IRS Mileage Calculator 2025
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Calculate your mileage deductions accurately using official IRS rates. 
              Track business, medical, and charity miles for maximum tax savings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/irs-mileage-calculator-2025"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Start Calculating
              </Link>
              <Link
                to="/mileage-log-generator"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
              >
                <FileText className="h-5 w-5 mr-2" />
                Generate Mileage Log
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2025 Rates Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Official IRS Mileage Rates for 2025
            </h2>
            <p className="text-lg text-gray-600">
              Use these IRS-approved rates for your tax deductions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-8 rounded-xl text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Miles</h3>
              <p className="text-3xl font-bold text-blue-600 mb-2">$0.70</p>
              <p className="text-gray-600">per mile</p>
              <p className="text-sm text-gray-500 mt-2">
                For business-related travel and transportation
              </p>
            </div>

            <div className="bg-green-50 p-8 rounded-xl text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Medical Miles</h3>
              <p className="text-3xl font-bold text-green-600 mb-2">$0.21</p>
              <p className="text-gray-600">per mile</p>
              <p className="text-sm text-gray-500 mt-2">
                For medical appointments and treatments
              </p>
            </div>

            <div className="bg-purple-50 p-8 rounded-xl text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Charity Miles</h3>
              <p className="text-3xl font-bold text-purple-600 mb-2">$0.14</p>
              <p className="text-gray-600">per mile</p>
              <p className="text-sm text-gray-500 mt-2">
                For charitable organization work and volunteering
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need for Mileage Tracking
            </h2>
            <p className="text-lg text-gray-600">
              Professional tools to maximize your tax deductions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Calculator className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Accurate Calculator</h3>
              <p className="text-gray-600 mb-4">
                Calculate deductions using official IRS rates with instant results
              </p>
              <Link to="/irs-mileage-calculator-2025" className="text-blue-600 hover:text-blue-700 inline-flex items-center">
                Try Calculator <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <FileText className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">PDF Log Generator</h3>
              <p className="text-gray-600 mb-4">
                Generate professional mileage logs for IRS compliance
              </p>
              <Link to="/mileage-log-generator" className="text-green-600 hover:text-green-700 inline-flex items-center">
                Generate Log <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <TrendingUp className="h-10 w-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Rate History</h3>
              <p className="text-gray-600 mb-4">
                View historical IRS mileage rates from 2007 to 2025
              </p>
              <Link to="/mileage-rates-history" className="text-purple-600 hover:text-purple-700 inline-flex items-center">
                View History <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Tracking Your Mileage Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who save money on taxes with our free tools
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/irs-mileage-calculator-2025"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Calculate Deductions
            </Link>
            <Link
              to="/signup"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}