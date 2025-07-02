# Pro Tana Golf Studio Website

## Overview

Pro Tana Golf Studio is a Thai-language multi-page static website for a golf school. The website serves as a digital presence for the golf academy, providing information about courses, instructors, and contact details. Built using vanilla HTML, CSS, and JavaScript without any frameworks, the site focuses on simplicity and performance while maintaining a professional appearance suitable for a golf instruction business.

## System Architecture

### Frontend Architecture
- **Static Site Structure**: Pure HTML5, CSS3, and vanilla JavaScript
- **Multi-page Application**: Four main pages (Home, About, Courses, Contact)
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Theme System**: Light/dark mode toggle with localStorage persistence
- **Progressive Enhancement**: Core functionality works without JavaScript

### Technology Stack
- HTML5 for semantic markup
- CSS3 with custom properties (CSS variables) for theming
- Vanilla JavaScript for interactive features
- Font Awesome for icons
- Google Fonts (Sarabun) for Thai typography
- No build tools or bundlers required

## Key Components

### Navigation System
- Responsive navigation bar with hamburger menu for mobile
- Active page highlighting
- Consistent across all pages
- Logo integration with golf ball icon

### Theme Management
- Light/dark mode toggle
- User preference persistence via localStorage
- Smooth transitions between themes
- CSS custom properties for color scheme management

### Content Structure
- **index.html**: Landing page with hero section and call-to-action
- **about.html**: Studio history, instructor profiles, and facilities
- **courses.html**: Course offerings for different skill levels and age groups
- **contact.html**: Contact information, working contact form with Formspree integration, and LINE QR code

### Styling Architecture
- CSS Reset for cross-browser consistency
- CSS custom properties for maintainable theming
- Modular CSS structure
- Mobile-first responsive design
- Semantic class naming convention

## Data Flow

### Static Content Flow
1. User navigates to any page
2. HTML content loads immediately
3. CSS applies styling and responsive layout
4. JavaScript enhances with theme toggle and mobile menu
5. Font assets and icons load asynchronously

### Theme State Management
1. Check localStorage for saved theme preference
2. Apply theme on page load
3. Update theme variables when user toggles
4. Persist new preference to localStorage
5. Maintain state across page navigation

## External Dependencies

### CDN Resources
- **Google Fonts**: Sarabun font family for Thai language support
- **Font Awesome**: Icon library for UI elements
- **Rationale**: Using CDNs reduces bundle size and leverages browser caching

### Asset Management
- Local images stored in `/img/` directory
- Optimized for web delivery
- Includes instructor photos, course images, and QR codes

## Deployment Strategy

### Static Hosting
- Compatible with any static hosting provider
- No server-side processing required
- Simple file-based deployment
- Fast loading times due to minimal dependencies

### Performance Considerations
- Minimal JavaScript footprint
- Efficient CSS with custom properties
- Optimized font loading with preconnect
- Responsive images for different screen sizes

### Browser Compatibility
- Modern browsers with CSS custom properties support
- Graceful degradation for older browsers
- Progressive enhancement approach

## Changelog

- July 01, 2025: Initial setup
- July 01, 2025: Added LINE QR code integration and working contact form with Formspree

## User Preferences

Preferred communication style: Simple, everyday language.
