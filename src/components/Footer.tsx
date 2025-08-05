import React from 'react';
import { Scale, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: 'About Us', href: '#' },
    { name: 'How It Works', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  const legalAreas = [
    { name: 'Business Law', href: '#' },
    { name: 'Family Law', href: '#' },
    { name: 'Personal Injury', href: '#' },
    { name: 'Real Estate', href: '#' },
    { name: 'Employment Law', href: '#' },
    { name: 'Criminal Defense', href: '#' },
  ];

  const resources = [
    { name: 'Legal Blog', href: '#' },
    { name: 'Document Templates', href: '#' },
    { name: 'Case Studies', href: '#' },
    { name: 'Legal Dictionary', href: '#' },
    { name: 'State Law Guides', href: '#' },
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
              Your trusted AI-powered legal assistant providing instant guidance, 
              document analysis, and connections to professional attorneys. 
              Making legal help accessible to everyone.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-5 w-5 text-blue-400" />
                <span>support@pocketlawyer.ai</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="h-5 w-5 text-blue-400" />
                <span>1-800-LAWYER-AI</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
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
                  <a
                    href={area.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {area.name}
                  </a>
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
                  <a
                    href={resource.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Pocket Lawyer. All rights reserved. | 
              <a href="#" className="hover:text-white ml-1">Privacy Policy</a> | 
              <a href="#" className="hover:text-white ml-1">Terms of Service</a>
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
              <strong>Legal Disclaimer:</strong> This platform provides general legal information and AI-assisted guidance only. 
              It does not constitute legal advice and should not be relied upon as a substitute for consultation with a qualified attorney. 
              Always consult with a licensed lawyer for specific legal matters.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}