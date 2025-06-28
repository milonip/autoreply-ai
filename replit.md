# AutoReply.ai - Smart Message Replies

## Overview

AutoReply.ai is a modern web application that generates AI-powered reply suggestions for emails and messages. Users can input a received message, select a communication tone, and get multiple contextually appropriate reply options powered by OpenAI's GPT-4o model.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development
- **UI Framework**: Radix UI primitives with shadcn/ui components for accessible, customizable interface
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React Query (TanStack Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API endpoints
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple
- **AI Integration**: OpenAI API with GPT-4o model for reply generation

### Build System
- **Bundler**: Vite for frontend, esbuild for backend production builds
- **Development**: Hot module replacement with Vite dev server
- **TypeScript**: Strict mode enabled with path mapping for clean imports

## Key Components

### Frontend Components
- **MessageInput**: Handles user input for the received message and tone selection
- **ReplyOutput**: Displays generated reply suggestions with copy functionality
- **FeaturesSection**: Marketing component showcasing app capabilities
- **Header/Footer**: Brand identity and navigation components

### Backend Services
- **OpenAI Service**: Handles AI reply generation with structured prompts
- **Storage Layer**: In-memory storage with interface for future database integration
- **Route Handlers**: RESTful API endpoints with comprehensive error handling

### Shared Schema
- **Validation**: Zod schemas for request/response validation
- **Type Safety**: Shared TypeScript types between frontend and backend
- **Database Schema**: Drizzle schema definitions for PostgreSQL tables

## Data Flow

1. User inputs a received message and selects communication tone
2. Frontend validates input using Zod schemas
3. React Query mutation sends POST request to `/api/reply`
4. Backend validates request and calls OpenAI service
5. OpenAI generates 3 reply suggestions based on tone and context
6. Backend validates response format and returns structured data
7. Frontend displays replies with copy-to-clipboard functionality
8. User preferences (tone selection) are persisted in localStorage

## External Dependencies

### AI Services
- **OpenAI API**: GPT-4o model for intelligent reply generation
- **Configuration**: API key required via environment variables
- **Error Handling**: Comprehensive error handling for API failures, quota issues, and authentication

### Database
- **Neon Database**: Serverless PostgreSQL for production
- **Drizzle Kit**: Database migrations and schema management
- **Connection**: PostgreSQL connection string via DATABASE_URL environment variable

### UI Libraries
- **Radix UI**: Accessible component primitives
- **Lucide React**: Consistent icon library
- **Date-fns**: Date manipulation utilities
- **React Query**: Server state synchronization

## Deployment Strategy

### Development
- Vite dev server for frontend with HMR
- tsx for TypeScript execution in development
- Replit-specific plugins for enhanced development experience

### Production Build
- Frontend: Vite builds optimized static assets to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Assets: Static file serving with Express in production mode

### Environment Configuration
- **Development**: NODE_ENV=development with local development server
- **Production**: NODE_ENV=production with bundled server execution
- **Database**: Automatic connection via DATABASE_URL environment variable

## Changelog

Changelog:
- June 28, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.