import React from "react";
import { useEffect, useState } from "react";
import cartImage from "./cart.png";

function Cards() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    totalPrice();
  }, [cart]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let fetchedProducts = await fetch(
        "https://fakestoreapi.com/products",
      ).then((res) => res.json());
      setProducts(fetchedProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const addToCart = (el) => {
    setCart([...cart, { ...el, cartId: Date.now() + Math.random() }]);
  };

  const removeFromCart = (cartId) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.cartId !== cartId);
    setCart(hardCopy);
  };

  const totalPrice = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    setTotal(totalVal);
  };

  const cartContent = cart.length;

  return (
    <div className="main">
      <br></br>
      {cartContent > 0 && (
        <div onClick={() => setShowCart(true)}>
          <img className="cartImage" src={cartImage} alt="Shopping Cart" />
          <h3 className="cartContent">{cartContent}</h3>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading products...</div>
      ) : (
        <ul className="cards">
          {products.map((product) => {
            return (
              <li key={product.id} className="cards_item">
                <div className="card">
                  <div className="card_image">
                    <img alt={product.title} src={product.image} />
                  </div>
                  <div className="card_content">
                    <h2 className="card_title">{product.title}</h2>
                    <p className="card_text">{product.description}</p>
                    <h3 className="card_title">${product.price}</h3>
                    <button
                      id={product.id}
                      onClick={() => addToCart(product)}
                      className="btn card_btn"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {showCart ? (
        <div className="popup-wrapper">
          <div className="popup">
            <div id="cart-header">
              <span id="cart-title">Shopping Cart</span>
              <button
                className="close-btn"
                onClick={() => setShowCart(false)}
              ></button>
            </div>
            <div>
              {cart.length === 0 ? (
                <p
                  style={{
                    textAlign: "center",
                    padding: "2rem",
                    fontSize: "1.2rem",
                    color: "#666",
                  }}
                >
                  Your cart is empty
                </p>
              ) : (
                cart.map((item) => (
                  <div key={item.cartId} className="cart_items">
                    <img
                      className="cart_image"
                      src={item.image}
                      alt={item.title}
                    />
                    <h4
                      style={{
                        margin: "10px 0",
                        textAlign: "center",
                        color: "#333",
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "600",
                        color: "#667eea",
                      }}
                    >
                      Price: ${item.price.toFixed(2)}
                    </p>
                    <button
                      className="delete-btn"
                      onClick={() => removeFromCart(item.cartId)}
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div>
                <h1 className="total">Total: ${total.toFixed(2)}</h1>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Cards;
