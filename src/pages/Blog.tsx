import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'irs-mileage-rates-2025-complete-guide',
    title: '2025 IRS Mileage Rates: Complete Guide for Business Deductions',
    excerpt: 'Everything you need to know about the 2025 IRS mileage rates, including changes from previous years and how to maximize your deductions.',
    author: 'Tax Expert Team',
    date: '2024-12-15',
    readTime: '8 min read',
    category: 'Tax Updates',
    image: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    slug: 'mileage-tracking-best-practices',
    title: 'Mileage Tracking Best Practices for Small Business Owners',
    excerpt: 'Learn the essential strategies for accurate mileage tracking that will help you maximize deductions and stay IRS compliant.',
    author: 'Sarah Johnson',
    date: '2024-12-10',
    readTime: '6 min read',
    category: 'Business Tips',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    slug: 'actual-expense-vs-mileage-method',
    title: 'Actual Expense vs. Mileage Method: Which is Better?',
    excerpt: 'Compare the two methods for deducting vehicle expenses and discover which approach could save you more money on your taxes.',
    author: 'Michael Chen',
    date: '2024-12-05',
    readTime: '10 min read',
    category: 'Tax Strategy',
    image: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    slug: 'common-mileage-deduction-mistakes',
    title: '7 Common Mileage Deduction Mistakes That Could Cost You',
    excerpt: 'Avoid these frequent errors that taxpayers make when claiming mileage deductions and protect yourself from IRS audits.',
    author: 'Lisa Rodriguez',
    date: '2024-11-28',
    readTime: '7 min read',
    category: 'Tax Compliance',
    image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    slug: 'home-office-mileage-deductions',
    title: 'Home Office and Mileage Deductions: What You Need to Know',
    excerpt: 'Understanding how having a home office affects your mileage deductions and what trips qualify for business use.',
    author: 'David Park',
    date: '2024-11-20',
    readTime: '9 min read',
    category: 'Home Business',
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    slug: 'quarterly-tax-planning-mileage',
    title: 'Quarterly Tax Planning: Maximizing Your Mileage Deductions',
    excerpt: 'Strategic tips for tracking and planning your mileage deductions throughout the year for optimal tax savings.',
    author: 'Jennifer Walsh',
    date: '2024-11-15',
    readTime: '5 min read',
    category: 'Tax Planning',
    image: 'https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

const categories = ['All', 'Tax Updates', 'Business Tips', 'Tax Strategy', 'Tax Compliance', 'Home Business', 'Tax Planning'];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <>
      <SEOHead 
        title="Tax & Mileage Blog - Expert Tips and Updates"
        description="Stay updated with the latest tax news, mileage deduction tips, and expert advice for maximizing your business tax savings."
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Tax & Mileage Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed with expert insights, tax updates, and practical tips 
              to maximize your mileage deductions and business tax savings.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.slug} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1" />
                      <span className="mr-3">{post.author}</span>
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <a
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts found in this category.</p>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Get the latest tax tips, mileage rate updates, and expert advice delivered 
              straight to your inbox. Never miss important tax deadlines or money-saving opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}