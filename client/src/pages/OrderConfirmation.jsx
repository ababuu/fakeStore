import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import { Separator } from "../components/ui/separator";
import { formatCurrency } from "../lib/utils";
import { orderService } from "../services/orderService";

const OrderConfirmation = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [order, setOrder] = useState(state?.order || null);
  const [loading, setLoading] = useState(!state?.order);
  const [error, setError] = useState(null);
  const isNew = state?.isNew ?? false;

  useEffect(() => {
    if (!order) {
      orderService
        .getOrder(id)
        .then((res) => setOrder(res.data))
        .catch(() => setError("Order not found."))
        .finally(() => setLoading(false));
    }
  }, [id, order]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-24 pb-16 container mx-auto px-4 max-w-2xl">
        {loading && (
          <p className="text-center text-slate-500 mt-16">Loading order…</p>
        )}

        {error && (
          <p className="text-center text-red-600 mt-16">{error}</p>
        )}

        {order && (
          <>
            <div className="flex flex-col items-center text-center mb-8">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h1 className="text-2xl font-bold text-slate-900">
                {isNew ? "Order placed!" : `Order #${order.id}`}
              </h1>
              <p className="text-slate-500 mt-1 text-sm">
                {isNew
                  ? "Thanks for your purchase. Your order has been confirmed."
                  : `Placed on ${new Date(order.created_at).toLocaleDateString()}`}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                <h2 className="font-semibold text-slate-800">Items</h2>
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                  {order.status}
                </span>
              </div>

              <ul className="divide-y divide-slate-100">
                {order.items.map((item) => (
                  <li key={item.id} className="flex items-center gap-4 px-6 py-4">
                    <div className="h-14 w-14 flex-shrink-0 rounded-lg bg-slate-50 border border-slate-100 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 line-clamp-1">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {formatCurrency(item.price)} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-slate-900 whitespace-nowrap">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                <Separator className="mb-3" />
                <div className="flex justify-between text-base font-bold text-slate-900">
                  <span>Total</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/orders"
                className="flex-1 text-center rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Order History
              </Link>
              <Link
                to="/products"
                className="flex-1 text-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmation;
