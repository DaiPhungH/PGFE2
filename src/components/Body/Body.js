import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const ProductList = () => {
  const [hoveredImage, setHoveredImage] = useState(null);
  const navigate = useNavigate();

  // Tạo danh sách 12 sản phẩm với ảnh khác nhau
  const products = [
    { _id: '1', name: 'Đồng hồ 1', price: '1000000', image: dongho },
    { _id: '2', name: 'Đồng hồ 2', price: '2000000', image: dongho2 },
    { _id: '3', name: 'Đồng hồ 3', price: '3000000', image: dongho3 },
    { _id: '4', name: 'Đồng hồ 4', price: '15000000', image: dongho4 },
    { _id: '5', name: 'Đồng hồ 5', price: '11000000', image: dongho5 },
    { _id: '6', name: 'Đồng hồ 6', price: '5000000', image: dongho6 },
    { _id: '7', name: 'Đồng hồ 7', price: '4000000', image: dongho7 },
    { _id: '8', name: 'Đồng hồ 8', price: '13500000', image: dongho8 },
    { _id: '9', name: 'Đồng hồ 9', price: '1200000', image: dongho9 },
    { _id: '10', name: 'Đồng hồ 10', price: '30000000', image: dongho10 },
    { _id: '11', name: 'Đồng hồ 11', price: '18000000', image: dongho11 },
    { _id: '12', name: 'Đồng hồ 12', price: '22000000', image: dongho12 },
  ];

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
      <h1>SẢN PHẨM ĐANG HOT</h1>
      <div style={styles.productGrid}>
        {products.map((product) => (
          <div
            key={product._id}
            style={{ ...styles.productCard, ...(hoveredImage === product._id ? styles.productCardHover : {}) }}
            onClick={() => handleProductClick(product._id)}
            onMouseEnter={() => setHoveredImage(product._id)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            <img src={product.image} alt={product.name} style={styles.productImage} />
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
    gridTemplateColumns: 'repeat(4, 1fr)', // Hiển thị 4 sản phẩm trên 1 hàng
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
    transition: 'transform 0.2s ease',
  },
  productCardHover: {
    transform: 'scale(1.02)',
  },
  productImage: {
    width: '100%',
    height: 'auto',
    aspectRatio: '1 / 1', // Đảm bảo ảnh có tỷ lệ 1:1
    objectFit: 'cover',
    marginBottom: '10px',
    transition: 'filter 0.3s ease',
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

export default ProductList;
