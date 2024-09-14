import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import HeaderComponent from '../Header/Header';
import Footer from '../Footer/Footer';
import dongho from './WatchesIMG/dongho.jpg';
import dongho2 from './WatchesIMG/dongho2.jpg';
import dongho3 from './WatchesIMG/dongho3.jpg';
import dongho4 from './WatchesIMG/dongho4.jpg';
import dongho5 from './WatchesIMG/dongho5.jpg';
import dongho6 from './WatchesIMG/dongho6.jpg';
import dongho7 from './WatchesIMG/dongho7.jpg';
import dongho8 from './WatchesIMG/dongho8.jpg';
import dongho9 from './WatchesIMG/dongho9.jpg';
import dongho10 from './WatchesIMG/dongho10.jpg';
import dongho11 from './WatchesIMG/dongho11.jpg';
import dongho12 from './WatchesIMG/dongho12.jpg';

// Mảng ảnh nhỏ
const productImages = {
  '1': dongho,
  '2': dongho2,
  '3': dongho3,
  '4': dongho4,
  '5': dongho5,
  '6': dongho6,
  '7': dongho7,
  '8': dongho8,
  '9': dongho9,
  '10': dongho10,
  '11': dongho11,
  '12': dongho12,
};

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map(item =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.productId !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const formatCurrency = (price) => {
    const priceNumber = Number(price);
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(priceNumber);
    return `${formattedPrice} VND`;
  };

  const getTotalPrice = (price, quantity) => {
    return formatCurrency(price * quantity);
  };

  const getCartTotal = () => {
    return formatCurrency(cart.reduce((total, item) => total + (Number(item.price) * item.quantity), 0));
  };

  const handleCheckout = () => {
    navigate('/checkout'); // Redirect to /checkout page
  };

  return (
    <div style={styles.cartContainer}>
      <HeaderComponent />
      <div style={styles.cartContent}>
        <h1 style={styles.title}>Giỏ Hàng</h1>
        {cart.length === 0 ? (
          <p style={styles.emptyMessage}>Giỏ hàng của bạn đang trống.</p>
        ) : (
          <div>
            <ul style={styles.cartList}>
              {cart.map((item, index) => (
                <li key={index} style={styles.cartItem}>
                  <img src={productImages[item.productId]} alt={`Sản phẩm ${item.productId}`} style={styles.cartImage} />
                  <div style={styles.cartInfo}>
                    <span>{`Sản phẩm ID: ${item.productId}`}</span>
                    <span>{`Giá: ${formatCurrency(item.price)}`}</span>
                    <span>{`Tổng giá: ${getTotalPrice(item.price, item.quantity)}`}</span>
                    <div style={styles.quantitySection}>
                      <label htmlFor={`quantity-${item.productId}`} style={styles.quantityLabel}>Số lượng:</label>
                      <input
                        type="number"
                        id={`quantity-${item.productId}`}
                        value={item.quantity}
                        min="1"
                        onChange={(e) => handleQuantityChange(item.productId, Number(e.target.value))}
                        style={styles.quantityInput}
                      />
                    </div>
                  </div>
                  <button style={styles.removeButton} onClick={() => handleRemoveFromCart(item.productId)}>Xóa</button>
                </li>
              ))}
            </ul>
            <div style={styles.cartTotal}>
              <h2>Tổng tiền: {getCartTotal()}</h2>
              <button style={styles.checkoutButton} onClick={handleCheckout}>Mua</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  cartContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
  },
  cartContent: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    margin: '20px',
  },
  title: {
    fontSize: '2em',
    marginBottom: '20px',
  },
  emptyMessage: {
    fontSize: '1.2em',
    color: '#666',
  },
  cartList: {
    listStyleType: 'none',
    padding: 0,
  },
  cartItem: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartImage: {
    width: '120px',
    height: '120px',
    borderRadius: '4px',
    marginRight: '15px',
  },
  cartInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  quantitySection: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  quantityLabel: {
    fontSize: '1em',
    marginRight: '10px',
  },
  quantityInput: {
    width: '60px',
    padding: '5px',
    fontSize: '1em',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  removeButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cartTotal: {
    marginTop: '20px',
    fontSize: '1.5em',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default CartPage;
