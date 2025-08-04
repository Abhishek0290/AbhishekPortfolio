# Overview

This is a personal portfolio website for Abhishek Dwivedi, built as a single-page application using vanilla HTML, CSS, and JavaScript. The portfolio showcases sections for home, about, projects, certifications, hackathons, and contact information. The website features a modern, responsive design with smooth scrolling navigation and mobile-friendly interface elements.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Single-page application (SPA)** built with vanilla web technologies
- **Component-based structure** using semantic HTML sections for different portfolio areas
- **Responsive design** with mobile-first approach and hamburger menu for mobile navigation
- **Modern CSS features** including backdrop-filter for glassmorphism effects and CSS Grid/Flexbox for layouts
- **Progressive enhancement** with JavaScript for interactive features like smooth scrolling and dynamic navigation states

## Design Patterns
- **Modular CSS organization** with clear separation of concerns (reset, base styles, component styles)
- **Event-driven JavaScript** architecture using addEventListener for user interactions
- **Smooth scrolling navigation** with active link highlighting based on scroll position
- **Mobile-responsive navigation** with toggle functionality for smaller screens

## Performance Optimizations
- **External font loading** using Google Fonts with display=swap for better loading performance
- **CSS transitions and transforms** for smooth animations without JavaScript animation libraries
- **Efficient DOM manipulation** using getElementById and querySelectorAll for minimal performance impact

# External Dependencies

## CDN Resources
- **Google Fonts API** - Inter font family for typography (weights: 300, 400, 500, 600, 700)
- **Font Awesome 6.0.0** - Icon library for UI elements and social media icons

## Browser APIs
- **Intersection Observer API** (implied) - For scroll-based navigation highlighting
- **Scroll API** - For smooth scrolling behavior and scroll position detection
- **DOM Events API** - For user interaction handling (click, scroll, resize events)