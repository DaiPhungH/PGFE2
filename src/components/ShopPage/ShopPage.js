import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../Header/Header';
import Footer from '../Footer/Footer';
import dongho from "./WatchesIMG/dongho.jpg";
import dongho2 from "./WatchesIMG/dongho2.jpg";
import dongho3 from "./WatchesIMG/dongho3.jpg";
import dongho4 from "./WatchesIMG/dongho4.jpg";
import dongho5 from "./WatchesIMG/dongho5.jpg";
import dongho6 from "./WatchesIMG/dongho6.jpg";
import dongho7 from "./WatchesIMG/dongho7.jpg";
import dongho8 from "./WatchesIMG/dongho8.jpg";
import dongho9 from "./WatchesIMG/dongho9.jpg";
import dongho10 from "./WatchesIMG/dongho10.jpg";
import dongho11 from "./WatchesIMG/dongho11.jpg";
import dongho12 from "./WatchesIMG/dongho12.jpg";

const ShopPage = () => {
  const [hoveredImage, setHoveredImage] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [sortOrder, setSortOrder] = useState('none'); 
  const navigate = useNavigate();

  // Dữ liệu sản phẩm với hình ảnh khác nhau
  const products = [
    { _id: '1', name: 'Đồng hồ 1', price: '1000000', img1: dongho, category: 'Category 1' },
    { _id: '2', name: 'Đồng hồ 2', price: '2000000', img1: dongho2, category: 'Category 2' },
    { _id: '3', name: 'Đồng hồ 3', price: '3000000', img1: dongho3, category: 'Category 1' },
    { _id: '4', name: 'Đồng hồ 4', price: '15000000', img1: dongho4, category: 'Category 1' },
    { _id: '5', name: 'Đồng hồ 5', price: '11000000', img1: dongho5, category: 'Category 2' },
    { _id: '6', name: 'Đồng hồ 6', price: '5000000', img1: dongho6, category: 'Category 1' },
    { _id: '7', name: 'Đồng hồ 7', price: '4000000', img1: dongho7, category: 'Category 2' },
    { _id: '8', name: 'Đồng hồ 8', price: '13500000', img1: dongho8, category: 'Category 1' },
    { _id: '9', name: 'Đồng hồ 9', price: '1200000', img1: dongho9, category: 'Category 2' },
    { _id: '10', name: 'Đồng hồ 10', price: '30000000', img1: dongho10, category: 'Category 1' },
    { _id: '11', name: 'Đồng hồ 11', price: '18000000', img1: dongho11, category: 'Category 1' },
    { _id: '12', name: 'Đồng hồ 12', price: '22000000', img1: dongho12, category: 'Category 2' },
  ];

  const [filteredProducts, setFilteredProducts] = useState(products);

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
    const filteredBySearch = products.filter(product =>
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
    <div style={styles.container}>
      <HeaderComponent />
      <div style={styles.mainContent}>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={styles.searchInput}
          />
          <select
            value={sortOrder}
            onChange={handleSortChange}
            style={styles.sortSelect}
          >
            <option value="none">Sắp xếp theo giá</option>
            <option value="asc">Giá tăng dần</option>
            <option value="desc">Giá giảm dần</option>
          </select>
        </div>
        <div style={styles.productGrid}>
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              style={{ ...styles.productCard, ...(hoveredImage === product._id ? styles.productCardHover : {}) }}
            >
              <img
                src={product.img1}
                alt={product.name}
                style={{ ...styles.productImage, ...(hoveredImage === product._id ? styles.productImageHover : {}) }}
                onClick={() => handleImageClick(product._id)}
                onMouseEnter={() => setHoveredImage(product._id)}
                onMouseLeave={() => setHoveredImage(null)}
              />
              <h2 style={styles.productName}>{product.name.toUpperCase()}</h2>
              <p style={styles.productPrice}>{formatCurrency(product.price)}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    gap: '20px',
  },
  searchContainer: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  searchInput: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  sortSelect: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)', // Hiển thị 4 sản phẩm trên 1 hàng
    gap: '20px',
    flex: '1',
  },
  productCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  productCardHover: {
    transform: 'scale(1.02)',
  },
  productImage: {
    width: '100%',
    height: 'auto',
    marginBottom: '10px',
    transition: 'filter 0.3s ease',
  },
  productImageHover: {
    filter: 'blur(3px)',
  },
  productName: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '10px 0 5px 0',
    textTransform: 'uppercase',
  },
  productPrice: {
    fontSize: '18px',
    color: '#333',
    fontWeight: 'bold',
  },
};

export default ShopPage;
