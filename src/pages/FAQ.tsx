import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SEOHead from '../components/SEOHead';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is the current IRS mileage rate for 2025?",
    answer: "The IRS mileage rate for 2025 is 70 cents per mile for business use, 21 cents per mile for medical or moving purposes, and 14 cents per mile for charitable purposes."
  },
  {
    question: "How do I calculate my mileage deduction?",
    answer: "Simply multiply your total business miles by the current IRS mileage rate. For example, if you drove 1,000 business miles in 2025, your deduction would be 1,000 × $0.70 = $700."
  },
  {
    question: "What records do I need to keep for mileage deductions?",
    answer: "You should keep a detailed log including the date, destination, business purpose, starting and ending odometer readings, and total miles for each trip. Our mileage log generator can help you create proper documentation."
  },
  {
    question: "Can I deduct mileage for commuting to work?",
    answer: "No, commuting from your home to your regular workplace is considered personal travel and is not deductible. However, travel between different work locations or from your home office to client meetings may be deductible."
  },
  {
    question: "What's the difference between actual expense method and mileage method?",
    answer: "The mileage method uses the standard IRS rate per mile, while the actual expense method involves tracking all vehicle-related costs (gas, maintenance, insurance, etc.) and deducting the business percentage. You cannot use both methods for the same vehicle in the same year."
  },
  {
    question: "Do mileage rates change during the year?",
    answer: "Typically, the IRS sets mileage rates once per year, but in exceptional circumstances (like significant fuel price changes), they may adjust rates mid-year. Always check for the most current rates."
  },
  {
    question: "Can I use this calculator for tax preparation?",
    answer: "Our calculator provides estimates based on current IRS rates. While it's a helpful tool for planning and record-keeping, always consult with a tax professional for official tax preparation and advice."
  },
  {
    question: "What if I use my vehicle for both business and personal use?",
    answer: "You can only deduct the business portion of your vehicle use. Keep detailed records separating business miles from personal miles. Only the business miles qualify for the mileage deduction."
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <>
      <SEOHead 
        title="FAQ - IRS Mileage Calculator"
        description="Frequently asked questions about IRS mileage rates, deductions, and how to use our mileage calculator."
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">
              Get answers to common questions about IRS mileage rates and deductions
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {faqData.map((item, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  className="w-full px-8 py-6 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50"
                  onClick={() => toggleItem(index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {item.question}
                    </h3>
                    {openItems.includes(index) ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    )}
                  </div>
                </button>
                {openItems.includes(index) && (
                  <div className="px-8 pb-6">
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? We're here to help.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
}