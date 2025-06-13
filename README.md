# Sneaker Marketplace

A modern e-commerce platform for buying and selling sneakers, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🏠 Home page with featured products and categories
- 🔍 Product listing with category filtering
- 👟 Detailed product pages with size selection
- 🛒 Shopping cart with persistent storage
- 👤 User profile with order history
- 📱 Responsive design for all devices

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Zustand for state management
- React Icons
- Heroicons

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd sneaker-marketplace
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── cart/              # Shopping cart page
│   ├── products/          # Product listing and detail pages
│   ├── profile/           # User profile page
│   └── layout.tsx         # Root layout with navigation
├── components/            # Reusable components
├── data/                  # Mock data
└── store/                # Zustand store
└── lib/                  # Utility functions and helpers
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
