import React from 'react';
import { Link } from 'wouter';
import { Scale, MessageCircle, Book, FileText, Menu, X, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import FeedbackWidget from './FeedbackWidget';

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Scale, path: '/' },
    { id: 'chat', label: 'AI Chat', icon: MessageCircle, path: '/chat' },
    { id: 'knowledge', label: 'Knowledge Base', icon: Book, path: '/knowledge' },
    { id: 'documents', label: 'Document Analysis', icon: FileText, path: '/documents' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 cursor-pointer group">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-lg group-hover:scale-110 transition-transform duration-200">
              <Scale className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">Pocket Lawyer</h1>
              <p className="text-xs text-gray-600 -mt-1">AI Legal Assistant</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-white/50 hover:text-blue-600'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            
            {/* Feedback Widget */}
            <FeedbackWidget />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/50 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-white/50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Feedback Widget */}
              <div className="px-4 py-2">
                <FeedbackWidget />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}