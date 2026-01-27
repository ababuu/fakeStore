import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import useCartStore from "../store/useCartStore";

const Navbar = () => {
  const { getCartItemCount, openCart } = useCartStore();
  const itemCount = getCartItemCount();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-2xl font-bold text-slate-900 hover:text-slate-700 transition-colors"
          >
            FakeStore
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-slate-700 hover:text-slate-900 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-slate-700 hover:text-slate-900 transition-colors font-medium"
            >
              Shop
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="relative text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              onClick={openCart}
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
