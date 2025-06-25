import React from 'react';
import { Calculator, Target, Users, Award } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function About() {
  return (
    <>
      <SEOHead
        title="About IRS Mileage Calculator 2025 – Our Mission & Purpose"
        description="Learn about our free IRS mileage calculator tool and how we help taxpayers maximize their mileage deductions for 2025 tax season."
        keywords="about IRS mileage calculator, mileage deduction tool, tax calculator purpose, free tax tools"
      />

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              About IRS Mileage Calculator 2025
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're dedicated to helping taxpayers maximize their mileage deductions with accurate, 
              easy-to-use tools based on official IRS rates.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center mb-4">
              <Target className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to simplify the complex world of tax deductions by providing free, 
              accurate, and user-friendly tools for calculating IRS mileage deductions. We believe 
              that every taxpayer should have access to professional-grade tax calculation tools 
              without the high cost typically associated with tax software.
            </p>
          </div>

          {/* Why We Built This */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-center mb-4">
              <Calculator className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Why We Built This Tool</h2>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                After years of helping clients with tax preparation, we noticed that many people 
                were missing out on significant mileage deductions simply because they didn't 
                know how to calculate them properly or weren't aware of the current IRS rates.
              </p>
              <p>
                We created this calculator to bridge that gap, ensuring that business owners, 
                freelancers, medical patients, and volunteers can all take advantage of the 
                mileage deductions they're entitled to under IRS regulations.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <Award className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Accurate Calculations
              </h3>
              <p className="text-gray-600">
                Our calculator uses the most current IRS mileage rates for 2025, ensuring 
                your deductions are calculated with precision and compliance.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <Users className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                User-Friendly Design
              </h3>
              <p className="text-gray-600">
                We've designed our tools to be intuitive and accessible to users of all 
                technical skill levels, from first-time tax filers to experienced professionals.
              </p>
            </div>
          </div>

          {/* What Makes Us Different */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              What Makes Us Different
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-blue-600">100%</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Free Forever</h4>
                <p className="text-sm text-gray-600">
                  No hidden fees, subscriptions, or premium features. All tools are completely free.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-green-600">24/7</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Always Available</h4>
                <p className="text-sm text-gray-600">
                  Access our tools anytime, anywhere. No appointments or business hours required.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-purple-600">IRS</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">IRS Compliant</h4>
                <p className="text-sm text-gray-600">
                  All calculations based on official IRS guidelines and current tax regulations.
                </p>
              </div>
            </div>
          </div>

          {/* Our Commitment */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">
              Our Commitment to You
            </h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Keep our tools updated with the latest IRS rates and regulations
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Maintain the highest standards of accuracy and reliability
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Protect your privacy and never store your personal tax information
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Provide clear disclaimers and encourage professional tax consultation when needed
              </li>
            </ul>
          </div>

          {/* Important Notice */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-semibold text-yellow-800 mb-2">Important Legal Notice</h3>
            <p className="text-yellow-700 text-sm">
              This website and its tools are for informational purposes only and do not constitute 
              legal, financial, or tax advice. While we strive to keep our information accurate and 
              up-to-date, tax laws and regulations can change. We strongly recommend consulting with 
              a qualified tax professional or CPA for advice regarding your specific tax situation.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}