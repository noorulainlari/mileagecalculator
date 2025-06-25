import React, { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import SEOHead from '../components/SEOHead';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    // In a real app, this would send the email via an API
    console.log('Contact form submitted:', data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    reset();
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <>
      <SEOHead
        title="Contact Us – IRS Mileage Calculator 2025"
        description="Get in touch with our team for questions about the IRS mileage calculator, tax deductions, or technical support."
        keywords="contact IRS mileage calculator, tax calculator support, mileage deduction questions"
      />

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <Mail className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions about our mileage calculator or need help with tax deductions? 
              We're here to help!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Send us a Message
              </h2>

              {isSubmitted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-green-800 font-medium">Message sent successfully!</p>
                      <p className="text-green-700 text-sm">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    {...register('subject', { required: 'Please select a subject' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Question</option>
                    <option value="calculator">Calculator Help</option>
                    <option value="tax-advice">Tax Advice</option>
                    <option value="technical">Technical Support</option>
                    <option value="feedback">Feedback/Suggestions</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    {...register('message', { required: 'Message is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please describe your question or concern in detail..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* FAQ Link */}
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Quick Answers
                </h3>
                <p className="text-gray-600 mb-4">
                  Before contacting us, check our FAQ section for immediate answers to common questions 
                  about mileage deductions and our calculator.
                </p>
                <a
                  href="/faq"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Visit FAQ Section
                  <span className="ml-1">→</span>
                </a>
              </div>

              {/* Response Time */}
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Response Time
                </h3>
                <p className="text-gray-600 mb-4">
                  We typically respond to all inquiries within 24 hours during business days. 
                  For urgent technical issues, we aim to respond within 4-6 hours.
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>• Monday - Friday: Within 24 hours</p>
                  <p>• Weekends: Within 48 hours</p>
                  <p>• Urgent technical issues: 4-6 hours</p>
                </div>
              </div>

              {/* What We Can Help With */}
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  What We Can Help With
                </h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>How to use our calculator tools</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Understanding IRS mileage rates</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Technical support and bug reports</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>General questions about mileage deductions</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>Specific tax advice (consult a tax professional)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-semibold text-yellow-800 mb-2">Important Notice</h3>
            <p className="text-yellow-700 text-sm">
              We provide general information about IRS mileage deductions and help with using our calculator tools. 
              For specific tax advice, legal counsel, or complex tax situations, please consult with a qualified 
              tax professional, CPA, or tax attorney.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}