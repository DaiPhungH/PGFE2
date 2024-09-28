import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductData from '../ProductCard/ProductCard';
import LiveChatComponent from '../LiveChat/LiveChat';

const ProductList = () => {
  const [hoveredImage, setHoveredImage] = useState(null);
  const navigate = useNavigate();

  const formatCurrency = (price) => {
    const priceNumber = Number(price);
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(priceNumber);
    return `${formattedPrice} VND`;
  };

  const handleProductClick = (productId) => {
    navigate(`/detail/${productId}`);
  };

  return (
    <div>
      <h1 style={styles.title}>SẢN PHẨM BÁN CHẠY</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', padding: '0 40px' }}>
        {ProductData.map((product) => (
          <div
            key={product._id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '10px',
              textAlign: 'center',
              backgroundColor: '#fff',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              ...(hoveredImage === product._id ? { transform: 'scale(1.02)' } : {}),
            }}
            onClick={() => handleProductClick(product._id)}
            onMouseEnter={() => setHoveredImage(product._id)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            <img
              src={product.img1}
              alt={product.name}
              style={{
                width: '100%',
                height: 'auto',
                marginBottom: '10px',
                transition: 'filter 0.3s ease',
                ...(hoveredImage === product._id ? { filter: 'blur(3px)' } : {}),
              }}
            />
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', margin: '10px 0 5px 0', textTransform: 'uppercase' }}>
              {product.name.toUpperCase()}
            </h2>
            <p style={{ fontSize: '18px', color: '#333', fontWeight: 'bold' }}>
              {formatCurrency(product.price)}
            </p>
          </div>
        ))}
      </div>

     
      <LiveChatComponent />

    </div>
  );
};

const styles = {
  title: {
    textAlign: 'center',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#4A90E2',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    margin: '20px 0',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
  },
};

export default ProductList;
