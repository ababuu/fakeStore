import api from './api';

export const productService = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
  },

  // Get limited products
  getLimitedProducts: async (limit = 3) => {
    try {
      const response = await api.get(`/products?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch featured products');
    }
  },

  // Get single product
  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch product ${id}`);
    }
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    try {
      const response = await api.get(`/products/category/${category}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch products in category ${category}`);
    }
  },

  // Get all categories
  getCategories: async () => {
    try {
      const response = await api.get('/products/categories');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch categories');
    }
  },
};
