import React from 'react';
import { TrendingUp, Calendar } from 'lucide-react';
import SEOHead from '../components/SEOHead';

interface MileageRate {
  year: number;
  business: number;
  medical: number;
  charitable: number;
}

const mileageRatesHistory: MileageRate[] = [
  { year: 2025, business: 0.70, medical: 0.21, charitable: 0.14 },
  { year: 2024, business: 0.67, medical: 0.21, charitable: 0.14 },
  { year: 2023, business: 0.655, medical: 0.22, charitable: 0.14 },
  { year: 2022, business: 0.625, medical: 0.22, charitable: 0.14 },
  { year: 2021, business: 0.56, medical: 0.16, charitable: 0.14 },
  { year: 2020, business: 0.575, medical: 0.17, charitable: 0.14 },
  { year: 2019, business: 0.58, medical: 0.20, charitable: 0.14 },
  { year: 2018, business: 0.545, medical: 0.18, charitable: 0.14 },
  { year: 2017, business: 0.535, medical: 0.17, charitable: 0.14 },
  { year: 2016, business: 0.54, medical: 0.19, charitable: 0.14 },
];

export default function MileageRatesHistory() {
  return (
    <>
      <SEOHead 
        title="IRS Mileage Rates History - Historical Rates 2016-2025"
        description="Complete history of IRS mileage rates from 2016 to 2025. Track changes in business, medical, and charitable mileage deduction rates over time."
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">
                IRS Mileage Rates History
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Track the evolution of IRS mileage rates from 2016 to 2025. 
              See how business, medical, and charitable mileage deduction rates have changed over time.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-8 py-6 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Historical Mileage Rates (Per Mile)
                </h2>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Tax Year
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Business Use
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Medical/Moving
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Charitable
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Change from Previous Year
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mileageRatesHistory.map((rate, index) => {
                    const previousRate = mileageRatesHistory[index + 1];
                    const change = previousRate 
                      ? ((rate.business - previousRate.business) / previousRate.business * 100).toFixed(1)
                      : null;
                    const isIncrease = change && parseFloat(change) > 0;
                    const isDecrease = change && parseFloat(change) < 0;

                    return (
                      <tr key={rate.year} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {rate.year}
                          {rate.year === 2025 && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Current
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                          ${rate.business.toFixed(3)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          ${rate.medical.toFixed(3)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          ${rate.charitable.toFixed(3)}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {change ? (
                            <span className={`inline-flex items-center ${
                              isIncrease ? 'text-green-600' : isDecrease ? 'text-red-600' : 'text-gray-500'
                            }`}>
                              {isIncrease ? '+' : ''}{change}%
                            </span>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Key Insights
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Business mileage rates have generally increased over time, reflecting rising vehicle costs
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  The charitable rate has remained stable at $0.14 per mile since 2018
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Medical/moving rates fluctuate more than business rates due to policy changes
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Important Notes
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Rates are typically announced in December for the following tax year
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Mid-year rate changes are rare but can occur during economic volatility
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Always use the rate for the year the miles were driven, not the filing year
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}