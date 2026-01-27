import React from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ShoppingCartModal from "../components/ShoppingCartModal";
import { Button } from "../components/ui/button";
import { useProducts } from "../hooks/useProducts";

const Shop = () => {
  const { products, loading, error } = useProducts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <ShoppingCartModal />

      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Our Products
          </h1>
          <p className="text-lg text-gray-600">
            Browse through our complete collection of amazing products
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center text-red-500 py-16">
            <p className="text-xl mb-4">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              size="lg"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
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

export default Shop;
