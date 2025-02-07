import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import useCartStore from "../store/useCartStore";
import useAuthStore from "../store/useAuthStore";
import { authService } from "../services/authService";

const Navbar = () => {
  const { getCartItemCount, openCart } = useCartStore();
  const itemCount = getCartItemCount();
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (_) {
      // ignore server errors on logout
    }
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold text-slate-900 hover:text-slate-700 transition-colors"
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
            {isAuthenticated ? (
              <>
                <Link
                  to="/orders"
                  className="text-slate-700 hover:text-slate-900 transition-colors font-medium text-sm"
                >
                  Orders
                </Link>
                <span className="flex items-center gap-1.5 text-sm text-slate-700">
                  <User className="h-4 w-4" />
                  {user?.full_name?.split(" ")[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-700 hover:text-slate-900 transition-colors font-medium text-sm"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
                >
                  Sign up
                </Link>
              </>
            )}
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
