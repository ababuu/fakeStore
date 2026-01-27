import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,

      // Add item to cart
      addToCart: (product) => {
        const cart = get().cart;
        const existingItem = cart.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            cart: [...cart, { ...product, quantity: 1 }],
          });
        }
      },

      // Remove item from cart
      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter((item) => item.id !== productId),
        });
      },

      // Update item quantity
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        set({
          cart: get().cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      // Increment quantity
      incrementQuantity: (productId) => {
        set({
          cart: get().cart.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        });
      },

      // Decrement quantity
      decrementQuantity: (productId) => {
        const item = get().cart.find((item) => item.id === productId);
        if (item && item.quantity > 1) {
          set({
            cart: get().cart.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          });
        } else {
          get().removeFromCart(productId);
        }
      },

      // Clear cart
      clearCart: () => {
        set({ cart: [] });
      },

      // Toggle cart
      toggleCart: () => {
        set({ isCartOpen: !get().isCartOpen });
      },

      // Open cart
      openCart: () => {
        set({ isCartOpen: true });
      },

      // Close cart
      closeCart: () => {
        set({ isCartOpen: false });
      },

      // Get cart total
      getCartTotal: () => {
        return get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      // Get cart item count
      getCartItemCount: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
