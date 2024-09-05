import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeaderComponent from '../Header/Header';
import Footer from '../Footer/Footer';

const DetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
        const productDetail = savedProducts.find(item => item._id.$oid === productId);
        if (productDetail) {
          setProduct(productDetail);
        } else {
          console.error('Product not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (!product) {
    return <div style={styles.error}>Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product._id.$oid, quantity);
    alert('Đã thêm vào giỏ hàng');
  };

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
          <p style={styles.productShortDesc}><strong>Short Description:</strong> {product.short_desc}</p>
          <p style={styles.productLongDesc}><strong>Long Description:</strong> {product.long_desc}</p>
          
          <div style={styles.quantitySection}>
            <label htmlFor="quantity" style={styles.quantityLabel}>Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={styles.quantityInput}
            />
          </div>
          
          <button style={styles.addToCartButton} onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const formatCurrency = (price) => {
  // Chuyển đổi giá thành số
  const priceNumber = Number(price);

  // Định dạng giá với dấu phân cách hàng nghìn
  const formattedPrice = new Intl.NumberFormat('vi-VN').format(priceNumber);

  return `${formattedPrice} VND`;
};

const addToCart = (productId, quantity) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProductIndex = cart.findIndex(item => item.productId === productId);
  
  if (existingProductIndex !== -1) {
    // Nếu sản phẩm đã có trong giỏ, cập nhật số lượng
    cart[existingProductIndex].quantity += quantity;
  } else {
    // Nếu sản phẩm chưa có trong giỏ, thêm mới
    cart.push({ productId, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

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
    flex: '1',
    gap: '20px',
    padding: '20px',
    alignItems: 'flex-start',
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
    margin: '0 auto',
  },
  productTitle: {
    fontSize: '2.5em',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  productPrice: {
    fontSize: '1.8em',
    color: '#333',
    margin: '10px 0',
  },
  productShortDesc: {
    fontSize: '1.2em',
    color: '#666',
    margin: '10px 0',
  },
  productLongDesc: {
    fontSize: '1.2em',
    color: '#666',
    margin: '10px 0',
  },
  quantitySection: {
    margin: '20px 0',
    display: 'flex',
    alignItems: 'center',
  },
  quantityLabel: {
    fontSize: '1.2em',
    marginRight: '10px',
  },
  quantityInput: {
    fontSize: '1.2em',
    width: '100px',
    padding: '5px',
    textAlign: 'center',
  },
  addToCartButton: {
    display: 'block',
    width: '100%',
    maxWidth: '200px',
    margin: '20px 0',
    padding: '15px',
    fontSize: '1.2em',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'background-color 0.3s',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2em',
    color: '#ff0000',
  },
  error: {
    textAlign: 'center',
    fontSize: '1.2em',
    color: '#ff0000',
  },
};

export default DetailPage;
