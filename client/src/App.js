import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Orders from "./pages/Orders";
import useAuthStore from "./store/useAuthStore";
import useCartStore from "./store/useCartStore";

function App() {
  const initAuth = useAuthStore((s) => s.initAuth);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const fetchCart = useCartStore((s) => s.fetchCart);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderConfirmation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
