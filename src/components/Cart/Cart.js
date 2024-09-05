import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../Header/Header';
import Footer from '../Footer/Footer';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const items = savedProducts
      .map(product => {
        const cartItem = cart.find(item => item.productId === product._id.$oid);
        return cartItem ? { ...product, quantity: cartItem.quantity } : null;
      })
      .filter(item => item !== null);

    setCartItems(items);
  }, []);

  const updateQuantity = (productId, change) => {
    const updatedCartItems = cartItems.map(item => {
      if (item._id.$oid === productId) {
        const newQuantity = Math.max(item.quantity + change, 1); // Ensure quantity is at least 1
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems.map(({ _id, quantity }) => ({ productId: _id.$oid, quantity }))));
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(item => item._id.$oid !== productId);
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems.map(({ _id, quantity }) => ({ productId: _id.$oid, quantity }))));
  };

  const formatCurrency = (price) => {
    const priceNumber = Number(price);
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(priceNumber);
    return `${formattedPrice} VND`;
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleBuyClick = () => {
    navigate('/checkout');
  };

  return (
    <div>
      <HeaderComponent />
      <h1 style={styles.header}>Shopping Cart</h1>
      <div style={styles.cartGrid}>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>  
        ) : (
          cartItems.map((item, i) => (
            <div key={i} style={styles.cartCard}>
              <img
                src={item.img1}
                alt={item.name}
                style={styles.cartImage}
              />
              <h2 style={styles.cartName}>{item.name}</h2>
              <p style={styles.cartPrice}>{formatCurrency(item.price)}</p>
              <div style={styles.quantityContainer}>
                <button
                  style={styles.quantityButton}
                  onClick={() => updateQuantity(item._id.$oid, -1)}
                >
                  -
                </button>
                <p style={styles.cartQuantity}>Quantity: {item.quantity}</p>
                <button
                  style={styles.quantityButton}
                  onClick={() => updateQuantity(item._id.$oid, 1)}
                >
                  +
                </button>
              </div>
              <button
                style={styles.removeButton}
                onClick={() => removeFromCart(item._id.$oid)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <div style={styles.totalContainer}>
          <h2 style={styles.totalText}>Total: {formatCurrency(calculateTotal())}</h2>
          <button
            style={styles.buyButton}
            onClick={handleBuyClick}
          >
            Buy
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
};

const styles = {
  header: {
    textAlign: 'center',
    margin: '20px 0',
    fontSize: '2em',
    color: '#333',
  },
  cartGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px',
  },
  cartCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  cartImage: {
    width: '100%',
    height: 'auto',
    marginBottom: '10px',
    borderRadius: '8px',
  },
  cartName: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '10px 0 5px 0',
    color: '#333',
  },
  cartPrice: {
    fontSize: '18px',
    color: '#555',
  },
  cartQuantity: {
    fontSize: '16px',
    color: '#666',
    margin: '5px 0',
  },
  quantityContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  quantityButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.2s ease',
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.2s ease',
  },
  totalContainer: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    marginTop: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  totalText: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: '#333',
  },
  buyButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
    transition: 'background-color 0.2s ease',
  },
};

export default CartPage;
