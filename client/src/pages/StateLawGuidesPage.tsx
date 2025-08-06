import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, MapPin, BookOpen, Filter } from 'lucide-react';

const states = [
  'All States', 
  // States
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 
  'West Bengal',
  // Union Territories
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

const categories = [
  'All Categories',
  'Criminal Law',
  'Family Law',
  'Property Law',
  'Business Law',
  'Employment Law',
  'Tenant Rights',
  'Consumer Rights',
  'Women\'s Safety'
];

export default function StateLawGuidesPage() {
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuide, setSelectedGuide] = useState<any>(null);
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  const { data: guides, isLoading } = useQuery({
    queryKey: ['/api/guides', { 
      state: selectedState !== 'All States' ? selectedState : undefined,
      category: selectedCategory !== 'All Categories' ? selectedCategory : undefined 
    }],
  });

  const filteredGuides = guides ? guides.filter((guide: any) =>
    guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.content.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">State & UT Law Guides</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive guides to Indian state and Union Territory specific laws and regulations. 
            Find legal information tailored to your jurisdiction across India.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="card p-6 sticky top-24">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search guides..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* State Filter */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <MapPin className="h-4 w-4 mr-2 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">State/UT</h3>
                </div>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <div className="flex items-center mb-4">
                  <Filter className="h-4 w-4 mr-2 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Categories</h3>
                </div>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading guides...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredGuides.map((guide: any) => (
                  <div key={guide.id} className="card p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <MapPin className="h-4 w-4 text-blue-600 mr-2" />
                          <span className="text-sm font-medium text-blue-600">{guide.state}</span>
                        </div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">
                          {guide.title}
                        </h3>
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          {guide.category}
                        </span>
                      </div>
                      <BookOpen className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {guide.content.substring(0, 150)}...
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-400">
                        Updated: {new Date(guide.lastUpdated).toLocaleDateString()}
                      </p>
                      <button
                        onClick={() => setSelectedGuide(guide)}
                        className="btn-secondary text-sm py-2"
                      >
                        Read Guide
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredGuides.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No guides found</h3>
                <p className="text-gray-600">
                  Try adjusting your search terms, state, or category filter.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Guide Reading Modal */}
        {selectedGuide && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center mb-2">
                      <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-blue-600">{selectedGuide.state}</span>
                    </div>
                    <h2 className="text-xl font-semibold">{selectedGuide.title}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedGuide(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedGuide.content}</p>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}