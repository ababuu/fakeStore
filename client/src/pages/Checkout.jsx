import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import Navbar from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { formatCurrency } from "../lib/utils";
import useCartStore from "../store/useCartStore";
import useAuthStore from "../store/useAuthStore";
import { orderService } from "../services/orderService";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const total = getCartTotal();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="pt-24 flex flex-col items-center justify-center gap-4">
          <p className="text-slate-600">You need to sign in to checkout.</p>
          <Link
            to="/login"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="pt-24 flex flex-col items-center justify-center gap-4">
          <ShoppingBag className="h-16 w-16 text-slate-300" />
          <p className="text-slate-600">Your cart is empty.</p>
          <Link
            to="/products"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await orderService.placeOrder();
      clearCart(true);
      navigate(`/orders/${res.data.id}`, { state: { order: res.data, isNew: true } });
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-24 pb-16 container mx-auto px-4 max-w-3xl">
        <h1 className="text-2xl font-bold text-slate-900 mb-8">Checkout</h1>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Order Summary</h2>
          </div>

          <ul className="divide-y divide-slate-100">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center gap-4 px-6 py-4">
                <div className="h-16 w-16 flex-shrink-0 rounded-lg bg-slate-50 border border-slate-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-contain p-1"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 line-clamp-1">{item.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-slate-900 whitespace-nowrap">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </li>
            ))}
          </ul>

          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>Subtotal</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600 mb-3">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <Separator className="mb-3" />
            <div className="flex justify-between text-lg font-bold text-slate-900">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            to="/products"
            className="flex-1 text-center rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Continue Shopping
          </Link>
          <Button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="flex-1 bg-slate-900 hover:bg-slate-700 text-white py-2.5"
          >
            {loading ? "Placing order…" : "Place Order"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
