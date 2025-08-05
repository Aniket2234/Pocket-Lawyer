import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Scale, BookOpen, Filter, ArrowLeft, Calendar, Building2 } from 'lucide-react';

const categories = [
  'All Categories',
  'Arrest Rights',
  'Tenant Rights', 
  'Women\'s Safety',
  'Consumer Complaints',
  'Constitutional Law'
];

export default function CaseLawPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCase, setSelectedCase] = useState<any>(null);

  const { data: cases, isLoading } = useQuery({
    queryKey: ['/api/cases', { 
      category: selectedCategory !== 'All Categories' ? selectedCategory : undefined,
      search: searchQuery || undefined 
    }],
  });

  // If a case is selected, show the detailed view
  if (selectedCase) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => setSelectedCase(null)}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Case List
          </button>

          {/* Case Details */}
          <div className="card p-8">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <Scale className="h-6 w-6 text-blue-600 mr-3" />
                <h1 className="text-3xl font-bold text-gray-900">
                  {selectedCase.caseTitle}
                </h1>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Building2 className="h-4 w-4 mr-1" />
                  {selectedCase.court}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {selectedCase.year}
                </div>
                <div className="font-medium">
                  {selectedCase.citation}
                </div>
              </div>

              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                {selectedCase.category}
              </span>
            </div>

            {/* Case Summary */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Case Summary</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {selectedCase.summary}
                </p>
              </div>
            </div>

            {/* Key Points */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Legal Points</h2>
              <div className="grid gap-3">
                {selectedCase.keyPoints.map((point: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Significance */}
            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Legal Significance</h3>
              <p className="text-sm text-blue-700">
                This landmark judgment by the {selectedCase.court} in {selectedCase.year} 
                continues to serve as an important precedent in {selectedCase.category.toLowerCase()} 
                matters across Indian courts. The case citation {selectedCase.citation} is 
                frequently referenced in similar legal proceedings.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Case Law Database</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse 15 landmark Supreme Court cases organized across 5 legal categories. 
            Each category contains 3 important real-time cases with detailed analysis.
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
                    placeholder="Search cases..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
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
            {/* Category Summary */}
            {!isLoading && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                {selectedCategory === 'All Categories' ? (
                  <>
                    <h2 className="font-semibold text-blue-900 mb-1">All Categories</h2>
                    <p className="text-sm text-blue-700">
                      Showing all {cases?.length || 0} landmark Supreme Court cases across 5 categories (3 cases per category)
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="font-semibold text-blue-900 mb-1">{selectedCategory}</h2>
                    <p className="text-sm text-blue-700">
                      Showing {cases?.length || 0} cases in this category (exactly 3 cases per category)
                    </p>
                  </>
                )}
              </div>
            )}
            
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading cases...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {cases?.map((caseItem: any) => (
                  <button
                    key={caseItem.id}
                    onClick={() => setSelectedCase(caseItem)}
                    className="card p-6 w-full text-left hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <Scale className="h-5 w-5 text-blue-600 mr-2" />
                          <h3 className="font-semibold text-xl text-gray-900 group-hover:text-blue-700 transition-colors">
                            {caseItem.caseTitle}
                          </h3>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <span>{caseItem.court}</span>
                          <span>•</span>
                          <span>{caseItem.year}</span>
                          <span>•</span>
                          <span>{caseItem.citation}</span>
                        </div>
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full mb-3">
                          {caseItem.category}
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <BookOpen className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                        <span className="text-xs text-gray-500 mt-1 group-hover:text-blue-600 transition-colors">
                          Read Full Case
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4 line-clamp-3">{caseItem.summary}</p>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Key Points:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {caseItem.keyPoints.slice(0, 2).map((point: string, index: number) => (
                          <li key={index}>{point}</li>
                        ))}
                        {caseItem.keyPoints.length > 2 && (
                          <li className="text-blue-600 font-medium">
                            +{caseItem.keyPoints.length - 2} more key points...
                          </li>
                        )}
                      </ul>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {cases?.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <Scale className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No cases found</h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or category filter.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}