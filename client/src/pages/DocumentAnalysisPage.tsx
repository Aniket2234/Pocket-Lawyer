import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Upload, FileText, AlertCircle, CheckCircle, Search, Eye, Brain, Zap, Scale, Gavel, Book } from 'lucide-react';
import { apiRequest, queryClient } from '../lib/queryClient';
import LegalBackground from '../components/LegalBackground';

export default function DocumentAnalysisPage() {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const analyzeDocumentMutation = useMutation({
    mutationFn: async (data: { fileName: string; fileType: string; content?: string }) => {
      return apiRequest('/api/documents/analyze', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: (data) => {
      setAnalysisResult(data.analysisResult);
      queryClient.invalidateQueries({ queryKey: ['/api/documents'] });
    },
  });



  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setAnalysisResult(null);
    }
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;

    analyzeDocumentMutation.mutate({
      fileName: selectedFile.name,
      fileType: selectedFile.type || 'application/octet-stream',
    });
  };

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      {/* Animated Legal Background */}
      <LegalBackground variant="page" className="opacity-15" />
      
      {/* Floating Legal Icons */}
      <div className="absolute top-20 left-10 animate-float opacity-10">
        <Scale className="h-20 w-20 text-blue-600" />
      </div>
      <div className="absolute top-1/3 right-16 animate-float animation-delay-300 opacity-10">
        <Gavel className="h-16 w-16 text-emerald-600" />
      </div>
      <div className="absolute bottom-1/4 left-16 animate-float animation-delay-150 opacity-10">
        <Book className="h-18 w-18 text-purple-600" />
      </div>
      <div className="absolute bottom-20 right-20 animate-float animation-delay-450 opacity-10">
        <FileText className="h-14 w-14 text-indigo-600" />
      </div>
      
      {/* Animated Document Icons */}
      <div className="absolute top-1/2 left-8 animate-pulse opacity-5">
        <FileText className="h-24 w-24 text-gray-400" />
      </div>
      <div className="absolute top-1/4 right-8 animate-pulse animation-delay-300 opacity-5">
        <FileText className="h-16 w-16 text-gray-400" />
      </div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-10 right-1/4 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 animate-pulse"></div>
      <div className="absolute bottom-10 left-1/4 w-24 h-24 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full opacity-10 animate-pulse animation-delay-300"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Document Analysis</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload legal documents for AI-powered analysis. Get insights on contract terms, 
            potential issues, and legal recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Upload className="h-6 w-6 mr-3 text-blue-600" />
              Upload Document
            </h2>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                id="document-upload"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileSelect}
              />
              <label htmlFor="document-upload" className="cursor-pointer">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Click to upload a document
                </p>
                <p className="text-sm text-gray-500">
                  Supports PDF, DOC, DOCX, TXT files
                </p>
              </label>
            </div>

            {selectedFile && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-blue-800">{selectedFile.name}</p>
                    <p className="text-sm text-blue-600">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={handleAnalyze}
                    disabled={analyzeDocumentMutation.isPending}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {analyzeDocumentMutation.isPending ? 'Analyzing...' : 'Analyze Document'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Analysis Results Section */}
          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <AlertCircle className="h-6 w-6 mr-3 text-green-600" />
              Analysis Results
            </h2>

{analyzeDocumentMutation.isPending ? (
              <div className="text-center py-12">
                <div className="relative mb-8">
                  {/* Main Document Icon */}
                  <div className="relative mx-auto w-20 h-24 bg-blue-100 rounded-lg border-2 border-blue-300 animate-pulse">
                    <FileText className="h-12 w-12 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  
                  {/* Scanning Beam Animation */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-28 overflow-hidden rounded-lg">
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-scanning opacity-70"></div>
                  </div>
                  
                  {/* Floating Analysis Icons */}
                  <div className="absolute top-0 left-0 w-full h-full">
                    <Search className="h-6 w-6 text-blue-500 absolute top-4 left-8 animate-float opacity-60" style={{animationDelay: '0s'}} />
                    <Eye className="h-5 w-5 text-green-500 absolute top-8 right-8 animate-float opacity-60" style={{animationDelay: '1s'}} />
                    <Brain className="h-6 w-6 text-purple-500 absolute bottom-6 left-6 animate-float opacity-60" style={{animationDelay: '2s'}} />
                    <Zap className="h-5 w-5 text-yellow-500 absolute bottom-4 right-6 animate-float opacity-60" style={{animationDelay: '0.5s'}} />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-blue-700 animate-pulse">Analyzing Document...</h3>
                  
                  {/* Progress Steps */}
                  <div className="space-y-3 max-w-sm mx-auto">
                    <div className="flex items-center text-sm">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                      <span className="text-gray-700">Reading document content</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse" style={{animationDelay: '1s'}}></div>
                      <span className="text-gray-700">Identifying legal clauses</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-3 animate-pulse" style={{animationDelay: '2s'}}></div>
                      <span className="text-gray-700">Analyzing risks and opportunities</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3 animate-pulse" style={{animationDelay: '3s'}}></div>
                      <span className="text-gray-700">Generating insights</span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full max-w-sm mx-auto bg-gray-200 rounded-full h-2 mt-6">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-progress"></div>
                  </div>
                </div>
              </div>
            ) : analysisResult ? (
              <div className="space-y-4">
                <div className="flex items-center text-green-600 mb-4">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="font-medium">Analysis Complete</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                    {analysisResult}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Upload a document to see analysis results</p>
                <p className="text-sm mt-2">
                  Our AI will review your document and provide detailed insights
                </p>
              </div>
            )}
          </div>
        </div>


      </div>
    </div>
  );
}