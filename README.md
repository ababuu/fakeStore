# FakeStore

A full-stack e-commerceapp — React 18 SPA frontend backed by a FastAPI REST API, with JWT authentication via httpOnly cookies, a server-side cart, and a complete checkout + order history flow.

```
client/   React 18 · Zustand · Tailwind CSS · shadcn/ui
server/   FastAPI · SQLAlchemy 2 · Alembic · SQLite · python-jose
```

---

## Features

- **Product catalog** — browse and filter 20 seeded products across 4 categories
- **Auth** — register / login / logout via JWT stored in httpOnly cookies (no localStorage token)
- **Cart** — guest cart in localStorage, synced to the server on login, full CRUD
- **Checkout** — place an order from your cart; price/title/image are snapshotted at purchase time
- **Order history** — view all past orders and individual order details

---

## Quick Start (local dev)

**Requirements:** Node 20+, Python 3.12+ (3.14 works with the pinned deps)

### 1 — Backend

```bash
cd server
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
cp .env.example .env          # edit SECRET_KEY before production

alembic upgrade head
python -m app.utils.seed      # seeds 20 products from fakestoreapi.com

uvicorn main:app --reload --port 8000
```

API available at `http://localhost:8000` — interactive docs at `/docs`.

### 2 — Frontend

```bash
cd client
cp .env.example .env          # REACT_APP_API_URL=http://localhost:8000/api/v1
npm install
npm start
```

App available at `http://localhost:3000`.

---

## Docker

Runs the full stack with a single command. The SQLite database is stored in a named volume so it survives container restarts.

```bash
# Copy and fill in the root .env (only SECRET_KEY is required)
cp .env.example .env

docker compose up --build
```

| Service           | URL                        |
| ----------------- | -------------------------- |
| Frontend (nginx)  | http://localhost:3000      |
| Backend (FastAPI) | http://localhost:8000      |
| API docs          | http://localhost:8000/docs |

The client container builds the React app with `REACT_APP_API_URL=/api/v1` so all API calls are proxied through nginx to the backend — no cross-origin requests in production.

---

## Project Structure

```
fakeStore/
├── client/                   # React SPA
│   ├── src/
│   │   ├── components/       # Navbar, ProductCard, ShoppingCartModal, ui/
│   │   ├── pages/            # Home, Shop, Login, Register, Checkout,
│   │   │                     #   OrderConfirmation, Orders
│   │   ├── services/         # axios wrappers (api, auth, cart, order)
│   │   └── store/            # Zustand stores (auth, cart, product)
│   ├── Dockerfile
│   └── nginx.conf
│
├── server/                   # FastAPI backend
│   ├── app/
│   │   ├── models/           # SQLAlchemy ORM (Product, User, CartItem, Order)
│   │   ├── routers/          # products, auth, cart, orders
│   │   ├── schemas/          # Pydantic request/response models
│   │   ├── utils/            # security (JWT + bcrypt), seed
│   │   └── dependencies/     # auth FastAPI dependencies
│   ├── alembic/              # database migrations
│   ├── Dockerfile
│   ├── entrypoint.sh
│   └── requirements.txt
│
└── docker-compose.yml
```

---

## API Reference

All endpoints are prefixed with `/api/v1`.

### Auth

| Method | Path             | Auth | Description                 |
| ------ | ---------------- | ---- | --------------------------- |
| POST   | `/auth/register` | —    | Create account + set cookie |
| POST   | `/auth/login`    | —    | Login + set cookie          |
| POST   | `/auth/logout`   | —    | Clear cookie                |
| GET    | `/auth/me`       | ✓    | Current user                |

### Products

| Method | Path                        | Description          |
| ------ | --------------------------- | -------------------- |
| GET    | `/products`                 | List all products    |
| GET    | `/products/categories`      | List categories      |
| GET    | `/products/category/{name}` | Products by category |
| GET    | `/products/{id}`            | Single product       |

### Cart

| Method | Path                       | Description               |
| ------ | -------------------------- | ------------------------- |
| GET    | `/cart`                    | Get cart + total          |
| POST   | `/cart/items`              | Add item                  |
| PUT    | `/cart/items/{product_id}` | Update quantity           |
| DELETE | `/cart/items/{product_id}` | Remove item               |
| DELETE | `/cart`                    | Clear cart                |
| POST   | `/cart/merge`              | Merge guest cart on login |

### Orders

| Method | Path           | Description                 |
| ------ | -------------- | --------------------------- |
| POST   | `/orders`      | Place order (converts cart) |
| GET    | `/orders`      | List all orders             |
| GET    | `/orders/{id}` | Single order                |

---

## Tech Stack

**Frontend** — React 18, React Router 6, Zustand, Axios, Tailwind CSS, shadcn/ui (Radix UI), Lucide icons

**Backend** — FastAPI, SQLAlchemy 2, Alembic, Pydantic v2, python-jose (JWT), bcrypt, SQLite (dev / Docker), uvicorn

**Infrastructure** — Docker, docker compose, nginx (reverse proxy + static file server)

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
