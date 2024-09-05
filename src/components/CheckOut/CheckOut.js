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
  const navigate = useNavigate();

  const handleCheckout = (e) => {
    e.preventDefault();
    // Process form data here (e.g., send to server)
    alert('Form submitted!');
    // Redirect to home page or any other route after form submission
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <HeaderComponent />
      <div style={styles.checkoutFormContainer}>
        <h2 style={styles.checkoutTitle}>Checkout</h2>
        <form onSubmit={handleCheckout} style={styles.checkoutForm}>
          <label style={styles.formLabel}>
            Full Name:
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              style={styles.formInput}
            />
          </label>
          <label style={styles.formLabel}>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.formInput}
            />
          </label>
          <label style={styles.formLabel}>
            Phone:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              style={styles.formInput}
            />
          </label>
          <label style={styles.formLabel}>
            Address:
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              style={styles.formTextarea}
            />
          </label>
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.submitButton}>Submit</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  checkoutFormContainer: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    width: '80%',
    maxWidth: '500px',
    margin: '50px auto',
  },
  checkoutTitle: {
    fontSize: '1.5em',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  },
  checkoutForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formLabel: {
    fontSize: '14px',
    color: '#555',
  },
  formInput: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '14px',
    width: '100%',
  },
  formTextarea: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '14px',
    width: '100%',
    minHeight: '100px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.2s ease',
  },
  submitButtonHover: {
    backgroundColor: '#0056b3',
  },
};

export default CheckoutPage;
