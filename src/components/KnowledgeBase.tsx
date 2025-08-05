import React, { useState } from 'react';
import { Search, Book, FileText, Scale, Building, Heart, Car, Home, Briefcase, Shield } from 'lucide-react';

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: Book, color: 'bg-gray-500' },
    { id: 'business', name: 'Business Law', icon: Building, color: 'bg-blue-500' },
    { id: 'family', name: 'Family Law', icon: Heart, color: 'bg-pink-500' },
    { id: 'personal-injury', name: 'Personal Injury', icon: Car, color: 'bg-red-500' },
    { id: 'real-estate', name: 'Real Estate', icon: Home, color: 'bg-green-500' },
    { id: 'employment', name: 'Employment', icon: Briefcase, color: 'bg-purple-500' },
    { id: 'criminal', name: 'Criminal Defense', icon: Shield, color: 'bg-orange-500' },
  ];

  const articles = [
    {
      id: 1,
      title: 'Understanding Contract Basics: What Makes an Agreement Legally Binding',
      excerpt: 'Learn the essential elements of a valid contract including offer, acceptance, consideration, and capacity.',
      category: 'business',
      readTime: '5 min read',
      difficulty: 'Beginner',
      tags: ['Contracts', 'Business Law', 'Legal Basics'],
    },
    {
      id: 2,
      title: 'Tenant Rights and Responsibilities: A Complete Guide',
      excerpt: 'Comprehensive overview of tenant rights, security deposits, lease agreements, and eviction procedures.',
      category: 'real-estate',
      readTime: '8 min read',  
      difficulty: 'Intermediate',
      tags: ['Landlord-Tenant', 'Property Rights', 'Housing'],
    },
    {
      id: 3,
      title: 'Starting an LLC: Step-by-Step Business Formation Guide',
      excerpt: 'Everything you need to know about forming a Limited Liability Company, from paperwork to tax implications.',
      category: 'business',
      readTime: '10 min read',
      difficulty: 'Intermediate',
      tags: ['LLC', 'Business Formation', 'Entrepreneurship'],
    },
    {
      id: 4,
      title: 'Divorce Process: What to Expect and How to Prepare',
      excerpt: 'Navigate the divorce process with confidence. Learn about asset division, custody, and legal requirements.',
      category: 'family',
      readTime: '12 min read',
      difficulty: 'Advanced',
      tags: ['Divorce', 'Child Custody', 'Family Court'],
    },
    {
      id: 5,
      title: 'Workplace Harassment: Know Your Rights and Legal Options',
      excerpt: 'Understanding workplace harassment laws, reporting procedures, and legal remedies available to employees.',
      category: 'employment',
      readTime: '7 min read',
      difficulty: 'Intermediate',
      tags: ['Harassment', 'Employment Rights', 'Workplace Law'],
    },
    {
      id: 6,
      title: 'Car Accident Claims: Maximizing Your Personal Injury Settlement',
      excerpt: 'Essential steps to take after a car accident and how to work with insurance companies and attorneys.',
      category: 'personal-injury',
      readTime: '9 min read',
      difficulty: 'Intermediate',
      tags: ['Car Accidents', 'Insurance Claims', 'Personal Injury'],
    },
  ];

  const featuredResources = [
    {
      title: 'Legal Document Templates',
      description: 'Download professionally drafted legal templates for common situations.',
      icon: FileText,
      count: '50+ Templates',
    },
    {
      title: 'Case Law Database',
      description: 'Search through thousands of relevant court cases and legal precedents.',
      icon: Scale,
      count: '10,000+ Cases',
    },
    {
      title: 'State Law Guides',
      description: 'Comprehensive guides covering laws and regulations for all 50 states.',
      icon: Book,
      count: '50 State Guides',
    },
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Legal Knowledge Base
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive legal resources, guides, and templates to help you understand your rights and navigate legal matters.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search legal topics, guides, and resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? `${category.color} text-white shadow-lg`
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Resources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {featuredResources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div key={index} className="card p-6 text-center hover:scale-105 transition-all duration-300">
                <div className="inline-flex p-4 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl mb-4">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <div className="text-sm font-medium text-blue-600">{resource.count}</div>
              </div>
            );
          })}
        </div>

        {/* Articles Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'All Articles' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <span className="text-gray-600">{filteredArticles.length} articles found</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredArticles.map((article) => (
              <article key={article.id} className="card p-8 hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    article.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    article.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {article.difficulty}
                  </span>
                  <span className="text-sm text-gray-500">{article.readTime}</span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors cursor-pointer">
                  {article.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center group">
                  Read Article
                  <svg className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <Book className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or category filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}