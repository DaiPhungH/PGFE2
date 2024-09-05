import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredImage, setHoveredImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
        localStorage.setItem("products", JSON.stringify(data));
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu:', error);
        setLoading(false);
      });
  }, []);

  const formatCurrency = (price) => {
    const priceNumber = Number(price);
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(priceNumber);
    return `${formattedPrice} VND`;
  };

  const handleProductClick = (productId) => {
    navigate(`/detail/${productId}`);
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div>
      <h1>TOP TRENDING PRODUCTS</h1>
      <div style={styles.productGrid}>
        {products.map((product, i) => (
          <div
            key={i}
            style={{ ...styles.productCard, ...(hoveredImage === product._id.$oid ? styles.productCardHover : {}) }}
            onClick={() => handleProductClick(product._id.$oid)}
            onMouseEnter={() => setHoveredImage(product._id.$oid)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            <h2 style={styles.productName}>{product.name.toUpperCase()}</h2>
            <p style={styles.productPrice}>{formatCurrency(product.price)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    padding: '20px',
  },
  productCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.3s ease', // Smooth transition for hover effect
  },
  productCardHover: {
    transform: 'scale(1.02)', // Scale effect on hover
  },
  productName: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '10px 0 5px 0',
    textTransform: 'uppercase', // Uppercase text
  },
  productPrice: {
    fontSize: '18px',
    color: '#333',
    fontWeight: 'bold',
  },
};

export default ProductList;
