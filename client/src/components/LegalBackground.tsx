import React from 'react';
import { Scale, Shield, FileText, Gavel, BookOpen, Users } from 'lucide-react';

interface LegalBackgroundProps {
  className?: string;
  variant?: 'hero' | 'page' | 'subtle';
}

export default function LegalBackground({ className = '', variant = 'hero' }: LegalBackgroundProps) {
  const getBackgroundStyle = () => {
    switch (variant) {
      case 'hero':
        return 'legal-pattern-bg';
      case 'page':
        return 'legal-mesh-bg';
      case 'subtle':
        return 'bg-gradient-to-br from-slate-50 to-blue-50';
      default:
        return 'legal-pattern-bg';
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden ${getBackgroundStyle()} ${className}`}>
      {/* Animated Legal Icons */}
      <div className="absolute inset-0 opacity-10">
        {/* Scale of Justice - Top Left */}
        <div className="absolute top-20 left-20 animate-float">
          <Scale className="h-24 w-24 text-blue-600" />
        </div>
        
        {/* Shield - Top Right */}
        <div className="absolute top-32 right-32 animate-float animation-delay-150">
          <Shield className="h-20 w-20 text-emerald-600" />
        </div>
        
        {/* Gavel - Bottom Left */}
        <div className="absolute bottom-40 left-40 animate-float animation-delay-300">
          <Gavel className="h-28 w-28 text-blue-700" />
        </div>
        
        {/* Books - Center Right */}
        <div className="absolute top-1/2 right-20 animate-float animation-delay-75">
          <BookOpen className="h-22 w-22 text-indigo-600" />
        </div>
        
        {/* Document - Bottom Right */}
        <div className="absolute bottom-20 right-20 animate-float">
          <FileText className="h-18 w-18 text-cyan-600" />
        </div>
        
        {/* Users/Team - Center Left */}
        <div className="absolute top-1/3 left-16 animate-float animation-delay-300">
          <Users className="h-20 w-20 text-purple-600" />
        </div>
      </div>

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 opacity-5">
        {/* Rotating Circle */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border-2 border-blue-400 rounded-full animate-rotate-slow"></div>
        
        {/* Floating Hexagon */}
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 animate-pulse-subtle">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50,3 90,25 90,75 50,97 10,75 10,25"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-emerald-400"
            />
          </svg>
        </div>
        
        {/* Legal Symbol Pattern */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 animate-scale-glow">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <pattern id="legalPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="currentColor" className="text-blue-300" />
              </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#legalPattern)" opacity="0.3" />
          </svg>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/30"></div>
    </div>
  );
}

// Legal Icon Component for individual use
export function LegalIcon({ 
  icon: Icon, 
  className = '', 
  animation = 'float' 
}: { 
  icon: React.ElementType; 
  className?: string; 
  animation?: 'float' | 'bounce' | 'pulse' | 'rotate' | 'none';
}) {
  const getAnimationClass = () => {
    switch (animation) {
      case 'float': return 'animate-float';
      case 'bounce': return 'animate-bounce-subtle';
      case 'pulse': return 'animate-pulse-subtle';
      case 'rotate': return 'animate-rotate-slow';
      default: return '';
    }
  };

  return (
    <div className={`${getAnimationClass()} ${className}`}>
      <Icon className="h-8 w-8 text-blue-600" />
    </div>
  );
}