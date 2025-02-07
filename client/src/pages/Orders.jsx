import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package } from "lucide-react";
import Navbar from "../components/Navbar";
import { Separator } from "../components/ui/separator";
import { formatCurrency } from "../lib/utils";
import useAuthStore from "../store/useAuthStore";
import { orderService } from "../services/orderService";

const statusColors = {
  pending: "bg-yellow-50 text-yellow-700",
  confirmed: "bg-blue-50 text-blue-700",
  shipped: "bg-indigo-50 text-indigo-700",
  delivered: "bg-green-50 text-green-700",
};

const Orders = () => {
  const navigate = useNavigate();
  const { isAuthenticated, initializing } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initializing) return;
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    orderService
      .listOrders()
      .then((res) => setOrders(res.data))
      .catch(() => setError("Failed to load orders."))
      .finally(() => setLoading(false));
  }, [isAuthenticated, initializing, navigate]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-24 pb-16 container mx-auto px-4 max-w-3xl">
        <h1 className="text-2xl font-bold text-slate-900 mb-8">Order History</h1>

        {loading && (
          <p className="text-center text-slate-500 mt-16">Loading…</p>
        )}

        {error && (
          <p className="text-center text-red-600 mt-16">{error}</p>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 mt-16">
            <Package className="h-16 w-16 text-slate-300" />
            <p className="text-slate-600">No orders yet.</p>
            <Link
              to="/products"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
              Start Shopping
            </Link>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Order #{order.id}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {new Date(order.created_at).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-medium uppercase tracking-wide px-2.5 py-1 rounded-full ${
                        statusColors[order.status] ?? "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {order.status}
                    </span>
                    <Link
                      to={`/orders/${order.id}`}
                      className="text-xs font-medium text-slate-700 hover:text-slate-900 underline-offset-2 hover:underline"
                    >
                      View
                    </Link>
                  </div>
                </div>

                {/* Items preview */}
                <div className="px-6 py-3 flex items-center gap-3 overflow-x-auto">
                  {order.items.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className="h-12 w-12 flex-shrink-0 rounded-lg bg-slate-50 border border-slate-100 overflow-hidden"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-contain p-1"
                      />
                    </div>
                  ))}
                  {order.items.length > 4 && (
                    <span className="text-xs text-slate-400 whitespace-nowrap">
                      +{order.items.length - 4} more
                    </span>
                  )}
                </div>

                {/* Total */}
                <div className="px-6 pb-4">
                  <Separator className="mb-3" />
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">
                      {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                    </span>
                    <span className="font-semibold text-slate-900">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Orders;
