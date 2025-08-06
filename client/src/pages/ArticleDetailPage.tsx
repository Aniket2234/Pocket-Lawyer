import { useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ArrowLeft, Clock, User, Tag, Share2 } from 'lucide-react';
import { Link } from 'wouter';

export default function ArticleDetailPage() {
  const [, params] = useRoute('/knowledge/article/:id');
  const articleId = params?.id;

  // Scroll to top when component mounts or article changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [articleId]);

  const { data: article, isLoading, error } = useQuery({
    queryKey: ['/api/knowledge', articleId],
    queryFn: async () => {
      const response = await fetch(`/api/knowledge/${articleId}`);
      if (!response.ok) {
        throw new Error('Article not found');
      }
      return response.json();
    },
    enabled: !!articleId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="h-12 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
            <Link href="/knowledge" className="btn btn-primary">
              Back to Knowledge Base
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <Link href="/knowledge" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 group">
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Knowledge Base
        </Link>

        {/* Article Header */}
        <article className="card p-8 mb-8">
          <div className="mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block ${
              article.category === 'Arrest Rights' ? 'bg-red-100 text-red-800' :
              article.category === 'Tenant Rights' ? 'bg-blue-100 text-blue-800' :
              article.category === 'Cybercrime' ? 'bg-purple-100 text-purple-800' :
              article.category === "Women's Safety" ? 'bg-pink-100 text-pink-800' :
              article.category === 'Consumer Complaints' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {article.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>5 min read</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>Legal Expert</span>
            </div>
            <button className="flex items-center text-blue-600 hover:text-blue-700">
              <Share2 className="h-4 w-4 mr-2" />
              Share Article
            </button>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {article.content}
            </div>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center mb-4">
                <Tag className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Related Topics</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full font-medium hover:bg-blue-100 cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Related Articles Section */}
        <div className="card p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <div className="text-gray-600">
            <p>Related articles will be displayed here based on the current article's category and tags.</p>
          </div>
        </div>
      </div>
    </div>
  );
}