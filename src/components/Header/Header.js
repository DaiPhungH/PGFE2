import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaHome, FaShoppingCart, FaStore, FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import banner1 from './banner1.jpg';
import banner3 from './banner3.jpg';

const HeaderComponent = ({ onLogout, setCurrentAccount }) => {
  const [currentAccount, setCurrentAccountState] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const sliderRef = useRef(null);

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
    arrows: false,
    beforeChange: () => setIsDragging(true),
    afterChange: () => setIsDragging(false),
  };

  const goToPreviousSlide = () => {
    sliderRef.current.slickPrev();
  };

  const goToNextSlide = () => {
    sliderRef.current.slickNext();
  };

  const styles = {
    header: {
      backgroundColor: '#f8f8f8',
      padding: '10px 0',
    },
    headerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 20px',
    },
    leftSection: {
      display: 'flex',
      alignItems: 'center',
    },
    rightSection: {
      display: 'flex',
      alignItems: 'center',
    },
    btnIcon: {
      fontSize: '24px',
      color: '#007bff',
      marginRight: '15px',
      textDecoration: 'none',
    },
    headerTitle: {
      fontSize: '36px',
      fontWeight: 'bold',
      textAlign: 'center',
      flexGrow: 1,
      margin: '0',
    },
    logout: {
      background: 'none',
      border: 'none',
      color: '#007bff',
      cursor: 'pointer',
      fontSize: '24px',
    },
    containerFluid: {
      margin: '20px 0',
      position: 'relative',
    },
    carouselImageWrapper: {
      position: 'relative',
      width: '100%',
      height: '739px',
      overflow: 'hidden',
      cursor: 'pointer',
    },
    carouselImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
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
      cursor: 'pointer',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
    },
    slickArrowLeft: {
      left: '10px',
    },
    slickArrowRight: {
      right: '10px',
    },
    viewMoreButton: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '18px',
      zIndex: 1001,
      display: 'block',
      margin: '20px auto', // Căn giữa nút
    },
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
              <FaStore />
            </Link>
          </div>
          <h2 style={styles.headerTitle}>Cửa Hàng Đồng Hồ</h2>
          <div style={styles.rightSection}>
            {currentAccount ? (
              <>
                <span style={{ marginRight: '15px' }}>Xin chào, {currentAccount.username}</span>
                <Link to="/cart" style={styles.btnIcon}>
                  <FaShoppingCart />
                </Link>
                <button style={styles.logout} type="button" onClick={logoutHandler}>
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

      {/* Carousel */}
      <div style={styles.containerFluid}>
        <Slider {...settings} ref={sliderRef}>
          {/* Banner 1 */}
          <div style={styles.carouselImageWrapper}>
            <img src={banner1} alt="Banner 1" style={styles.carouselImage} />
          </div>

          {/* Banner 2 */}
          <div style={styles.carouselImageWrapper}>
            <img src={banner3} alt="Banner 2" style={styles.carouselImage} />
          </div>
        </Slider>

        {/* Nút Xem Thêm Bên Dưới */}
        <button style={styles.viewMoreButton} onClick={() => navigate('/shop')}>
          Xem thêm
        </button>

        <div style={{ ...styles.slickArrow, ...styles.slickArrowLeft }} onClick={goToPreviousSlide}>
          &lt;
        </div>
        <div style={{ ...styles.slickArrow, ...styles.slickArrowRight }} onClick={goToNextSlide}>
          &gt;
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
