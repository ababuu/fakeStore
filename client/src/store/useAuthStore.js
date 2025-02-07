import { create } from "zustand";
import { authService } from "../services/authService";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  initializing: true,

  /** Called once on app mount to restore session from httpOnly cookie. */
  initAuth: async () => {
    try {
      const res = await authService.getMe();
      set({ user: res.data, isAuthenticated: true });
    } catch {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ initializing: false });
    }
  },

  login: (userData) => set({ user: userData, isAuthenticated: true }),

  logout: () => set({ user: null, isAuthenticated: false }),
}));

export default useAuthStore;

