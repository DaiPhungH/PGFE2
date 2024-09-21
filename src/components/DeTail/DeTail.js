import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeaderComponent from '../Header/Header';
import ProductList from '../Body/Body';
import Footer from '../Footer/Footer';
import ProductData from '../ProductCard/ProductCard';

const DetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const productDetail = ProductData.find(item => item._id === productId);
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
      setModalMessage('Đã thêm vào giỏ hàng');
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 3000); // Ẩn modal sau 1.5 giây
    }
  };

  const handleModalClick = () => {
    setShowModal(false); // Tắt modal khi click vào
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
      <ProductList />
      <Footer />
      {showModal && (
        <div style={styles.modal} onClick={handleModalClick}>
          <div style={styles.modalContent}>
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
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
    cart[existingProductIndex].quantity += quantity;
    cart[existingProductIndex].totalPrice = cart[existingProductIndex].quantity * productPrice;
  } else {
    cart.push({ productId, quantity, totalPrice: quantity * productPrice });
  }

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
    textAlign: 'center',
  },
  addToCartButton: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.2em',
    cursor: 'pointer',
    width: '100%',
  },
  modal: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Mờ nền
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999, // Cập nhật zIndex
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    maxWidth: '500px',
    textAlign: 'center',
    fontSize: '1.5em',
    fontWeight: 'bold',
  },
  error: {
    padding: '20px',
    textAlign: 'center',
    color: '#d9534f',
  },
};

export default DetailPage;
