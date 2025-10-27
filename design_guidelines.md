# KrishiLink Design Guidelines

## Design Approach: Reference-Based (Airbnb + E-commerce Hybrid)

**Rationale:** KrishiLink bridges rental marketplaces and e-commerce, requiring visual trust-building through imagery while maintaining efficient browsing. Drawing from Airbnb's rental interface patterns and Shopify's product grid aesthetics, adapted for agricultural context.

**Core Principle:** Earthy, trustworthy, and accessible - reflecting farming community values while delivering modern marketplace functionality.

---

## Typography System

**Primary Font:** Poppins (Google Fonts) - modern, friendly, highly readable
**Secondary Font:** Inter (Google Fonts) - for body text and data-heavy sections

**Hierarchy:**
- H1 (Hero): 4xl (tablet), 5xl/6xl (desktop), font-bold
- H2 (Section Headers): 3xl (tablet), 4xl (desktop), font-semibold
- H3 (Card Titles/Subsections): xl/2xl, font-semibold
- Body Large (Descriptions): lg, font-normal, leading-relaxed
- Body Regular: base, font-normal, leading-normal
- Small Text (Metadata): sm, font-medium
- Buttons/CTAs: base/lg, font-semibold, uppercase tracking-wide

---

## Layout & Spacing System

**Tailwind Spacing Units:** Consistently use 4, 6, 8, 12, 16, 20, 24 for streamlined vertical rhythm

**Container Strategy:**
- Full-width sections with inner `max-w-7xl mx-auto px-6`
- Product grids: `max-w-screen-2xl`
- Text content: `max-w-4xl`

**Section Padding:**
- Desktop: `py-16` to `py-24`
- Tablet: `py-12` to `py-16`
- Mobile: `py-8` to `py-12`

**Grid Systems:**
- Equipment listings: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- Feature sections: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Category cards: `grid-cols-2 md:grid-cols-4 lg:grid-cols-6`

---

## Component Library

### Navigation
**Header:** Sticky navigation with logo left, primary links center (Browse, List Equipment, How It Works, About), user actions right (Search icon, Login/Sign Up). Height: h-16 to h-20. Include trust badge ("Connecting 10,000+ Farmers").

**Categories Bar:** Horizontal scrollable category chips below header - Tractors, Harvesters, Irrigation, Tillers, Seeders, Hand Tools, Storage, Transport. Each with relevant icon from Heroicons.

### Homepage Sections

**Hero Section (80vh):**
- Large background image: Farmer operating machinery in golden wheat field, morning light
- Overlay gradient for text readability
- Centered content: Headline "Rent & Share Farm Equipment", subheadline "Access quality machinery without the ownership cost", search bar (Location + Equipment Type + Date Range), blurred background CTA button
- Trust indicators below search: "500+ Tools Available | Verified Owners | Flexible Terms"

**Category Showcase:**
- Six large category cards with imagery
- Each card: Equipment photo background, category name overlay, item count
- Hover effect: subtle scale

**Featured Equipment:**
- Carousel/grid of 8 equipment cards
- Card structure: Square image, equipment name, hourly/daily rate, location with pin icon, rating stars, "Quick View" button

**How It Works:**
- Three-column layout
- Each column: Large numeral (1, 2, 3), icon, headline, description
- Steps: "Browse Equipment" → "Book & Confirm" → "Pick Up & Use"

**Trust & Safety:**
- Two-column split: Left side has imagery (handshake/farmer), right side has verification features list with checkmarks
- Include: Verified owners, equipment inspection, insurance coverage, secure payments, 24/7 support

**Testimonials:**
- Three-column grid of farmer testimonials
- Each: Profile photo, quote, name, location, farm type

**CTA Section:**
- Split layout: "Looking to Rent?" (left) | "Have Equipment to Share?" (right)
- Each with relevant imagery, description, prominent CTA button

### Browse/Listing Page

**Filter Sidebar (Desktop) / Collapsible (Mobile):**
- Categories checkbox group
- Price range slider (per hour/day/week)
- Location radius selector with map preview
- Availability calendar
- Equipment condition filters
- "Apply Filters" button at bottom

**Results Grid:**
- Breadcrumb navigation above
- Sort dropdown: "Relevance | Price: Low to High | Newest | Highest Rated"
- Results count and active filters as removable tags
- Grid layout with equipment cards (detailed version with larger images)

**Equipment Card (Enhanced):**
- 4:3 ratio image with favorite heart icon overlay
- Equipment name and model
- Rating (stars + review count)
- Pricing structure: "₹500/day" with cross-out for "₹800/day" showing savings
- Location with distance
- Key specs badges: "2020 Model | GPS Enabled | Fuel Included"
- Owner badge: Small profile photo + "Verified Owner"

### Equipment Detail Page

**Image Gallery:**
- Large primary image with thumbnail gallery below (5-8 images)
- Lightbox functionality indicator

**Details Panel (Two-Column):**
Left column: Equipment specifications grid, features list with icons, usage instructions
Right column (sticky): Pricing card with calendar date picker, rental duration selector, total calculation, "Request Booking" CTA, owner contact button, share/save icons

**Owner Section:**
- Profile card: Photo, name, join date, response rate, rating
- "Message Owner" button
- Other equipment by owner (carousel)

**Reviews Section:**
- Overall rating breakdown with bars
- Individual reviews with photos, verified badge, helpful count

**Similar Equipment:**
- Horizontal scroll carousel of related items

### List Equipment Page

**Multi-Step Form:**
- Progress indicator: "Equipment Details → Photos & Pricing → Availability → Review"
- Form sections with clear labels and helper text
- Upload area for 5-10 photos (drag-and-drop zone)
- Fields: Category, Brand/Model, Year, Condition, Specifications (dynamic based on category), Description (rich text), Hourly/Daily/Weekly rates, Delivery options, Location, Available dates, Terms & conditions
- "Save Draft" and "Submit Listing" buttons

### Footer
- Four-column layout: About KrishiLink (mission statement), Quick Links (Browse, List Equipment, How It Works, FAQs), Support (Contact, Safety, Insurance, Terms), Connect (Newsletter signup, social icons)
- Bottom bar: Copyright, Privacy Policy, Terms of Service, language selector
- Trust badges: Secure payments, verified platform, farmer-backed

---

## Images

**Hero Image:** Full-width, 80vh - Golden wheat field at sunrise with modern tractor, farmer visible in cab, conveying prosperity and modern agriculture

**Category Cards (6 images):**
- Tractors: Red tractor in green field
- Harvesters: Combine harvester working in golden crop
- Irrigation: Sprinkler system watering crops
- Tillers: Soil preparation equipment in action
- Hand Tools: Collection of quality farming tools
- Storage Equipment: Grain storage silos

**Equipment Listings:** Each listing requires 5-8 high-quality photos showing equipment from multiple angles, close-ups of key features, and in-use scenarios

**How It Works Section:** Three supporting images showing browsing on device, handshake/agreement, farmer successfully using equipment

**Testimonial Photos:** Three authentic farmer profile photos with agricultural backgrounds

**Trust Section:** Professional photo of two farmers shaking hands or inspecting equipment together

**CTA Sections:** Two complementary images - one of farmer browsing equipment on tablet, another of equipment owner with their machinery

---

## Design Elements

**Icons:** Heroicons (outline style) for consistency - equipment categories, features, navigation, form inputs

**Cards:** Rounded corners (rounded-lg to rounded-xl), subtle shadow (shadow-md), hover shadow lift (hover:shadow-xl transition)

**Badges/Tags:** Pill-shaped with rounded-full, small padding (px-3 py-1), used for categories, features, status

**Search Bar:** Large, prominent with rounded-full styling, icon prefixes, dropdown for equipment types, clear visual focus state

**Buttons:**
- Primary CTA: Large (px-8 py-3), rounded-lg, font-semibold
- Secondary: Outlined style with border-2
- Ghost: Transparent with hover background
- Blurred backgrounds for buttons over images

**Rating System:** Star icons with fractional fill capability, accompanying text showing count "(245 reviews)"

**Forms:** Consistent input styling with rounded-md, border focus states, floating labels for text inputs, clear error messaging

**Accessibility:** Maintain WCAG AA standards, keyboard navigation, screen reader labels, sufficient contrast ratios, focus indicators on all interactive elements

---

## Animations

**Minimal & Purposeful:**
- Card hover: Subtle scale (scale-105) and shadow transition
- Image loading: Skeleton screens with subtle pulse
- Filter panel: Smooth slide-in/out on mobile
- Scroll reveal: Fade-in for section headers only
- No parallax, no continuous animations

This design creates a trustworthy, professional marketplace that respects the agricultural community while delivering modern e-commerce functionality.