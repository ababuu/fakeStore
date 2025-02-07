import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { cartService } from "../services/cartService";

function fromServerItem(serverItem) {
  return { ...serverItem.product, quantity: serverItem.quantity };
}

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,
      syncing: false,

      fetchCart: async () => {
        set({ syncing: true });
        try {
          const res = await cartService.getCart();
          set({ cart: res.data.items.map(fromServerItem) });
        } catch {
        } finally {
          set({ syncing: false });
        }
      },

      addToCart: async (product, isAuthenticated = false) => {
        const cart = get().cart;
        const existing = cart.find((i) => i.id === product.id);
        if (existing) {
          set({ cart: cart.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) });
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        }
        if (isAuthenticated) {
          try { await cartService.addItem(product.id, 1); } catch { set({ cart }); }
        }
      },

      removeFromCart: async (productId, isAuthenticated = false) => {
        const prev = get().cart;
        set({ cart: prev.filter((i) => i.id !== productId) });
        if (isAuthenticated) {
          try { await cartService.removeItem(productId); } catch { set({ cart: prev }); }
        }
      },

      updateQuantity: async (productId, quantity, isAuthenticated = false) => {
        if (quantity <= 0) { get().removeFromCart(productId, isAuthenticated); return; }
        const prev = get().cart;
        set({ cart: prev.map((i) => i.id === productId ? { ...i, quantity } : i) });
        if (isAuthenticated) {
          try { await cartService.updateItem(productId, quantity); } catch { set({ cart: prev }); }
        }
      },

      incrementQuantity: async (productId, isAuthenticated = false) => {
        const item = get().cart.find((i) => i.id === productId);
        if (item) get().updateQuantity(productId, item.quantity + 1, isAuthenticated);
      },

      decrementQuantity: async (productId, isAuthenticated = false) => {
        const item = get().cart.find((i) => i.id === productId);
        if (item) get().updateQuantity(productId, item.quantity - 1, isAuthenticated);
      },

      clearCart: async (isAuthenticated = false) => {
        set({ cart: [] });
        if (isAuthenticated) {
          try { await cartService.clearCart(); } catch { }
        }
      },

      toggleCart: () => set({ isCartOpen: !get().isCartOpen }),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      getCartTotal: () => get().cart.reduce((t, i) => t + i.price * i.quantity, 0),
      getCartItemCount: () => get().cart.reduce((t, i) => t + i.quantity, 0),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cart: state.cart }),
    },
  ),
);

export default useCartStore;
