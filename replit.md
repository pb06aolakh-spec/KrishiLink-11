# KrishiLink - Agricultural Equipment Rental Marketplace

## Project Overview
KrishiLink is a comprehensive agricultural equipment rental marketplace that connects farmers who own equipment with those who need it. The platform features an e-commerce style interface with an agricultural theme, making it easy for farmers to rent or lend tools and machinery.

## Recent Changes (October 27, 2025)
- **Complete MVP Implementation**: Built all core features including home page, browse equipment, equipment details, list equipment form, and about page
- **Agricultural Theme**: Implemented earthy green and brown color palette throughout the application
- **Generated Images**: Created 8 agricultural-themed images for hero section, categories, trust sections, and CTAs
- **Form Validation Fix**: Properly implemented numeric field handling in the List Equipment form using valueAsNumber for type conversion
- **Responsive Design**: Fully responsive layout working across all screen sizes
- **Dark Mode**: Complete light/dark theme support with theme toggle
- **Seed Data**: Populated with 12 realistic agricultural equipment listings across various categories

## Tech Stack
- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js with in-memory storage
- **Styling**: Tailwind CSS + Shadcn UI components
- **State Management**: React Query (TanStack Query v5)
- **Routing**: Wouter
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

## Project Architecture

### Data Models

#### Equipment
- Complete agricultural equipment listings with:
  - Basic info: name, category, description, brand, year
  - Pricing: pricePerDay (required), pricePerHour (optional)
  - Location and owner details
  - Condition, specifications, availability status
  - Rating and review count

#### Inquiry
- Rental inquiry system for equipment booking requests
- Captures renter information, desired dates, and messages

### API Routes
- **Equipment**: GET all, GET by ID, POST create, PATCH update, DELETE
- **Inquiries**: GET all (with optional equipmentId filter), POST create

### Frontend Pages
1. **Home** (`/`): Hero section with search, categories showcase, how it works, trust & safety, testimonials, CTA sections, and stats
2. **Browse** (`/browse`): Equipment grid with search, category filters, and sorting options
3. **Equipment Detail** (`/equipment/:id`): Detailed view with image gallery, specifications, owner info, and booking inquiry form
4. **List Equipment** (`/list`): Comprehensive form for equipment owners to create new listings
5. **About** (`/about`): Mission, values, benefits, and impact statistics

### Key Components
- **Header**: Sticky navigation with logo, nav links, theme toggle, mobile menu
- **Footer**: Multi-column layout with links, contact info, newsletter signup
- **EquipmentCard**: Reusable card component for displaying equipment in grids
- **ThemeProvider**: Light/dark mode management with localStorage persistence

## Design System
- **Primary Color**: Green (HSL 142 45% 28%) for agricultural theme
- **Typography**: Poppins for headings, Inter for body text
- **Spacing**: Consistent 4, 6, 8, 12, 16, 20, 24px spacing units
- **Components**: Shadcn UI with custom agricultural theming
- **Responsive Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)

## User Preferences
- Agricultural theme with earthy colors (green, brown, wheat tones)
- E-commerce style interface for equipment browsing
- Professional yet farmer-friendly design approach
- High-quality generated images for visual appeal

## Key Features
1. **Equipment Browsing**: Search, filter by category, sort by price/date/rating
2. **Equipment Details**: Complete information with booking inquiry system
3. **List Equipment**: Multi-section form with validation
4. **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
5. **Dark Mode**: Complete theme support with smooth transitions
6. **Seed Data**: 12 pre-populated equipment listings for demonstration

## Development Guidelines
- Follow fullstack_js development guidelines
- Use in-memory storage (MemStorage) for MVP
- Maintain type safety between frontend and backend using shared schema
- Ensure all numeric form fields use valueAsNumber for proper type conversion
- Adhere to agricultural theme colors and design tokens
- Keep components modular and reusable

## Running the Project
- Workflow: "Start application" runs `npm run dev`
- Frontend served on port 5000 with hot reload
- Backend API routes prefixed with `/api`

## Next Phase Features (Not in MVP)
- User authentication and profiles
- Booking calendar system with availability tracking
- Booking management dashboard
- Rating and review system
- Payment integration for rentals
- Real-time messaging between renters and owners
