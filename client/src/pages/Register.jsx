import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { cartService } from "../services/cartService";
import useAuthStore from "../store/useAuthStore";
import useCartStore from "../store/useCartStore";
import { Button } from "../components/ui/button";

const Register = () => {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const guestCart = useCartStore((s) => s.cart);
  const fetchCart = useCartStore((s) => s.fetchCart);
  const [form, setForm] = useState({
    email: "",
    full_name: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await authService.register(form);
      login(res.data);
      if (guestCart.length > 0) {
        try {
          await cartService.mergeCart(guestCart);
        } catch {
          /* non-critical */
        }
      }
      await fetchCart();
      navigate("/");
    } catch (err) {
      const detail = err.response?.data?.detail;
      if (Array.isArray(detail)) {
        setError(detail.map((d) => d.msg).join(" "));
      } else {
        setError(detail || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Create account
        </h1>
        <p className="text-slate-500 mb-6 text-sm">
          Join FakeStore today
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full name
            </label>
            <input
              type="text"
              name="full_name"
              required
              autoComplete="name"
              value={form.full_name}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
              <span className="ml-1 font-normal text-slate-400">
                (min 8 characters)
              </span>
            </label>
            <input
              type="password"
              name="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
              placeholder="••••••••"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-700 text-white"
          >
            {loading ? "Creating account…" : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-slate-900 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
