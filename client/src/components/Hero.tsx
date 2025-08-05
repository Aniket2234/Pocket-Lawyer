import React from 'react';
import { MessageCircle, Shield, Zap, Users } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-subtle"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-subtle animation-delay-75"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-subtle animation-delay-150"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center">
          {/* Main Heading */}
          <div className="animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
              Your AI-Powered
              <span className="block gradient-text">Legal Assistant</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto text-balance">
              Get instant legal guidance, analyze documents, and connect with professional lawyers. 
              All in one intelligent platform.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up animation-delay-150 flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button onClick={onGetStarted} className="btn-primary flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>Start Chat Now</span>
            </button>
            <button className="btn-secondary">
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="animate-fade-in-up animation-delay-300">
            <p className="text-sm text-gray-500 mb-8">Trusted by thousands of users worldwide</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {[
                { icon: Shield, label: 'Secure & Private', desc: 'End-to-end encryption' },
                { icon: Zap, label: 'Instant Answers', desc: '24/7 availability' },
                { icon: Users, label: 'Expert Network', desc: 'Licensed attorneys' },
                { icon: MessageCircle, label: 'Smart AI', desc: 'GPT-4 powered' },
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center p-4 rounded-lg hover:bg-white/50 transition-all duration-200 group"
                >
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-full group-hover:scale-110 transition-transform duration-200 mb-3">
                    <item.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.label}</h3>
                  <p className="text-xs text-gray-600 text-center">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}