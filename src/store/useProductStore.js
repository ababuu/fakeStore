import { create } from 'zustand';

const useProductStore = create((set, get) => ({
  products: [],
  featuredProducts: [],
  categories: [],
  loading: false,
  error: null,

  setProducts: (products) => set({ products }),
  setFeaturedProducts: (featuredProducts) => set({ featuredProducts }),
  setCategories: (categories) => set({ categories }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Get product by ID
  getProductById: (id) => {
    return get().products.find((product) => product.id === id);
  },
}));

export default useProductStore;
