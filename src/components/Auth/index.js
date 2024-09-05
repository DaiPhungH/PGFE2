import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Input from "../UI/Input";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

const LoginComponent = ({ accounts, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
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
      navigate('/');
    } else {
      setErrorMessage("Tên người dùng hoặc mật khẩu không chính xác");
    }
  };

  return (
    <section className="_form_05">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <div className="_form-05-box">
              <div className="main-head">
                <h2>Login to your account</h2>
              </div>

              {errorMessage && (
                <div className="alert alert-danger">
                  {errorMessage}
                </div>
              )}

              <div className="form-group">
                <Input
                  title="Username"
                  displayHorizon={true}
                  value={username}
                  setValue={setUsername}
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
                  required
                  aria-required="true"
                />
              </div>

              <div className="form-group">
                <Input
                  title="Password"
                  displayHorizon={true}
                  value={password}
                  setValue={setPassword}
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter Password"
                  required
                  aria-required="true"
                />
              </div>

              <div className="checkbox form-group">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
              </div>

              <div className="form-group">
                <div className="btn-group">
                  <button
                    className="btn btn-primary"
                    onClick={loginHandler}
                  >
                    Login
                  </button>
                  <Link to="/register" className="btn btn-secondary">
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginComponent;
