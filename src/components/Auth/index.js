import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const loginHandler = () => {
    const cus = JSON.parse(localStorage.getItem("listUser"));
    let loginSuccess = false;

    for (let i = 0; i < cus.length; i++) {
      if (cus[i].username === username && cus[i].password === password) {
        localStorage.setItem("CurrentAccount", JSON.stringify(cus[i]));
        loginSuccess = true;
        break;
      }
    }

    if (loginSuccess) {
      navigate("/");
    } else {
      setErrorMessage(
        <span style={{ color: 'black' }}>
          Tên người dùng hoặc mật khẩu không chính xác
        </span>
      );
    }
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white">
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-4 text-uppercase login-title">Đăng Nhập</h2>
                  
                  {/* Modal Notification */}
                  {errorMessage && (
                    <div className="modal-overlay">
                      <div className="modal-content">
                        <h3>{errorMessage}</h3>
                        <button onClick={() => setErrorMessage(null)}>Close</button>
                      </div>
                    </div>
                  )}

                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter Email"
                      required
                      aria-required="true"
                    />
                    <label className="form-label" htmlFor="typeEmailX">Tên đăng nhập</label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Password"
                      required
                      aria-required="true"
                    />
                    <label className="form-label" htmlFor="typePasswordX">Mật khẩu</label>
                  </div>

                  <p className="small mb-5 pb-lg-2">
                    <a className="text-white-50" href="#!">Quên mật khẩu?</a>
                  </p>

                  <div className="button-container mb-4">
                    <button
                      className="btn btn-outline-light btn-lg px-4 mb-2"
                      type="submit"
                      onClick={loginHandler}
                    >
                      Đăng Nhập
                    </button>
                  </div>

                  <div className="signup-container">
                    <p className="mb-0">
                      Bạn Chưa Có Tài Khoản? <Link to="/register" className="text-white-50 fw-bold">Đăng Ký</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

        .login-title {
          margin-bottom: 2rem; /* Adjust margin to create space between title and input fields */
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
          margin-top: 30px; /* Increase space by 30px */
        }
      `}</style>
    </section>
  );
};

export default LoginComponent;
