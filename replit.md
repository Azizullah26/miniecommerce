# eCommerce Product Listing Module

## Overview

A full-stack product catalog management system that enables browsing, filtering, searching, and managing product inventories. Built as a modern web application with a React TypeScript frontend and Node.js Express backend, demonstrating clean architecture with separation of concerns, comprehensive validation, and responsive UI patterns.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18 with TypeScript**: Provides type-safe component development with modern React features including hooks and functional components
- **Vite**: Lightning-fast development server with hot module replacement and optimized production builds
- **Client-side Routing**: Wouter library for lightweight, declarative routing without the overhead of React Router

**State Management**
- **React Query (@tanstack/react-query)**: Handles all server state management, providing automatic caching, background refetching, and optimistic updates. Eliminates need for Redux or similar state management libraries
- **Local Component State**: React useState hooks for UI-specific state (pagination, filters, search)

**UI Component Library**
- **shadcn/ui**: Accessible, customizable components built on Radix UI primitives
- **TailwindCSS**: Utility-first CSS framework with custom design tokens defined in `tailwind.config.ts`
- **Design System**: Material Design principles adapted for data-dense interfaces (documented in `design_guidelines.md`)

**Component Structure**
```
client/src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui base components
│   ├── AddProductDialog.tsx
│   ├── CategoryFilter.tsx
│   ├── EmptyState.tsx
│   ├── Pagination.tsx
│   └── ProductCard.tsx
├── pages/              # Route-level components
│   ├── products.tsx    # Main product listing page
│   └── not-found.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utilities and helpers
│   ├── queryClient.ts  # React Query configuration
│   └── utils.ts        # General utilities (cn helper)
└── App.tsx             # Root component with providers
```

### Backend Architecture

**Server Framework**
- **Express.js**: Minimal, unopinionated web framework handling HTTP requests and middleware
- **TypeScript**: End-to-end type safety with shared types between frontend and backend

**API Design Pattern**
- **RESTful endpoints** following resource-oriented architecture:
  - `GET /api/products` - List products with query parameters for filtering/pagination
  - `GET /api/products/:id` - Retrieve single product
  - `POST /api/products` - Create new product
  - `GET /api/categories` - List unique categories

**Data Validation**
- **Zod**: Runtime schema validation for API requests
- **drizzle-zod**: Generates Zod schemas from Drizzle ORM table definitions
- Validation occurs in route handlers before data persistence

**Storage Strategy**
- **Current Implementation**: In-memory storage (`MemStorage` class in `server/storage.ts`)
  - Interface-based design (`IStorage`) allows easy swapping of storage implementations
  - Seeded with sample product data on initialization
- **Migration Path**: Schema defined with Drizzle ORM for PostgreSQL (via `@neondatabase/serverless`)
  - Schema location: `shared/schema.ts`
  - Configuration: `drizzle.config.ts` points to PostgreSQL with `DATABASE_URL` environment variable
  - Migration strategy: Run `npm run db:push` to sync schema with database

**Server Structure**
```
server/
├── index.ts           # Express app setup, middleware, Vite integration
├── routes.ts          # API route definitions and handlers
├── storage.ts         # Storage interface and in-memory implementation
└── vite.ts            # Development server integration with Vite
```

### Data Layer

**Schema Design** (PostgreSQL-ready)
```typescript
// Users table (authentication scaffold)
users {
  id: uuid (primary key)
  username: text (unique)
  password: text
}

// Products table
products {
  id: serial (primary key)
  name: text
  price: real
  category: text
  stock_status: text (enum: "In Stock" | "Low Stock" | "Out of Stock")
  created_at: timestamp
}
```

**Type Safety**
- Shared types between client and server via `shared/schema.ts`
- Drizzle ORM provides type inference from schema definitions
- Zod schemas generated from Drizzle tables ensure runtime validation matches compile-time types

### Request/Response Flow

1. **Client Request**: React Query manages API calls with automatic retries and caching
2. **Request Validation**: Zod schemas validate incoming data structure and types
3. **Business Logic**: Route handlers in `server/routes.ts` process validated requests
4. **Data Access**: Storage interface abstracts data persistence (currently in-memory, ready for PostgreSQL)
5. **Response Formation**: JSON responses with appropriate HTTP status codes
6. **Client Update**: React Query automatically updates cache and triggers UI re-renders

### Development Workflow

**Build Process**
- Frontend: Vite bundles React application to `dist/public`
- Backend: esbuild compiles TypeScript server code to `dist/index.js`
- Development: `npm run dev` runs Express with Vite middleware for hot reloading
- Production: `npm run build && npm start`

**Type Checking**
- TypeScript strict mode enabled across entire codebase
- Path aliases configured (`@/`, `@shared/`, `@assets/`) for clean imports
- No emit compilation - type checking separate from bundling

## External Dependencies

### Database
- **PostgreSQL** (via Neon serverless): Primary data storage (configured but currently using in-memory fallback)
- **Drizzle ORM**: Type-safe database toolkit and migration system
- Configuration requires `DATABASE_URL` environment variable

### UI Component Libraries
- **Radix UI**: Unstyled, accessible component primitives (dialogs, dropdowns, select, etc.)
- **shadcn/ui**: Pre-styled components built on Radix UI with Tailwind
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Vite**: Build tool and dev server
- **Replit plugins**: Development banner, error overlay, and cartographer for Replit environment integration

### Runtime Dependencies
- **React Query**: Server state management and caching
- **Wouter**: Client-side routing
- **Zod**: Schema validation
- **date-fns**: Date formatting utilities
- **class-variance-authority**: Variant-based component styling
- **nanoid**: Unique ID generation