import React, { useState } from 'react';
import { MessageCircle, Shield, Zap, Users, Play, X, Scale, Gavel } from 'lucide-react';
import LegalBackground from './LegalBackground';

interface HeroProps {
  onGetStarted: () => void;
}

function DemoButton() {
  const [showDemo, setShowDemo] = useState(false);

  const handleDemoClick = () => {
    setShowDemo(true);
  };

  return (
    <>
      <button onClick={handleDemoClick} className="btn-secondary flex items-center space-x-2">
        <Play className="h-4 w-4" />
        <span>Watch Demo</span>
      </button>

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold">AI Legal Assistant Demo</h3>
              <button
                onClick={() => setShowDemo(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <DemoConversation onClose={() => setShowDemo(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function DemoConversation({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const demoSteps = [
    {
      type: 'user',
      message: 'I received an eviction notice but I think it might be illegal. What should I do?',
      delay: 1000,
    },
    {
      type: 'bot',
      message: 'I understand your concern about the eviction notice. Let me help you understand your rights as a tenant. First, can you tell me what state you\'re in and what reason was given for the eviction?',
      delay: 2000,
    },
    {
      type: 'user', 
      message: 'I\'m in California, and they say it\'s for non-payment of rent, but I paid on time last month.',
      delay: 1500,
    },
    {
      type: 'bot',
      message: 'In California, landlords must follow strict procedures for eviction. If you paid rent on time, this could be wrongful eviction. Here\'s what you should do:\n\n1. Gather all payment records and receipts\n2. Check if proper notice was given (usually 3-day notice for non-payment)\n3. Respond within the notice period\n4. Consider contacting a tenant rights organization\n\nWould you like me to help you find local tenant assistance resources?',
      delay: 3000,
    },
    {
      type: 'user',
      message: 'Yes, that would be very helpful. I need to respond quickly.',
      delay: 1000,
    },
    {
      type: 'bot',
      message: 'Absolutely! Here are some immediate resources for California tenants:\n\n• California Department of Consumer Affairs - Tenant Rights\n• Local Legal Aid Society\n• Tenant Union in your city\n\nI\'ve also found template letters you can use to respond to the eviction notice. Remember, you typically have 5 days to respond in court. Would you like me to help you draft a response letter?',
      delay: 2500,
    }
  ];

  const startDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    
    const showNextStep = (index: number) => {
      if (index < demoSteps.length) {
        setTimeout(() => {
          setCurrentStep(index + 1);
          showNextStep(index + 1);
        }, demoSteps[index].delay);
      } else {
        setIsPlaying(false);
      }
    };
    
    showNextStep(0);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          See how our AI legal assistant helps with real tenant rights questions
        </p>
        {!isPlaying && currentStep === 0 && (
          <button onClick={startDemo} className="btn-primary">
            Start Demo Conversation
          </button>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-6 min-h-[400px] max-h-[500px] overflow-y-auto">
        <div className="space-y-4">
          {demoSteps.slice(0, currentStep).map((step, index) => (
            <div
              key={index}
              className={`flex ${step.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  step.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className={`text-xs mb-1 ${step.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                  {step.type === 'user' ? 'You' : 'AI Legal Assistant'}
                </div>
                <p className="text-sm whitespace-pre-wrap">{step.message}</p>
              </div>
            </div>
          ))}
          
          {isPlaying && currentStep < demoSteps.length && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">AI is typing...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {currentStep === demoSteps.length && (
        <div className="text-center space-y-4">
          <p className="text-green-600 font-medium">Demo Complete!</p>
          <div className="flex justify-center space-x-4">
            <button onClick={startDemo} className="btn-secondary">
              Watch Again
            </button>
            <button onClick={onClose} className="btn-primary">
              Try It Yourself
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Legal Background */}
      <LegalBackground variant="hero" />
      
      {/* Additional Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/60 to-emerald-50/80"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-subtle"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-subtle animation-delay-75"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-subtle animation-delay-150"></div>
      
      {/* Floating Legal Elements */}
      <div className="absolute top-1/4 left-8 animate-float opacity-20">
        <Scale className="h-16 w-16 text-blue-600" />
      </div>
      <div className="absolute top-3/4 right-12 animate-float animation-delay-300 opacity-20">
        <Gavel className="h-14 w-14 text-emerald-600" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center">
          {/* Main Heading */}
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-center mb-4">
              <div className="animate-bounce-subtle mr-4">
                <Scale className="h-12 w-12 text-blue-600" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900">
                Pocket Lawyer
              </h1>
              <div className="animate-bounce-subtle ml-4 animation-delay-150">
                <Gavel className="h-12 w-12 text-emerald-600" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-semibold mb-6">
              Your AI-Powered
              <span className="block gradient-text animate-scale-glow">Legal Assistant</span>
            </h2>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto text-balance animate-slide-in-left animation-delay-75">
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
            <DemoButton />
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