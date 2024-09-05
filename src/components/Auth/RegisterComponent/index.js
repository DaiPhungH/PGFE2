import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Input from "../../UI/Input";
import { Link, useNavigate } from 'react-router-dom';

const RegisterComponent = ({ changeLoginForm, accounts, addAccount }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [messageStatus, setMessageStatus] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
  };

  const clearRegisterForm = () => {
    setUsername("");
    setPassword("");
    setRePassword("");
    setEmail("");
  };

  const signUpHandler = () => {
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

    var list = JSON.parse(localStorage.getItem("listUser"));
    if (list) {
      let usernameExists = list.some(user => user.username === username);
      if (usernameExists) {
        setMessage("Tên người dùng đã tồn tại");
        setMessageStatus("error");
        setShowNotification(true);
        return;
      }
      list.push({ username, password });
      localStorage.setItem("listUser", JSON.stringify(list));
    } else {
      var newList = [{ username, password }];
      localStorage.setItem("listUser", JSON.stringify(newList));
    }

    setMessage("Đăng ký thành công");
    setMessageStatus("success");
    setShowNotification(true);
    clearRegisterForm();
    setTimeout(() => navigate('/login'), 1500);
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  return (
    <>
      {showNotification && (
        <div style={overlayStyle} onClick={closeNotification}>
          <div style={{ ...notificationStyle, backgroundColor: messageStatus === 'success' ? '#28a745' : '#dc3545' }}>
            {message}
          </div>
        </div>
      )}
      <section className="_form_05">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="_form-05-box">
                <div className="row">
                  <div className="col-sm-12 _nb-pl">
                    <div className="_mn_df">
                      <div className="main-head">
                        <h2>Đăng ký tài khoản mới</h2>
                      </div>

                      <div className="form-group">
                        <Input
                          title="Tên người dùng"
                          displayHorizon={true}
                          value={username}
                          setValue={setUsername}
                          type="text"
                          name="username"
                          className="form-control"
                          placeholder="Nhập tên người dùng"
                          required
                          aria-required="true"
                        />
                      </div>

                      <div className="form-group">
                        <Input
                          title="Mật khẩu"
                          displayHorizon={true}
                          value={password}
                          setValue={setPassword}
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Nhập mật khẩu"
                          required
                          aria-required="true"
                        />
                        <small className="form-text text-muted">
                          Mật khẩu phải chứa cả chữ cái và số.
                        </small>
                      </div>

                      <div className="form-group">
                        <Input
                          title="Nhập lại mật khẩu"
                          displayHorizon={true}
                          value={repassword}
                          setValue={setRePassword}
                          type="password"
                          name="repassword"
                          className="form-control"
                          placeholder="Nhập lại mật khẩu"
                          required
                          aria-required="true"
                        />
                      </div>

                      <div className="form-group">
                        <Input
                          title="Email"
                          displayHorizon={true}
                          value={email}
                          setValue={setEmail}
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Nhập email"
                          required
                          aria-required="true"
                        />
                      </div>

                      <div className="form-group">
                        <div className="row">
                          <div className="col-3">
                            <button
                              className="btn btn-secondary"
                              onClick={signUpHandler}
                            >
                              Đăng ký
                            </button>
                          </div>
                          <div className="col-9">
                            <Link to="/login">
                              <button
                                className="btn btn-primary"
                              >
                                Đăng nhập
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
