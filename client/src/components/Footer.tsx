import React from 'react';
import { Link } from 'wouter';
import { Scale, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: 'Knowledge Base', href: '/knowledge' },
    { name: 'Chat Assistant', href: '/chat' },
    { name: 'Legal Templates', href: '/templates' },
    { name: 'State Laws', href: '/guides' },
  ];

  const legalAreas = [
    { name: 'Arrest Rights', href: '/knowledge?category=arrest-rights' },
    { name: 'Tenant Rights', href: '/knowledge?category=tenant-rights' },
    { name: 'Cybercrime', href: '/knowledge?category=cybercrime' },
    { name: 'Women Safety', href: '/knowledge?category=women-safety' },
    { name: 'Consumer Complaints', href: '/knowledge?category=consumer-complaints' },
  ];

  const resources = [
    { name: 'Legal Document Templates', href: '/templates' },
    { name: 'Case Law Database', href: '/cases' },
    { name: 'State Law Guides', href: '/guides' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-lg">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Pocket Lawyer</h3>
                <p className="text-sm text-gray-400">AI Legal Assistant</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your comprehensive AI-powered legal assistant for Indian law. Get instant guidance on 
              constitutional, criminal, civil, and corporate matters with access to case law, 
              state-specific guides, and document templates across all 28 states and 8 union territories.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-5 w-5 text-blue-400" />
                <span>support@pocketlawyer.in</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="h-5 w-5 text-blue-400" />
                <span>+91-1800-LEGAL-AI</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Areas */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal Areas</h4>
            <ul className="space-y-2">
              {legalAreas.map((area) => (
                <li key={area.name}>
                  <Link
                    href={area.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <Link
                    href={resource.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Pocket Lawyer India. All rights reserved. | 
              <a href="#" className="hover:text-white ml-1">Privacy Policy</a> | 
              <a href="#" className="hover:text-white ml-1">Terms of Service</a> | 
              <a href="#" className="hover:text-white ml-1">Legal Disclaimer</a>
            </div>
            
            <div className="flex space-x-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  <Icon className="h-5 w-5 text-gray-400 hover:text-white" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
            <p className="text-xs text-gray-400 text-center">
              <strong>Legal Disclaimer:</strong> This platform provides general legal information about Indian law and AI-assisted guidance only. 
              It does not constitute legal advice and should not be relied upon as a substitute for consultation with a qualified advocate or lawyer 
              registered with the Bar Council of India. Always consult with a licensed legal practitioner for specific legal matters and court proceedings.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}