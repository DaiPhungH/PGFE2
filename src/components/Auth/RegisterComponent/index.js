import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";

const RegisterComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [messageStatus, setMessageStatus] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /[a-zA-Z]/.test(password) && /[0-9]/.test(password);

  const clearRegisterForm = () => {
    setUsername("");
    setPassword("");
    setRePassword("");
    setEmail("");
  };

  const signUpHandler = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setMessage("Định dạng email không hợp lệ");
      setMessageStatus("error");
      setShowNotification(true);
      return;
    }
    if (!validatePassword(password)) {
      setMessage("Mật khẩu phải chứa cả chữ cái và số");
      setMessageStatus("error");
      setShowNotification(true);
      return;
    }
    if (password !== repassword) {
      setMessage("Mật khẩu không khớp");
      setMessageStatus("error");
      setShowNotification(true);
      return;
    }

    const list = JSON.parse(localStorage.getItem("listUser")) || [];
    if (list.some(user => user.username === username)) {
      setMessage("Tên người dùng đã tồn tại");
      setMessageStatus("error");
      setShowNotification(true);
      return;
    }

    list.push({ username, password });
    localStorage.setItem("listUser", JSON.stringify(list));

    setMessage("Đăng ký thành công");
    setMessageStatus("success");
    setShowNotification(true);
    clearRegisterForm();
    setTimeout(() => navigate('/login'), 1500);
  };

  const closeNotification = () => setShowNotification(false);

  return (
    <>
      {showNotification && (
        <div style={overlayStyle} onClick={closeNotification}>
          <div style={{ ...notificationStyle, backgroundColor: messageStatus === 'success' ? '#28a745' : '#dc3545' }}>
            {message}
          </div>
        </div>
      )}
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white">
                <div className="card-body p-5 text-center">
                  <h2 className="fw-bold mb-4 text-uppercase">Đăng ký tài khoản mới</h2>

                  <form onSubmit={signUpHandler}>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="text"
                        id="username"
                        className="form-control form-control-lg"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Tên người dùng"
                        required
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        id="email"
                        className="form-control form-control-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="password"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mật khẩu"
                        required
                      />
                      <small className="form-text" style={{ color: '#ffffff' }}>Mật khẩu gồm cả chữ và số.</small>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="repassword"
                        className="form-control form-control-lg"
                        value={repassword}
                        onChange={(e) => setRePassword(e.target.value)}
                        placeholder="Nhập lại mật khẩu"
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-outline-light btn-lg px-4 mb-2">Đăng ký</button>
                  </form>

                  <div className="signup-container mt-4 pt-1">
                    <p className="mb-0">
                      Bạn Đã Có Tài Khoản? <Link to="/login" className="text-white-50 fw-bold">Đăng Nhập</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inline Styles */}
      <style jsx>{`
        .gradient-custom {
          background: linear-gradient(to right, #6a11cb, #2575fc);
          position: fixed; /* Fix position to viewport */
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh; /* Full height of viewport */
          overflow: hidden; /* Hide overflow */
          z-index: -1; /* Place behind content */
        }

        .card {
          border-radius: 1rem;
          height: 90vh; /* Adjust height as needed */
          display: flex;
          flex-direction: column;
          justify-content: center; /* Center content vertically */
        }

        .card-body {
          padding: 5rem; /* Adjust padding as needed */
        }

        .modal-overlay {
          position: absolute; /* Position overlay over card */
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7); /* Slightly darker for more coverage */
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000; /* Ensure it appears above other content */
        }

        .modal-content {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
        }

        .modal-content h3 {
          margin-bottom: 20px;
        }

        .modal-content button {
          background: #6a11cb;
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
        }

        .button-container button,
        .button-container a {
          margin: 5px;
        }

        .signup-container {
          margin-top: 30px; /* Adjust margin as needed */
        }
      `}</style>
    </>
  );
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1050
};

const notificationStyle = {
  padding: '20px',
  borderRadius: '4px',
  fontSize: '1rem',
  maxWidth: '300px',
  color: '#fff',
  textAlign: 'center'
};

export default RegisterComponent;
