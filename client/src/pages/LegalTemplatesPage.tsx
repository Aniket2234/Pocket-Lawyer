import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FileText, Search, Download, Filter } from 'lucide-react';
import type { LegalTemplate } from '../../../shared/schema';

const categories = [
  'All Categories',
  'Housing',
  'Employment', 
  'Business',
  'Legal Documents',
  'Estate Planning',
  'Family Law',
  'Contracts',
  'Financial',
  'Legal Notices',
  'Criminal Law',
  'Technology',
  'Civil Procedure',
  'Intellectual Property',
  'Dispute Resolution',
  'Property',
  'Consumer Protection'
];

export default function LegalTemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<LegalTemplate | null>(null);

  const { data: templates = [], isLoading } = useQuery<LegalTemplate[]>({
    queryKey: selectedCategory === 'All Categories' 
      ? ['/api/templates'] 
      : ['/api/templates', selectedCategory],
    queryFn: async () => {
      const url = selectedCategory === 'All Categories' 
        ? '/api/templates'
        : `/api/templates?category=${encodeURIComponent(selectedCategory)}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch templates');
      return response.json();
    }
  });

  const filteredTemplates = templates.filter((template: LegalTemplate) =>
    template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (template: LegalTemplate) => {
    const blob = new Blob([template.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${template.title.replace(/[^a-z0-9]/gi, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Legal Templates</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access 20+ professional legal templates for common situations. 
            Customize and download for your specific needs.
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
                    placeholder="Search templates..."
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
                <p className="mt-4 text-gray-600">Loading templates...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTemplates.map((template: LegalTemplate) => (
                  <div key={template.id} className="card p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">
                          {template.title}
                        </h3>
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {template.category}
                        </span>
                      </div>
                      <FileText className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {template.description}
                    </p>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setSelectedTemplate(template)}
                        className="flex-1 btn-secondary text-sm py-2"
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => handleDownload(template)}
                        className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredTemplates.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or category filter.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Template Preview Modal */}
        {selectedTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{selectedTemplate.title}</h2>
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono bg-gray-50 p-4 rounded-lg">
                  {selectedTemplate.content}
                </pre>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="btn-secondary"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownload(selectedTemplate)}
                  className="btn-primary"
                >
                  Download Template
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}