import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, X, Send } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'positive' | 'negative' | null>(null);
  const [showTextForm, setShowTextForm] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Submit feedback mutation
  const submitFeedback = useMutation({
    mutationFn: async (data: { type: 'positive' | 'negative' | 'text'; content?: string; userAgent?: string }) => {
      return await apiRequest('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      setIsSubmitted(true);
      // Auto-hide after 2 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFeedbackType(null);
        setFeedbackText('');
        setShowTextForm(false);
        setIsOpen(false);
      }, 2000);
    },
  });

  const handleQuickFeedback = (type: 'positive' | 'negative') => {
    setFeedbackType(type);
    submitFeedback.mutate({
      type,
      userAgent: navigator.userAgent,
    });
  };

  const handleTextFeedback = () => {
    if (feedbackText.trim()) {
      submitFeedback.mutate({
        type: 'text',
        content: feedbackText,
        userAgent: navigator.userAgent,
      });
    }
  };

  const resetWidget = () => {
    setIsOpen(false);
    setFeedbackType(null);
    setShowTextForm(false);
    setFeedbackText('');
    setIsSubmitted(false);
  };

  return (
    <div className="relative">
      {/* Feedback Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <MessageSquare className="h-4 w-4" />
        <span className="text-sm font-medium">Feedback</span>
      </button>

      {/* Feedback Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
          {/* Close Button */}
          <button
            onClick={resetWidget}
            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          {!isSubmitted ? (
            <>
              {!showTextForm ? (
                <>
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      How is your experience?
                    </h3>
                    <p className="text-sm text-gray-600">
                      Help us improve Pocket Lawyer
                    </p>
                  </div>

                  {/* Quick Feedback Buttons */}
                  <div className="flex space-x-3 mb-4">
                    <button
                      onClick={() => handleQuickFeedback('positive')}
                      disabled={submitFeedback.isPending}
                      className="flex-1 flex items-center justify-center space-x-2 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors group"
                    >
                      <ThumbsUp className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Good</span>
                    </button>
                    <button
                      onClick={() => handleQuickFeedback('negative')}
                      disabled={submitFeedback.isPending}
                      className="flex-1 flex items-center justify-center space-x-2 p-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors group"
                    >
                      <ThumbsDown className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Could be better</span>
                    </button>
                  </div>

                  {/* Text Feedback Option */}
                  <button
                    onClick={() => setShowTextForm(true)}
                    className="w-full p-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Write detailed feedback
                  </button>
                </>
              ) : (
                <>
                  {/* Text Feedback Form */}
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Share your thoughts
                    </h3>
                    <p className="text-sm text-gray-600">
                      What can we improve?
                    </p>
                  </div>

                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Tell us about your experience, suggestions, or any issues you encountered..."
                    className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />

                  <div className="flex space-x-2 mt-3">
                    <button
                      onClick={() => setShowTextForm(false)}
                      className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleTextFeedback}
                      disabled={!feedbackText.trim() || submitFeedback.isPending}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="h-4 w-4" />
                      <span>{submitFeedback.isPending ? 'Sending...' : 'Send'}</span>
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            /* Success Message */
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                {feedbackType === 'positive' ? (
                  <ThumbsUp className="h-6 w-6 text-green-600" />
                ) : feedbackType === 'negative' ? (
                  <ThumbsDown className="h-6 w-6 text-red-600" />
                ) : (
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                )}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Thank you for your feedback!
              </h3>
              <p className="text-sm text-gray-600">
                Your input helps us improve Pocket Lawyer
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}