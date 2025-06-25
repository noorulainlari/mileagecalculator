import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';
import SEOHead from '../components/SEOHead';

interface BlogPostData {
  slug: string;
  title: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  excerpt: string;
}

const blogPostsData: Record<string, BlogPostData> = {
  'irs-mileage-rates-2025-complete-guide': {
    slug: 'irs-mileage-rates-2025-complete-guide',
    title: '2025 IRS Mileage Rates: Complete Guide for Business Deductions',
    excerpt: 'Everything you need to know about the 2025 IRS mileage rates, including changes from previous years and how to maximize your deductions.',
    author: 'Tax Expert Team',
    date: '2024-12-15',
    readTime: '8 min read',
    category: 'Tax Updates',
    image: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1200',
    content: `
      <p>The IRS has announced the official mileage rates for 2025, and there are some important changes that business owners and taxpayers need to know about. This comprehensive guide will walk you through everything you need to understand about the new rates and how they affect your tax deductions.</p>

      <h2>2025 IRS Mileage Rates</h2>
      <p>For the 2025 tax year, the IRS has set the following standard mileage rates:</p>
      <ul>
        <li><strong>Business use:</strong> 70 cents per mile (up from 67 cents in 2024)</li>
        <li><strong>Medical or moving purposes:</strong> 21 cents per mile (unchanged from 2024)</li>
        <li><strong>Charitable purposes:</strong> 14 cents per mile (unchanged from 2024)</li>
      </ul>

      <h2>What Changed from 2024?</h2>
      <p>The most significant change is the increase in the business mileage rate from 67 cents to 70 cents per mile. This 3-cent increase reflects rising vehicle operating costs, including fuel, maintenance, insurance, and depreciation.</p>

      <h2>How to Calculate Your Deduction</h2>
      <p>Calculating your mileage deduction is straightforward:</p>
      <ol>
        <li>Track all your business miles throughout the year</li>
        <li>Multiply your total business miles by the applicable rate (70 cents for 2025)</li>
        <li>The result is your total mileage deduction</li>
      </ol>

      <p>For example, if you drove 10,000 business miles in 2025, your deduction would be: 10,000 × $0.70 = $7,000</p>

      <h2>Record Keeping Requirements</h2>
      <p>The IRS requires detailed records for mileage deductions. You must maintain:</p>
      <ul>
        <li>Date of each trip</li>
        <li>Starting and ending locations</li>
        <li>Business purpose of the trip</li>
        <li>Odometer readings (start and end)</li>
        <li>Total miles driven</li>
      </ul>

      <h2>Tips for Maximizing Your Deduction</h2>
      <p>To get the most from your mileage deduction:</p>
      <ul>
        <li>Use a mileage tracking app or maintain a detailed log</li>
        <li>Track miles immediately after each trip</li>
        <li>Include all business-related travel, including trips to the bank, post office, or supply stores</li>
        <li>Consider the home office deduction if you work from home</li>
      </ul>

      <h2>Common Mistakes to Avoid</h2>
      <p>Don't make these costly errors:</p>
      <ul>
        <li>Forgetting to track miles consistently</li>
        <li>Including personal or commuting miles</li>
        <li>Using outdated mileage rates</li>
        <li>Failing to maintain proper documentation</li>
      </ul>

      <p>The 2025 mileage rate increase is good news for business owners and self-employed individuals. Make sure you're taking advantage of this valuable deduction by maintaining accurate records and understanding the rules.</p>
    `
  }
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug || !blogPostsData[slug]) {
    return <Navigate to="/blog" replace />;
  }

  const post = blogPostsData[slug];

  return (
    <>
      <SEOHead 
        title={`${post.title} - IRS Mileage Calculator Blog`}
        description={post.excerpt}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <a
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </a>

          <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Hero Image */}
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="p-8 md:p-12">
              {/* Category Badge */}
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                {post.category}
              </span>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Call to Action */}
              <div className="mt-12 p-6 bg-blue-50 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Ready to Calculate Your Mileage Deduction?
                </h3>
                <p className="text-gray-700 mb-4">
                  Use our free IRS mileage calculator to estimate your tax savings with the latest 2025 rates.
                </p>
                <a
                  href="/irs-mileage-calculator-2025"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Try Calculator Now
                </a>
              </div>
            </div>
          </article>

          {/* Related Articles */}
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <a href="/blog/mileage-tracking-best-practices" className="group">
                <div className="flex items-start space-x-4">
                  <img
                    src="https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=200"
                    alt="Mileage tracking"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      Mileage Tracking Best Practices
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Essential strategies for accurate mileage tracking
                    </p>
                  </div>
                </div>
              </a>
              
              <a href="/blog/actual-expense-vs-mileage-method" className="group">
                <div className="flex items-start space-x-4">
                  <img
                    src="https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=200"
                    alt="Tax calculation"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      Actual Expense vs. Mileage Method
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Compare methods to find the best tax savings
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}