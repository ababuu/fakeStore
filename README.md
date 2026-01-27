# FakeStore E-Commerce App

A modern, enterprise-grade e-commerce application built with React 18, shadcn/ui, Zustand, and Tailwind CSS. Features a beautiful UI with a complete shopping cart system and professional architecture.

🔗 [Live Preview](https://fake-store-navy-six.vercel.app/)

## ✨ Features

### 🎨 Modern UI/UX

- **shadcn/ui Components**: Beautiful, accessible UI components
- **Tailwind CSS**: Modern styling with responsive design
- **Smooth Animations**: Professional transitions and hover effects
- **Gradient Themes**: Purple/Indigo gradient color scheme
- **Mobile-First**: Fully responsive across all devices

### 🛒 Shopping Cart

- **Zustand State Management**: Global state management for cart
- **Persistent Cart**: Cart persists in localStorage
- **Quantity Management**: Increment/decrement product quantities
- **Real-time Total**: Live price calculation
- **Smooth Modals**: Beautiful dialog-based cart view

### 🏗️ Enterprise Architecture

- **Service Layer**: Separated API calls in dedicated services
- **Custom Hooks**: Reusable hooks for data fetching
- **Store Management**: Zustand stores for cart and products
- **Utility Functions**: Helper functions for formatting and validation
- **Component Structure**: Organized component hierarchy

### 📦 Key Features

- Hero section with call-to-action
- Featured products showcase
- Complete product catalog
- Shopping cart with full CRUD operations
- Loading states and error handling
- Feature highlights section
- Responsive navigation

## 🚀 Technologies Used

### Core

- **React 18.2**: Latest React with concurrent features
- **React Router DOM 6**: Client-side routing
- **Zustand 4.4**: Lightweight state management

### UI & Styling

- **shadcn/ui**: High-quality React component library
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library
- **CVA**: Class variance authority for component variants

### Data & API

- **Axios**: HTTP client for API requests
- **Fake Store API**: Product data source

### Developer Tools

- **React Scripts 5**: Create React App build tools
- **PostCSS**: CSS transformations
- **Autoprefixer**: CSS vendor prefixing

## 📁 Project Structure

```
shopping_cart_react/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ShoppingCartModal.jsx
│   │   └── LoadingSpinner.jsx
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   └── Shop.jsx
│   ├── services/            # API services
│   │   ├── api.js
│   │   └── productService.js
│   ├── store/               # Zustand stores
│   │   ├── useCartStore.js
│   │   └── useProductStore.js
│   ├── hooks/               # Custom hooks
│   │   └── useProducts.js
│   ├── lib/                 # Utilities
│   │   └── utils.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── public/
├── tailwind.config.js
├── postcss.config.js
├── jsconfig.json
└── package.json
```

## 🎯 Recent Updates (v2.0)

### Major Refactoring

- ✅ **Fixed Node.js compatibility**: Upgraded to React Scripts 5 for Node 17+
- ✅ **Complete architecture overhaul**: Enterprise-level folder structure
- ✅ **Removed unused dependencies**: Cleaned up reactjs-popup, react-numeric-input, react-pro-sidebar
- ✅ **Added modern stack**: shadcn/ui, Zustand, Tailwind CSS, Axios
- ✅ **Service layer implementation**: Separated API logic from components
- ✅ **Custom hooks**: Created reusable hooks for data fetching
- ✅ **State management**: Implemented Zustand for global state
- ✅ **Path aliases**: Added @/ import alias for cleaner imports

### Previous Updates (v1.0)

- ✅ **Fixed Issue #1**: Homepage blank loading issue
- ✅ Enhanced homepage with hero section
- ✅ Improved cart functionality

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 14+ (Recommended: Node.js 18+)
- npm or yarn

### Installation Steps

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd shopping_cart_react
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm start      # Start development server
npm build      # Build for production
npm test       # Run tests
npm eject      # Eject from Create React App
```

## 🎨 Design System

### Colors

- **Primary**: Purple gradient (#667eea → #764ba2)
- **Accent**: Indigo shades
- **Text**: Gray scale for hierarchy
- **Destructive**: Red for delete actions

### Components

All UI components are built with shadcn/ui for consistency:

- Button (multiple variants and sizes)
- Card (product and feature cards)
- Dialog (shopping cart modal)
- Scroll Area (smooth scrolling)
- Separator (visual dividers)

## 📝 API Integration

### Fake Store API

- **Base URL**: `https://fakestoreapi.com`
- **Endpoints Used**:
  - `GET /products` - All products
  - `GET /products?limit={n}` - Limited products
  - `GET /products/{id}` - Single product
  - `GET /products/categories` - All categories
  - `GET /products/category/{category}` - Products by category

### Service Layer

API calls are abstracted in `services/productService.js` for:

- Clean separation of concerns
- Easy testing and mocking
- Centralized error handling
- Type safety potential

## 🔧 Configuration

### Path Aliases

Configured in `jsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"]
    }
  }
}
```

### Tailwind Configuration

Custom theme extensions in `tailwind.config.js` for shadcn/ui compatibility.

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The optimized build will be in the `build/` directory, ready to deploy to:

- Firebase Hosting
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [Fake Store API](https://fakestoreapi.com/) for product data
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Zustand](https://github.com/pmndrs/zustand) for state management
- [Radix UI](https://www.radix-ui.com/) for accessible primitives

---

Built with ❤️ using React, Tailwind CSS, and shadcn/ui
