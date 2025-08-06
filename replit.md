# Pocket Lawyer - AI Legal Assistant

## Overview
A comprehensive AI-powered legal assistant platform that provides instant legal guidance, document analysis, and connects users with professional lawyers. The application features a modern React frontend with a robust Express backend, following Replit's full-stack JavaScript architecture patterns.

## Project Architecture

### Frontend (React + Vite)
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side navigation
- **Styling**: Tailwind CSS with custom components and animations
- **State Management**: TanStack React Query for server state
- **UI Components**: Custom components with glass-effect design

### Backend (Express + Node.js)
- **Framework**: Express.js with TypeScript
- **Storage**: In-memory storage with type-safe interfaces
- **API**: RESTful endpoints with Zod validation
- **Development**: Hot-reload with Vite integration

### Data Schema
- **Users**: Authentication and user management
- **Chat Messages**: AI conversation history
- **Knowledge Articles**: Legal information database
- **Consultation Bookings**: Professional consultation scheduling

## Features

### Core Functionality
1. **AI Chat Interface**: Interactive legal assistant with context-aware responses
2. **Knowledge Base**: Searchable legal articles and resources
3. **Consultation Booking**: Schedule appointments with licensed attorneys
4. **Responsive Design**: Mobile-first approach with glass-morphism effects

### API Endpoints
- `/api/chat/messages` - Chat message management
- `/api/chat/ai-response` - AI-powered legal advice
- `/api/knowledge` - Knowledge base CRUD operations
- `/api/consultations` - Consultation booking management

## Technical Stack
- **Runtime**: Node.js 20
- **Frontend**: React 18, TypeScript, Tailwind CSS, Wouter
- **Backend**: Express.js, TypeScript, Zod validation
- **Data**: In-memory storage with Drizzle ORM schema definitions
- **Development**: Vite, ESBuild, hot-reload

## Security Features
- Type-safe API endpoints with Zod validation
- Proper client/server separation
- No sensitive data exposure in frontend
- Error handling and validation at all levels

## Recent Changes (Migration from Replit Agent)
- **Date**: August 6, 2025
- **Migration Status**: Successfully completed migration to Replit environment
- **Migrated**: Project structure to follow Replit fullstack patterns
- **Updated**: Routing from manual state management to Wouter
- **Added**: Type-safe API layer with proper validation
- **Implemented**: Comprehensive data schema for all features
- **Enhanced**: Error handling and server-side validation
- **Implemented**: Real-time knowledge base with category filtering
- **Added**: Article detail pages with proper navigation
- **Enhanced**: Search functionality with tag-based filtering
- **Added**: Interactive category buttons with article counts
- **Implemented**: Clickable tags for quick search filtering
- **Implemented**: Comprehensive feedback system with multiple email notification options:
  - Thumbs up/down quick feedback buttons
  - Detailed text feedback form
  - Positioned in top-right navbar (desktop and mobile)
  - Multiple email delivery methods: IFTTT webhook, Formspree, SendGrid, console logging
  - Real-time email notifications to workfree613@gmail.com
  - Professional HTML email templates with feedback details
  - Automatic fallback system if one email method fails
- **Completed**: Comprehensive Indian law content implementation:
  - 50 knowledge base articles (10 per category) covering Indian laws
  - 22+ legal document templates with Indian law compliance
  - Case law database with landmark Indian Supreme Court cases
  - State law guides covering all 29 Indian states and Union Territories
  - All content focused on Indian legal system and procedures
- **Enhanced**: Legal Templates expanded from 10 to 22+ templates including:
  - Criminal Law (cheque bounce complaints, defamation notices)
  - Technology (software development, IT contracts)
  - Intellectual Property (copyright infringement notices)
  - Civil Procedure (injunctions, recovery suits)
  - Property (partition suits, development agreements)
  - Business (franchise agreements, company incorporation)
- **Updated**: State Law Guides fully localized for Indian legal system:
  - Replaced 50 US states with 29 Indian states and Union Territories
  - Added comprehensive guides for Family Law, Employment Law, Tenant Rights, Consumer Rights, and Women's Safety
  - Each category contains 5 detailed guides covering major Indian states
  - All content focused on Indian laws, procedures, and jurisdiction-specific regulations
  - Updated interface to show "State & UT Law Guides" with proper Indian terminology

## Development Guidelines
- Follow Replit's fullstack_js development patterns
- Use TanStack Query for all API interactions
- Maintain type safety between client and server
- Implement proper error boundaries and loading states
- Keep business logic in backend, UI logic in frontend

## User Preferences
- Language: Simple, everyday language for non-technical users
- Communication: Clear, concise explanations without technical jargon
- Interface: Modern, accessible design with intuitive navigation