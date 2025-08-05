import React from 'react';
import { MessageSquare, FileSearch, Users, Brain, Shield, Clock } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: MessageSquare,
      title: 'AI Legal Chat',
      description: 'Get instant answers to legal questions with our advanced AI assistant powered by the latest legal databases.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: FileSearch,
      title: 'Document Analysis',
      description: 'Upload contracts, agreements, and legal documents for AI-powered analysis and risk assessment.',
      color: 'from-emerald-500 to-emerald-600',
    },

    {
      icon: Brain,
      title: 'Legal Knowledge Base',
      description: 'Access comprehensive legal resources, case studies, and regulatory information across all practice areas.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Shield,
      title: 'Privacy Protected',
      description: 'Attorney-client privilege protection with end-to-end encryption for all your sensitive legal matters.',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Legal guidance whenever you need it, with instant responses and round-the-clock support.',
      color: 'from-teal-500 to-teal-600',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for
            <span className="gradient-text"> Legal Success</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive legal assistance powered by cutting-edge AI technology and backed by professional expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="card p-8 group hover:scale-105 transition-all duration-300"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="mt-6 flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
                  Learn more
                  <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Legal Questions Answered</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Client Satisfaction Rate</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Always Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}