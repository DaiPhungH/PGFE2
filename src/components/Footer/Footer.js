import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import logo from './logo.jpg'; // Đảm bảo đường dẫn này đúng với vị trí file logo của bạn

const footerStyle = {
  backgroundColor: 'black',
  color: 'white',
  padding: '20px',
  textAlign: 'center',
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
};

const linkHoverStyle = {
  textDecoration: 'underline',
};

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <MDBContainer className='text-center text-md-start mt-5'>
        <MDBRow className='mt-3'>
          <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
            <h6 className='text-uppercase fw-bold mb-4'>
              <img src={logo} alt="Logo" style={{ width: '150px' }} />
              {/* Tên công ty hoặc logo */}
            </h6>
            {/* Nội dung bổ sung cho phần này */}
          </MDBCol>

          <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
            <h6 className='text-uppercase fw-bold mb-4'>CUSTOMER SERVICES</h6>
            <p>
              <a href='#!' className='text-reset' style={linkStyle} onMouseOver={e => e.currentTarget.style.textDecoration = linkHoverStyle.textDecoration} onMouseOut={e => e.currentTarget.style.textDecoration = linkStyle.textDecoration}>
                Help & Contact us
              </a>
            </p>
            <p>
              <a href='#!' className='text-reset' style={linkStyle} onMouseOver={e => e.currentTarget.style.textDecoration = linkHoverStyle.textDecoration} onMouseOut={e => e.currentTarget.style.textDecoration = linkStyle.textDecoration}>
                Return & Refunds
              </a>
            </p>
            <p>
              <a href='#!' className='text-reset' style={linkStyle} onMouseOver={e => e.currentTarget.style.textDecoration = linkHoverStyle.textDecoration} onMouseOut={e => e.currentTarget.style.textDecoration = linkStyle.textDecoration}>
                Online Stores
              </a>
            </p>
            <p>
              <a href='#!' className='text-reset' style={linkStyle} onMouseOver={e => e.currentTarget.style.textDecoration = linkHoverStyle.textDecoration} onMouseOut={e => e.currentTarget.style.textDecoration = linkStyle.textDecoration}>
                Terms & Conditions
              </a>
            </p>
          </MDBCol>

          <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
            <h6 className='text-uppercase fw-bold mb-4'>Company</h6>
            <p>
              <a href='#!' className='text-reset' style={linkStyle} onMouseOver={e => e.currentTarget.style.textDecoration = linkHoverStyle.textDecoration} onMouseOut={e => e.currentTarget.style.textDecoration = linkStyle.textDecoration}>
                What We Do
              </a>
            </p>
            <p>
              <a href='#!' className='text-reset' style={linkStyle} onMouseOver={e => e.currentTarget.style.textDecoration = linkHoverStyle.textDecoration} onMouseOut={e => e.currentTarget.style.textDecoration = linkStyle.textDecoration}>
                Available Services
              </a>
            </p>
            <p>
              <a href='#!' className='text-reset' style={linkStyle} onMouseOver={e => e.currentTarget.style.textDecoration = linkHoverStyle.textDecoration} onMouseOut={e => e.currentTarget.style.textDecoration = linkStyle.textDecoration}>
                Latest Posts
              </a>
            </p>
            <p>
              <a href='#!' className='text-reset' style={linkStyle} onMouseOver={e => e.currentTarget.style.textDecoration = linkHoverStyle.textDecoration} onMouseOut={e => e.currentTarget.style.textDecoration = linkStyle.textDecoration}>
                FAQs
              </a>
            </p>
          </MDBCol>

          <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
            <h6 className='text-uppercase fw-bold mb-4'>SOCIAL MEDIA</h6>
            <p>
              <a href='#!' className='text-reset' style={linkStyle} onMouseOver={e => e.currentTarget.style.textDecoration = linkHoverStyle.textDecoration} onMouseOut={e => e.currentTarget.style.textDecoration = linkStyle.textDecoration}>
                Twitter
              </a>
            </p>
            <p>
              <a href='#!' className='text-reset' style={linkStyle} onMouseOver={e => e.currentTarget.style.textDecoration = linkHoverStyle.textDecoration} onMouseOut={e => e.currentTarget.style.textDecoration = linkStyle.textDecoration}>
                Instagram
              </a>
            </p>
            <p>
              <a href='#!' className='text-reset' style={linkStyle} onMouseOver={e => e.currentTarget.style.textDecoration = linkHoverStyle.textDecoration} onMouseOut={e => e.currentTarget.style.textDecoration = linkStyle.textDecoration}>
                Facebook
              </a>
            </p>
            <p>
              <a href='#!' className='text-reset' style={linkStyle} onMouseOver={e => e.currentTarget.style.textDecoration = linkHoverStyle.textDecoration} onMouseOut={e => e.currentTarget.style.textDecoration = linkStyle.textDecoration}>
                Pinterest
              </a>
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </footer>
  );
}

export default Footer;
