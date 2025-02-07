import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Truck, Shield, RefreshCw, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ShoppingCartModal from "../components/ShoppingCartModal";
import { useFeaturedProducts } from "../hooks/useProducts";

const Home = () => {
  const { featuredProducts, loading, error } = useFeaturedProducts(3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <ShoppingCartModal />

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 text-slate-900 tracking-tight">
              Modern Shopping
              <span className="block text-slate-600 mt-2">Simplified</span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl mb-6 md:mb-10 text-slate-600 max-w-2xl mx-auto">
              Discover curated products with seamless shopping experience
            </p>
            <Link to="/products">
              <Button
                size="lg"
                className="bg-slate-900 text-white hover:bg-slate-800 text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold mb-2 md:mb-4 text-gray-900">
            Featured Products
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Check out our hand-picked selection of amazing products
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center text-red-500 py-8">
            <p className="text-base sm:text-lg">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4"
              variant="outline"
            >
              Retry
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center">
          <Link to="/products">
            <Button
              size="lg"
              className="bg-slate-900 hover:bg-slate-800 text-white rounded-full text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-6"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-10 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6 md:pt-8 pb-6 md:pb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-slate-100 mb-4">
                  <Truck className="h-7 w-7 md:h-8 md:w-8 text-slate-700" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  Free Shipping
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  On orders over $50
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6 md:pt-8 pb-6 md:pb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-slate-100 mb-4">
                  <Shield className="h-7 w-7 md:h-8 md:w-8 text-slate-700" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  Secure Payment
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  100% secure transactions
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6 md:pt-8 pb-6 md:pb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-slate-100 mb-4">
                  <RefreshCw className="h-7 w-7 md:h-8 md:w-8 text-slate-700" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  Easy Returns
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  30-day return policy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 FakeStore. All rights reserved. Built with React & Tailwind
            CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
