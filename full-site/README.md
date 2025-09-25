# Jewish Mother's Deli - Coming Soon Page

A modern, responsive React frontend for the Jewish Mother's Deli coming soon page, built with **Vite + React + TypeScript + Chakra UI**.

## 🎯 Project Overview

This project reimplements the original HTML coming soon page as a full responsive frontend while maintaining:
- **All original styling and aesthetics** from `todo-plan.md`
- **Complete SEO optimization** with meta tags, Open Graph, and schema markup
- **High-Level API integration** for contact form submissions
- **Warm, sophisticated, and welcoming aesthetic** perfect for a traditional Jewish deli

## 🚀 Tech Stack

- **Vite** - Fast build tool and dev server
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Chakra UI** - Accessible component library with custom theme
- **Framer Motion** - Smooth animations and transitions

## 🎨 Design System

### Colors (Exact from `todo-plan.md`)
- **Warm Cream**: `#fbe7cc` (Background base)
- **Dark Brown**: `#6f3e13` (Primary text, taglines)
- **Medium Brown**: `#8a542e` (Highlights, accents, buttons)
- **Light Brown**: `#5D5A54` (Description text)

### Typography
- **Primary Font**: `'Inter', sans-serif` (weights: 300, 400, 500)
- **Secondary Font**: `'Playfair Display', serif` (weights: 400, 600, italic)

### Features
- **Glassmorphism effects** for forms (`backdrop-filter: blur(10px)`)
- **Layered background patterns** with subtle brown overlays
- **Responsive breakpoints**: 480px, 768px, 968px, 1200px
- **Staggered fade-in animations** with proper timing

## 📱 Responsive Design

- **Mobile-first approach** with progressive enhancement
- **Breakpoint system**: Base → 480px → 768px → 968px → 1200px
- **Adaptive layouts**: Column stacking on mobile, side-by-side on desktop
- **Touch-friendly interactions** with proper hover states

## 🔧 Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Setup
The project includes the High-Level API integration with the working token from the original implementation.

## 📁 Project Structure

```
jewish-mother/
├── src/
│   ├── components/
│   │   ├── ComingSoonPage.tsx      # Main page component
│   │   ├── SignupForm.tsx          # Contact form with API integration
│   │   └── BackgroundPatterns.tsx  # Background texture patterns
│   ├── theme/
│   │   └── index.ts                # Chakra UI theme configuration
│   ├── App.tsx                     # Main app wrapper
│   └── main.tsx                    # Entry point
├── public/                          # Static assets
├── package.json                     # Dependencies and scripts
├── vite.config.ts                   # Vite configuration
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # This file
```

## 🎭 Components

### ComingSoonPage
- **Layout**: Two-column responsive design (logo + content)
- **Animations**: Staggered fade-in effects (left, right, up)
- **Responsive**: Adapts from column to row layout based on screen size

### SignupForm
- **Glassmorphism**: Semi-transparent background with blur effect
- **API Integration**: High-Level contact form submission
- **Validation**: Required field handling with user feedback
- **Success State**: Animated confirmation message

### BackgroundPatterns
- **Layered Gradients**: Multiple radial and linear gradients
- **Grid Patterns**: Subtle repeating lines for texture
- **Performance**: Fixed positioning with pointer-events disabled

## 🔍 SEO Features

- **Meta Tags**: Complete title, description, and viewport settings
- **Open Graph**: Facebook and social media optimization
- **Twitter Cards**: Twitter-specific meta information
- **Schema Markup**: Structured data for restaurant information
- **Favicon**: Multiple formats for cross-platform compatibility

## 🚀 Performance Features

- **Lazy Loading**: Components load only when needed
- **Optimized Images**: Responsive image sizing
- **CSS-in-JS**: Efficient styling with Chakra UI
- **Bundle Splitting**: Vite's automatic code splitting

## 🎨 Customization

### Theme Modifications
Edit `src/theme/index.ts` to modify:
- Color palette
- Typography scales
- Component variants
- Animation timings

### Component Styling
Each component uses Chakra UI's theme system for consistent styling that follows the design system.

## 📋 Compliance with `todo-plan.md`

✅ **Fonts**: Exact Inter and Playfair Display implementation  
✅ **Colors**: Complete color palette matching specifications  
✅ **Typography Scale**: Responsive font sizes with proper line heights  
✅ **Layout**: Two-column responsive design with proper spacing  
✅ **Background**: Layered gradients and texture patterns  
✅ **Glassmorphism**: Forms with backdrop-filter blur effects  
✅ **Responsiveness**: Mobile-first with specified breakpoints  
✅ **Animations**: Staggered fade-in with proper timing  
✅ **SEO**: All meta tags and schema markup preserved  
✅ **Integration**: High-Level API functionality maintained  

## 🌟 Key Benefits

1. **Modern Development**: TypeScript + React for maintainable code
2. **Design Fidelity**: Pixel-perfect recreation of original aesthetics
3. **Performance**: Vite's fast build and optimized output
4. **Accessibility**: Chakra UI's built-in accessibility features
5. **Scalability**: Component-based architecture for future expansion

## 🔮 Future Enhancements

The component-based architecture makes it easy to add:
- Additional pages (Menu, About, Contact)
- Blog or news sections
- Online ordering integration
- Customer testimonials
- Photo galleries

## 📞 Support

This implementation follows all specifications from `todo-plan.md` and maintains the warm, sophisticated aesthetic perfect for a traditional Jewish deli with modern presentation.
