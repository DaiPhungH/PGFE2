import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

const LoginComponent = ({ accounts, onLogin }) => {
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
      setErrorMessage("Tên người dùng hoặc mật khẩu không chính xác");
    }
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>

                  {errorMessage && (
                    <div className="alert alert-danger">
                      {errorMessage}
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

                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    onClick={loginHandler}
                  >
                    Đăng nhập
                  </button>

                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                    <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                    <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                  </div>
                </div>

                <div>
                  <p className="mb-0">
                    Don't have an account? <Link to="/register" className="text-white-50 fw-bold">Sign Up</Link>
                  </p>
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
