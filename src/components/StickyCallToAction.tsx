import React, { useState, useEffect } from 'react';
import { Calculator, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StickyCallToAction() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 300;
      setIsVisible(scrolled && !isDismissed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="bg-blue-600 text-white rounded-lg shadow-lg p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Calculator className="h-5 w-5 mr-2" />
          <span className="font-medium">Calculate Your Deduction</span>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            to="/irs-mileage-calculator-2025"
            className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium"
          >
            Start
          </Link>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-white hover:text-gray-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}