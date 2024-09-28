import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../Header/Header';
import Footer from '../Footer/Footer';
import ProductData from '../ProductCard/ProductCard';
import LiveChatComponent from '../LiveChat/LiveChat';


const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

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
    return formatCurrency(cart.reduce((total, item) => total + (ProductData[item.productId - 1].price * item.quantity), 0));
  };

  const handleCheckout = () => {
    navigate('/checkout');
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
                  <img src={ProductData[item.productId - 1].img1} alt={`Sản phẩm ${item.productId}`} style={styles.cartImage} />
                  <div style={styles.cartInfo}>
                    <span>{`ID: ${item.productId}`}</span>
                    <span>{`Tên sản phẩm: ${ProductData[item.productId - 1].name}`}</span>
                    <span>{`Giá: ${formatCurrency(ProductData[item.productId - 1].price)}`}</span>
                    <span>{`Tổng giá: ${getTotalPrice(ProductData[item.productId - 1].price, item.quantity)}`}</span>
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
      <LiveChatComponent />

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
