import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Scale, BookOpen, Filter } from 'lucide-react';

const categories = [
  'All Categories',
  'Arrest Rights',
  'Tenant Rights', 
  'Cybercrime',
  'Women\'s Safety',
  'Consumer Rights'
];

export default function CaseLawPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: cases, isLoading } = useQuery({
    queryKey: ['/api/cases', { 
      category: selectedCategory !== 'All Categories' ? selectedCategory : undefined,
      search: searchQuery || undefined 
    }],
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Case Law Database</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Search landmark legal cases and precedents. Understand how courts have interpreted 
            laws relevant to your situation.
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
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading cases...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {cases?.map((caseItem: any) => (
                  <div key={caseItem.id} className="card p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <Scale className="h-5 w-5 text-blue-600 mr-2" />
                          <h3 className="font-semibold text-xl text-gray-900">
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
                      <BookOpen className="h-6 w-6 text-gray-400 flex-shrink-0" />
                    </div>
                    
                    <p className="text-gray-700 mb-4">{caseItem.summary}</p>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Key Points:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {caseItem.keyPoints.map((point: string, index: number) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
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