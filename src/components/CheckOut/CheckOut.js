import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../Header/Header';
import Footer from '../Footer/Footer';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    address: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Điều hướng về trang chủ sau 3 giây
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOverlayClick = () => {
    setIsSubmitted(false);
    navigate('/'); // Có thể chuyển hướng ngay khi nhấn vào lớp phủ
  };

  return (
    <div>
      <HeaderComponent />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg" style={styles.card}>
              <div className="card-body">
                <h2 className="text-center mb-4" style={styles.title}>Xác Nhận Mua Hàng</h2>
                <form onSubmit={handleCheckout}>
                  <div className="form-group">
                    <label htmlFor="fullname" style={styles.label}>Họ Và Tên</label>
                    <input
                      type="text"
                      name="fullname"
                      id="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      required
                      className="form-control"
                      style={styles.input}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" style={styles.label}>Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-control"
                      style={styles.input}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone" style={styles.label}>Số Điện Thoại</label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="form-control"
                      style={styles.input}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address" style={styles.label}>Địa Chỉ</label>
                    <textarea
                      name="address"
                      id="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="form-control"
                      rows="3"
                      style={styles.textarea}
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-block" style={styles.submitButton}>
                      Đặt Hàng
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Lớp phủ xác nhận đặt hàng */}
      {isSubmitted && (
        <div style={styles.overlay} onClick={handleOverlayClick}>
          <div style={styles.overlayContent}>
            <h2 style={styles.overlayText}>Đặt hàng thành công!</h2>
            <p style={styles.overlaySubtext}>Cảm ơn bạn đã mua hàng. Chúng tôi sẽ liên hệ sớm nhất.</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Custom CSS styles
const styles = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
  },
  title: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: '2.5em',
    marginBottom: '20px',
  },
  label: {
    color: '#555',
    fontSize: '1.1em',
    fontWeight: '500',
  },
  input: {
    border: '2px solid #ced4da',
    borderRadius: '5px',
    padding: '12px',
    fontSize: '1em',
    backgroundColor: '#f8f9fa',
    color: '#495057',
    marginBottom: '15px',
    transition: 'border-color 0.3s ease',
  },
  textarea: {
    border: '2px solid #ced4da',
    borderRadius: '5px',
    padding: '12px',
    fontSize: '1em',
    backgroundColor: '#f8f9fa',
    color: '#495057',
    marginBottom: '15px',
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '12px 20px',
    fontSize: '1.2em',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    '&:hover': {
      backgroundColor: '#218838',
      transform: 'scale(1.05)',
    },
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContent: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '10px',
    textAlign: 'center',
    width: '80%',
    maxWidth: '400px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  },
  overlayText: {
    fontSize: '1.8em',
    fontWeight: 'bold',
    color: '#28a745',
  },
  overlaySubtext: {
    fontSize: '1.2em',
    color: '#555',
  },
};


export default CheckoutPage;
