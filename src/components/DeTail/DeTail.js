import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeaderComponent from '../Header/Header';
import Footer from '../Footer/Footer';
import dongho1 from "./WatchesIMG/dongho.jpg";
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

// Mảng sản phẩm dùng cho DetailPage
const productData = [
  {
    _id: '1',
    name: 'Đồng hồ 1',
    price: '1000000',
    img1: dongho1,
    specifications: [
      { key: 'Chất liệu', value: 'Thép không gỉ' },
      { key: 'Bảo hành', value: '12 tháng' },
      { key: 'Chất liệu vỏ', value: 'Thép không gỉ 316' },
      { key: 'Mặt kính', value: 'Sapphire Crystal' },
    ]
  },
  {
    _id: '2',
    name: 'Đồng hồ 2',
    price: '2000000',
    img1: dongho2,
    specifications: [
      { key: 'Chất liệu', value: 'Thép không gỉ' },
      { key: 'Bảo hành', value: '12 tháng' },
      { key: 'Chất liệu vỏ', value: 'Thép không gỉ 316' },
      { key: 'Mặt kính', value: 'Sapphire Crystal' },
    ]
  },
  {
    _id: '3',
    name: 'Đồng hồ 3',
    price: '3000000',
    img1: dongho3,
    specifications: [
      { key: 'Chất liệu', value: 'Thép không gỉ' },
      { key: 'Bảo hành', value: '12 tháng' },
      { key: 'Chất liệu vỏ', value: 'Thép không gỉ 316' },
      { key: 'Mặt kính', value: 'Sapphire Crystal' },
    ]
  },
  {
    _id: '4',
    name: 'Đồng hồ 4',
    price: '15000000',
    img1: dongho4,
    specifications: [
      { key: 'Chất liệu', value: 'Thép không gỉ' },
      { key: 'Bảo hành', value: '12 tháng' },
      { key: 'Chất liệu vỏ', value: 'Thép không gỉ 316' },
      { key: 'Mặt kính', value: 'Sapphire Crystal' },
    ]
  },
  {
    _id: '5',
    name: 'Đồng hồ 5',
    price: '11000000',
    img1: dongho5,
    specifications: [
      { key: 'Chất liệu', value: 'Thép không gỉ' },
      { key: 'Bảo hành', value: '12 tháng' },
      { key: 'Chất liệu vỏ', value: 'Thép không gỉ 316' },
      { key: 'Mặt kính', value: 'Sapphire Crystal' },
    ]
  },
  {
    _id: '6',
    name: 'Đồng hồ 6',
    price: '5000000',
    img1: dongho6,
    specifications: [
      { key: 'Chất liệu', value: 'Thép không gỉ' },
      { key: 'Bảo hành', value: '12 tháng' },
      { key: 'Chất liệu vỏ', value: 'Thép không gỉ 316' },
      { key: 'Mặt kính', value: 'Sapphire Crystal' },
    ]
  },
  {
    _id: '7',
    name: 'Đồng hồ 7',
    price: '4000000',
    img1: dongho7,
    specifications: [
      { key: 'Chất liệu', value: 'Thép không gỉ' },
      { key: 'Bảo hành', value: '12 tháng' },
      { key: 'Chất liệu vỏ', value: 'Thép không gỉ 316' },
      { key: 'Mặt kính', value: 'Sapphire Crystal' },
    ]
  },
  {
    _id: '8',
    name: 'Đồng hồ 8',
    price: '13500000',
    img1: dongho8,
    specifications: [
      { key: 'Chất liệu', value: 'Thép không gỉ' },
      { key: 'Bảo hành', value: '12 tháng' },
      { key: 'Chất liệu vỏ', value: 'Thép không gỉ 316' },
      { key: 'Mặt kính', value: 'Sapphire Crystal' },
    ]
  },
  {
    _id: '9',
    name: 'Đồng hồ 9',
    price: '1200000',
    img1: dongho9,
    specifications: [
      { key: 'Chất liệu', value: 'Thép không gỉ' },
      { key: 'Bảo hành', value: '12 tháng' },
      { key: 'Chất liệu vỏ', value: 'Thép không gỉ 316' },
      { key: 'Mặt kính', value: 'Sapphire Crystal' },
    ]
  },
  {
    _id: '10',
    name: 'Đồng hồ 10',
    price: '30000000',
    img1: dongho10,
    specifications: [
      { key: 'Chất liệu', value: 'Thép không gỉ' },
      { key: 'Bảo hành', value: '12 tháng' },
      { key: 'Chất liệu vỏ', value: 'Thép không gỉ 316' },
      { key: 'Mặt kính', value: 'Sapphire Crystal' },
    ]
  },{
    _id: '11',
    name: 'Đồng hồ 11',
    price: '18000000',
    img1: dongho11,
    specifications: [
      { key: 'Chất liệu', value: 'Thép không gỉ' },
      { key: 'Bảo hành', value: '12 tháng' },
      { key: 'Chất liệu vỏ', value: 'Thép không gỉ 316' },
      { key: 'Mặt kính', value: 'Sapphire Crystal' },
    ]
  },{
    _id: '12',
    name: 'Đồng hồ 12',
    price: '22000000',
    img1: dongho12,
    specifications: [
      { key: 'Chất liệu', value: 'Thép không gỉ' },
      { key: 'Bảo hành', value: '12 tháng' },
      { key: 'Chất liệu vỏ', value: 'Thép không gỉ 316' },
      { key: 'Mặt kính', value: 'Sapphire Crystal' },
    ]
  },
];

const DetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const productDetail = productData.find(item => item._id === productId);
    if (productDetail) {
      setProduct(productDetail);
    } else {
      console.error('Product not found');
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      const productPrice = parseInt(product.price, 10);
      addToCart(product._id, quantity, productPrice);
      alert('Đã thêm vào giỏ hàng');
    }
  };

  if (!product) {
    return <div style={styles.error}>Sản phẩm không tồn tại.</div>;
  }

  return (
    <div style={styles.detailContainer}>
      <HeaderComponent />
      <div style={styles.contentContainer}>
        <div style={styles.imageSection}>
          <img src={product.img1} alt={product.name} style={styles.productImage} />
        </div>
        <div style={styles.infoSection}>
          <h1 style={styles.productTitle}>{product.name}</h1>
          <p style={styles.productPrice}>{formatCurrency(product.price)}</p>

          {/* Bảng thông số kỹ thuật */}
          <table style={styles.specTable}>
            <thead>
              <tr>
                <th colSpan="2" style={styles.specTitle}>Thông số kỹ thuật</th>
              </tr>
            </thead>
            <tbody>
              {product.specifications && product.specifications.map((spec, index) => (
                <tr key={index} style={styles.specRow}>
                  <td style={styles.specKey}>{spec.key}</td>
                  <td style={styles.specValue}>{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={styles.quantitySection}>
            <label htmlFor="quantity" style={styles.quantityLabel}>Số lượng:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={styles.quantityInput}
            />
          </div>
          
          <button style={styles.addToCartButton} onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Hàm format tiền tệ
const formatCurrency = (price) => {
  const priceNumber = Number(price);
  const formattedPrice = new Intl.NumberFormat('vi-VN').format(priceNumber);
  return `${formattedPrice} VND`;
};

// Hàm thêm vào giỏ hàng
const addToCart = (productId, quantity, productPrice) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProductIndex = cart.findIndex(item => item.productId === productId);

  if (existingProductIndex !== -1) {
    // Cập nhật số lượng sản phẩm và tổng giá nếu đã có trong giỏ hàng
    cart[existingProductIndex].quantity += quantity;
    cart[existingProductIndex].totalPrice = cart[existingProductIndex].quantity * productPrice;
  } else {
    // Thêm sản phẩm mới vào giỏ hàng
    cart.push({ productId, quantity, totalPrice: quantity * productPrice });
  }

  // Lưu giỏ hàng vào localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Styles
const styles = {
  detailContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    padding: '20px',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  imageSection: {
    flex: '1',
    textAlign: 'center',
  },
  productImage: {
    width: '100%',
    maxWidth: '500px',
    height: 'auto',
    borderRadius: '8px',
  },
  infoSection: {
    flex: '2',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    maxWidth: '600px',
  },
  productTitle: {
    fontSize: '2.5em',
    fontWeight: 'bold',
    marginBottom: '10px',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: '1.8em',
    color: '#333',
    margin: '10px 0',
    textAlign: 'center',
  },
  specTable: {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
    textAlign: 'left',
    border: '1px solid #ddd',
  },
  specTitle: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#f2f2f2',
  },
  specRow: {
    borderBottom: '1px solid #ddd',
  },
  specKey: {
    padding: '10px',
    fontSize: '1.2em',
    fontWeight: 'bold',
    backgroundColor: '#f9f9f9',
    width: '40%',
  },
  specValue: {
    padding: '10px',
    fontSize: '1.1em',
    backgroundColor: '#fff',
  },
  quantitySection: {
    margin: '20px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityLabel: {
    fontSize: '1.2em',
    marginRight: '10px',
  },
  quantityInput: {
    width: '60px',
    padding: '5px',
    fontSize: '1em',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  addToCartButton: {
    display: 'block',
    width: '100%',
    padding: '15px',
    fontSize: '1.5em',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  addToCartButtonHover: {
    backgroundColor: '#0056b3',
  },
  error: {
    textAlign: 'center',
    padding: '20px',
    color: 'red',
    fontSize: '1.5em',
  },
};

export default DetailPage;
