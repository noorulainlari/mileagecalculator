import React, { useState } from 'react';
import { Calculator as CalcIcon, Download, Mail } from 'lucide-react';
import { jsPDF } from 'jspdf';
import SEOHead from '../components/SEOHead';

interface MileageData {
  businessMiles: number;
  medicalMiles: number;
  charityMiles: number;
}

export default function Calculator() {
  const [mileageData, setMileageData] = useState<MileageData>({
    businessMiles: 0,
    medicalMiles: 0,
    charityMiles: 0,
  });

  // 2025 IRS Rates
  const rates = {
    business: 0.70,
    medical: 0.21,
    charity: 0.14,
  };

  const businessDeduction = mileageData.businessMiles * rates.business;
  const medicalDeduction = mileageData.medicalMiles * rates.medical;
  const charityDeduction = mileageData.charityMiles * rates.charity;
  const totalDeduction = businessDeduction + medicalDeduction + charityDeduction;

  const handleInputChange = (field: keyof MileageData, value: string) => {
    const numValue = parseFloat(value) || 0;
    setMileageData(prev => ({
      ...prev,
      [field]: numValue,
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('IRS Mileage Deduction Calculation - 2025', 20, 30);
    
    // Date
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);
    
    // Results
    doc.setFontSize(14);
    doc.text('Mileage Summary:', 20, 65);
    
    doc.setFontSize(12);
    let yPos = 80;
    
    if (mileageData.businessMiles > 0) {
      doc.text(`Business Miles: ${mileageData.businessMiles} @ $${rates.business}/mile = $${businessDeduction.toFixed(2)}`, 20, yPos);
      yPos += 15;
    }
    
    if (mileageData.medicalMiles > 0) {
      doc.text(`Medical Miles: ${mileageData.medicalMiles} @ $${rates.medical}/mile = $${medicalDeduction.toFixed(2)}`, 20, yPos);
      yPos += 15;
    }
    
    if (mileageData.charityMiles > 0) {
      doc.text(`Charity Miles: ${mileageData.charityMiles} @ $${rates.charity}/mile = $${charityDeduction.toFixed(2)}`, 20, yPos);
      yPos += 15;
    }
    
    // Total
    yPos += 10;
    doc.setFontSize(14);
    doc.text(`Total Deduction: $${totalDeduction.toFixed(2)}`, 20, yPos);
    
    // Disclaimer
    yPos += 30;
    doc.setFontSize(10);
    doc.text('Disclaimer: This calculation is for informational purposes only.', 20, yPos);
    doc.text('Please consult with a tax professional for specific tax advice.', 20, yPos + 10);
    
    doc.save('mileage-deduction-calculation.pdf');
  };

  const saveToLocalStorage = () => {
    const calculationData = {
      ...mileageData,
      businessDeduction,
      medicalDeduction,
      charityDeduction,
      totalDeduction,
      timestamp: new Date().toISOString(),
    };
    
    const existingData = localStorage.getItem('mileageCalculations');
    const calculations = existingData ? JSON.parse(existingData) : [];
    calculations.unshift(calculationData);
    
    // Keep only last 10 calculations
    if (calculations.length > 10) {
      calculations.splice(10);
    }
    
    localStorage.setItem('mileageCalculations', JSON.stringify(calculations));
    alert('Calculation saved to your recent calculations!');
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Calculator",
    "name": "IRS Mileage Deduction Calculator 2025",
    "description": "Calculate tax deductions for business, medical, and charity mileage using official IRS rates",
    "url": window.location.href
  };

  return (
    <>
      <SEOHead
        title="IRS Mileage Deduction Calculator 2025 – Free Tax Calculator"
        description="Calculate your IRS mileage deductions for business, medical, and charity miles. Free calculator using official 2025 IRS rates."
        keywords="IRS mileage deduction calculator, business mileage calculator, medical miles deduction, charity mileage, 2025 tax calculator"
        schema={schema}
      />

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <CalcIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              IRS Mileage Calculator 2025
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Calculate your mileage deductions using the official IRS rates for 2025. 
              Enter your miles for business, medical, and charity purposes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Enter Your Mileage
              </h2>
              
              <div className="space-y-6">
                {/* Business Miles */}
                <div>
                  <label htmlFor="businessMiles" className="block text-sm font-medium text-gray-700 mb-2">
                    Business Miles
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="businessMiles"
                      min="0"
                      step="0.1"
                      value={mileageData.businessMiles || ''}
                      onChange={(e) => handleInputChange('businessMiles', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter business miles"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 text-sm">@ $0.70/mile</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Miles driven for business purposes, client visits, business trips
                  </p>
                </div>

                {/* Medical Miles */}
                <div>
                  <label htmlFor="medicalMiles" className="block text-sm font-medium text-gray-700 mb-2">
                    Medical Miles
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="medicalMiles"
                      min="0"
                      step="0.1"
                      value={mileageData.medicalMiles || ''}
                      onChange={(e) => handleInputChange('medicalMiles', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter medical miles"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 text-sm">@ $0.21/mile</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Miles driven for medical appointments, treatments, pharmacy visits
                  </p>
                </div>

                {/* Charity Miles */}
                <div>
                  <label htmlFor="charityMiles" className="block text-sm font-medium text-gray-700 mb-2">
                    Charity Miles
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="charityMiles"
                      min="0"
                      step="0.1"
                      value={mileageData.charityMiles || ''}
                      onChange={(e) => handleInputChange('charityMiles', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter charity miles"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 text-sm">@ $0.14/mile</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Miles driven for charitable organizations, volunteer work
                  </p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Your Deductions
              </h2>
              
              <div className="space-y-4 mb-8">
                {mileageData.businessMiles > 0 && (
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Business Deduction</p>
                      <p className="text-sm text-gray-600">{mileageData.businessMiles} miles × $0.70</p>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">
                      ${businessDeduction.toFixed(2)}
                    </p>
                  </div>
                )}

                {mileageData.medicalMiles > 0 && (
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Medical Deduction</p>
                      <p className="text-sm text-gray-600">{mileageData.medicalMiles} miles × $0.21</p>
                    </div>
                    <p className="text-2xl font-bold text-green-600">
                      ${medicalDeduction.toFixed(2)}
                    </p>
                  </div>
                )}

                {mileageData.charityMiles > 0 && (
                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Charity Deduction</p>
                      <p className="text-sm text-gray-600">{mileageData.charityMiles} miles × $0.14</p>
                    </div>
                    <p className="text-2xl font-bold text-purple-600">
                      ${charityDeduction.toFixed(2)}
                    </p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
                    <div>
                      <p className="text-xl font-bold text-gray-900">Total Deduction</p>
                      <p className="text-sm text-gray-600">All categories combined</p>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">
                      ${totalDeduction.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {totalDeduction > 0 && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={generatePDF}
                    className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download PDF
                  </button>
                  <button
                    onClick={saveToLocalStorage}
                    className="flex-1 bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Save Calculation
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
            <p className="text-yellow-700 text-sm">
              This calculator is for informational purposes only and does not constitute legal or financial advice. 
              The IRS has specific requirements for mileage deductions, including proper record-keeping. 
              Please consult with a qualified tax professional for advice regarding your specific tax situation.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}