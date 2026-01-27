import Nav from "./Nav";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      let products = await fetch(
        "https://fakestoreapi.com/products?limit=3",
      ).then((res) => res.json());
      setFeaturedProducts(products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <Nav />
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to FakeStore</h1>
          <p className="hero-subtitle">
            Discover amazing products at unbeatable prices
          </p>
          <Link to="/products" className="hero-btn">
            Shop Now
          </Link>
        </div>
      </div>

      <div className="featured-section">
        <h2 className="section-title">Featured Products</h2>
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <div className="featured-products">
            {featuredProducts.map((product) => (
              <div key={product.id} className="featured-card">
                <div className="featured-image">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="featured-content">
                  <h3 className="featured-title">{product.title}</h3>
                  <p className="featured-price">${product.price}</p>
                  <Link to="/products" className="featured-link">
                    View All Products
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="features-section">
        <div className="feature-box">
          <div className="feature-icon">🚚</div>
          <h3>Free Shipping</h3>
          <p>On orders over $50</p>
        </div>
        <div className="feature-box">
          <div className="feature-icon">🔒</div>
          <h3>Secure Payment</h3>
          <p>100% secure transactions</p>
        </div>
        <div className="feature-box">
          <div className="feature-icon">↩️</div>
          <h3>Easy Returns</h3>
          <p>30-day return policy</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
