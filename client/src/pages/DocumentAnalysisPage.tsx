import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { apiRequest, queryClient } from '../lib/queryClient';

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

  const { data: previousAnalyses } = useQuery({
    queryKey: ['/api/documents'],
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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
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

            {analysisResult ? (
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

        {/* Previous Analyses */}
        {previousAnalyses && previousAnalyses.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Previous Analyses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {previousAnalyses.map((analysis: any) => (
                <div key={analysis.id} className="card p-6">
                  <div className="flex items-center mb-3">
                    <FileText className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="font-medium truncate">{analysis.fileName}</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{analysis.fileType}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(analysis.timestamp).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}