import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaHome, FaShoppingCart, FaStore, FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import banner1 from './banner1.jpg';
import banner3 from './banner3.jpg';

const HeaderComponent = ({ onLogout, setCurrentAccount }) => {
  const [currentAccount, setCurrentAccountState] = useState(null);

  useEffect(() => {
    const account = JSON.parse(localStorage.getItem("CurrentAccount"));
    setCurrentAccountState(account);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("CurrentAccount");
    setCurrentAccountState(null);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: true
  };

  const styles = {
    header: {
      backgroundColor: '#f8f8f8',
      padding: '10px 0'
    },
    headerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 20px'
    },
    leftSection: {
      display: 'flex',
      alignItems: 'center'
    },
    rightSection: {
      display: 'flex',
      alignItems: 'center'
    },
    btnIcon: {
      fontSize: '24px',
      color: '#007bff',
      marginRight: '15px',
      textDecoration: 'none'
    },
    headerTitle: {
      fontSize: '36px', // Tăng kích thước chữ
      fontWeight: 'bold',
      textAlign: 'center',
      flexGrow: 1,
      margin: '0', // Xóa margin để căn giữa chính xác hơn
    },
    logout: {
      background: 'none',
      border: 'none',
      color: '#007bff',
      cursor: 'pointer',
      fontSize: '24px'
    },
    containerFluid: {
      margin: '20px 0'
    },
    carouselImageWrapper: {
      position: 'relative',
      width: '100%',
      height: '739px',
      overflow: 'hidden'
    },
    carouselImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    slickArrow: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: '20px',
      zIndex: 1000,
    },
    slickArrowLeft: {
      position: 'absolute',
      top: '50%',
      left: '10px',
      transform: 'translateY(-50%)',
      cursor: 'pointer'
    },
    slickArrowRight: {
      position: 'absolute',
      top: '50%',
      right: '10px',
      transform: 'translateY(-50%)',
      cursor: 'pointer'
    }
  };

  return (
    <>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.leftSection}>
            <Link to="/" style={styles.btnIcon}>
              <FaHome />
            </Link>
            <Link to="/shop" style={styles.btnIcon}>
              <FaStore /> {/* Biểu tượng cho Shop */}
            </Link>
          </div>
          <h2 style={styles.headerTitle}>Cửa Hàng Đồng Hồ</h2> {}
          <div style={styles.rightSection}>
            {currentAccount ? (
              <>
                <span style={{ marginRight: '15px' }}>Xin chào, {currentAccount.username}</span>
                <Link to="/cart" style={styles.btnIcon}>
                  <FaShoppingCart /> {/* Biểu tượng Cart */}
                </Link>
                <button
                  style={styles.logout}
                  type="button"
                  onClick={logoutHandler}
                >
                  <FaSignOutAlt />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={styles.btnIcon}>
                  <FaSignInAlt />
                </Link>
                <Link to="/register" style={styles.btnIcon}>
                  <FaUser />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div style={styles.containerFluid}>
        <Slider {...settings} nextArrow={<div style={styles.slickArrow + ' ' + styles.slickArrowRight}>&gt;</div>} prevArrow={<div style={styles.slickArrow + ' ' + styles.slickArrowLeft}>&lt;</div>}>
          <div style={styles.carouselImageWrapper}>
            <img src={banner1} alt="Banner 1" style={styles.carouselImage} />
          </div>
          <div style={styles.carouselImageWrapper}>
            <img src={banner3} alt="Banner 3" style={styles.carouselImage} />
          </div>
        </Slider>
      </div>
    </>
  );
};

export default HeaderComponent;
