import { useEffect } from 'react';
import { productService } from '@/services/productService';
import useProductStore from '@/store/useProductStore';

export const useProducts = () => {
  const { products, loading, error, setProducts, setLoading, setError } = useProductStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, setProducts, setLoading, setError]);

  return { products, loading, error };
};

export const useFeaturedProducts = (limit = 3) => {
  const { featuredProducts, loading, error, setFeaturedProducts, setLoading, setError } = useProductStore();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getLimitedProducts(limit);
        setFeaturedProducts(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    };

    if (featuredProducts.length === 0) {
      fetchFeaturedProducts();
    }
  }, [limit, featuredProducts.length, setFeaturedProducts, setLoading, setError]);

  return { featuredProducts, loading, error };
};
