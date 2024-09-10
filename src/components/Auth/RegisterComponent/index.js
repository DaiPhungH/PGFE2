import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from 'react-router-dom';


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
        <div className="container h-100 d-flex align-items-center justify-content-center">
          <div className="row w-100">
            <div className="col-lg-6 col-md-8 col-12 mx-auto">
              <div className="card bg-dark text-white border-0 rounded">
                <div className="card-body p-5">
                  <h2 className="fw-bold mb-4 text-center">Đăng ký tài khoản mới</h2>
                  <form onSubmit={signUpHandler}>
                    <div className="mb-4">
                      <label htmlFor="username" className="form-label">Tên người dùng</label>
                      <input
                        type="text"
                        id="username"
                        className="form-control input-white"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nhập tên người dùng"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control input-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nhập email"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="password" className="form-label">Mật khẩu</label>
                      <input
                        type="password"
                        id="password"
                        className="form-control input-white"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu"
                        required
                      />
                      <small className="form-text" style={{ color: '#ffffff' }}>
                        Mật khẩu gồm chữ cái và số.
                      </small>

                    </div>

                    <div className="mb-4">
                      <label htmlFor="repassword" className="form-label">Nhập lại mật khẩu</label>
                      <input
                        type="password"
                        id="repassword"
                        className="form-control input-white"
                        value={repassword}
                        onChange={(e) => setRePassword(e.target.value)}
                        placeholder="Nhập lại mật khẩu"
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mb-2">Đăng ký</button>
                    <Link to="/login" className="btn btn-secondary w-100">Đăng nhập</Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
