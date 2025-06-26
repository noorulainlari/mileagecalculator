import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, DollarSign, FileText, TrendingUp, CheckCircle, ArrowRight, Star, Users, Shield } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "IRS Mileage Calculator 2025",
    "description": "Calculate your IRS mileage deductions for business, medical, and charity miles with official 2025 rates",
    "url": "https://irs2025mileagecalculator.com",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1247"
    }
  };

  return (
    <>
      <SEOHead
        title="IRS Mileage Calculator 2025 – Calculate Your Tax Deduction"
        description="Calculate your IRS mileage deductions for 2025 tax season. Free calculator for business, medical, and charity miles using official IRS rates."
        keywords="IRS mileage calculator 2025, mileage deduction, business miles, medical miles, charity miles, tax deduction, tax calculator"
        schema={schema}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-sm font-medium">4.8/5 Rating • 1,247+ Users</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              IRS Mileage Calculator 2025
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Calculate your mileage deductions accurately using official IRS rates. 
              Track business, medical, and charity miles for maximum tax savings.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
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

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-blue-200">
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                <span className="text-sm">IRS Compliant</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span className="text-sm">1,247+ Users</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="text-sm">100% Free</span>
              </div>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-blue-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
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

            <div className="bg-green-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
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

            <div className="bg-purple-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
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

            <div className="bg-orange-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Moving Miles</h3>
              <p className="text-3xl font-bold text-orange-600 mb-2">$0.21</p>
              <p className="text-gray-600">per mile</p>
              <p className="text-sm text-gray-500 mt-2">
                For qualified moving expenses
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
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Calculator className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Accurate Calculator</h3>
              <p className="text-gray-600 mb-4">
                Calculate deductions using official IRS rates with instant results and PDF export
              </p>
              <Link to="/irs-mileage-calculator-2025" className="text-blue-600 hover:text-blue-700 inline-flex items-center">
                Try Calculator <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <FileText className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">PDF Log Generator</h3>
              <p className="text-gray-600 mb-4">
                Generate professional mileage logs for IRS compliance with email delivery
              </p>
              <Link to="/mileage-log-generator" className="text-green-600 hover:text-green-700 inline-flex items-center">
                Generate Log <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <TrendingUp className="h-10 w-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Rate History</h3>
              <p className="text-gray-600 mb-4">
                View historical IRS mileage rates from 2016 to 2025 with trend analysis
              </p>
              <Link to="/mileage-rates-history" className="text-purple-600 hover:text-purple-700 inline-flex items-center">
                View History <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Users className="h-10 w-10 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">User Dashboard</h3>
              <p className="text-gray-600 mb-4">
                Save calculations, set email reminders, and track your mileage over time
              </p>
              <Link to="/signup" className="text-indigo-600 hover:text-indigo-700 inline-flex items-center">
                Create Account <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Shield className="h-10 w-10 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">IRS Compliant</h3>
              <p className="text-gray-600 mb-4">
                All calculations follow official IRS guidelines and documentation requirements
              </p>
              <Link to="/faq" className="text-red-600 hover:text-red-700 inline-flex items-center">
                Learn More <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <CheckCircle className="h-10 w-10 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">100% Free</h3>
              <p className="text-gray-600 mb-4">
                No hidden fees, subscriptions, or premium features. All tools are completely free
              </p>
              <Link to="/about" className="text-emerald-600 hover:text-emerald-700 inline-flex items-center">
                About Us <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Thousands of Users
            </h2>
            <p className="text-lg text-gray-600">
              See what our users say about our mileage calculator
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "This calculator saved me hours during tax season. The PDF export feature is fantastic!"
              </p>
              <p className="text-sm text-gray-500">- Sarah M., Small Business Owner</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Accurate, easy to use, and completely free. Exactly what I needed for my consulting business."
              </p>
              <p className="text-sm text-gray-500">- Mike R., Consultant</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "The mileage log generator is perfect for keeping IRS-compliant records. Highly recommend!"
              </p>
              <p className="text-sm text-gray-500">- Jennifer L., Real Estate Agent</p>
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