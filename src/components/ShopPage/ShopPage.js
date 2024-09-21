import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../Header/Header';
import Footer from '../Footer/Footer';
import ProductData from '../ProductCard/ProductCard';

const ShopPage = () => {
  const [hoveredImage, setHoveredImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('none');
  const navigate = useNavigate();

  const [filteredProducts, setFilteredProducts] = useState(ProductData);

  const formatCurrency = (price) => {
    const priceNumber = Number(price);
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(priceNumber);
    return `${formattedPrice} VND`;
  };

  const handleImageClick = (productId) => {
    navigate(`/detail/${productId}`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const filteredBySearch = ProductData.filter(product =>
      product.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredProducts(filteredBySearch);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    let sortedProducts = [...filteredProducts];
    if (event.target.value === 'asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (event.target.value === 'desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sortedProducts);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <HeaderComponent />
      <h1 style={styles.title}>DANH SÁCH SẢN PHẨM </h1>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', gap: '20px' }}>
        <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
          <select
            value={sortOrder}
            onChange={handleSortChange}
            style={{
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          >
            <option value="none">Sắp xếp theo giá</option>
            <option value="asc">Giá tăng dần</option>
            <option value="desc">Giá giảm dần</option>
          </select>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', flex: '1' }}>
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
                textAlign: 'center',
                backgroundColor: '#fff',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                ...(hoveredImage === product._id ? { transform: 'scale(1.02)' } : {}),
              }}
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
                onClick={() => handleImageClick(product._id)}
                onMouseEnter={() => setHoveredImage(product._id)}
                onMouseLeave={() => setHoveredImage(null)}
              />
              <h2 style={{ fontSize: '16px', fontWeight: 'bold', margin: '10px 0 5px 0', textTransform: 'uppercase' }}>
                {product.name.toUpperCase()}
              </h2>
              <p style={{ fontSize: '18px', color: '#333', fontWeight: 'bold' }}>{formatCurrency(product.price)}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
const styles = {
  title: {
    textAlign: 'center',
    fontSize: '2.5rem', // Kích thước chữ lớn hơn
    fontWeight: 'bold',
    color: '#4A90E2', // Màu sắc hiện đại
    textTransform: 'uppercase',
    letterSpacing: '2px', // Khoảng cách giữa các chữ
    margin: '20px 0', // Khoảng cách phía trên và dưới
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', // Hiệu ứng bóng cho chữ
  },
};

export default ShopPage;
