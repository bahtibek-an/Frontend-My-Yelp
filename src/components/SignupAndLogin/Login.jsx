import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import React, { useRef, useState, useEffect } from "react";

const CircleMain = React.lazy(() => import("../pages/CircleMain.jsx"));

const Login = () => {
  const inputEmail = useRef();
  const { login } = useAuth();
  const portal = useHistory();
  const inputPassword = useRef();
  const [ pageLoading, setPageLoading ] = useState(false);

  const handleUp = () => {
    portal.push("/signup");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPageLoading(true);

    try {
      await login(inputEmail.current.value, inputPassword.current.value);
      alert("Log In successfully!");
      portal.push("/");
    } catch {
      alert("Failed to log in");
    };
    setPageLoading(false);
  };

  useEffect(() => {
    document.title = "Login || My Yelp";
  }, []);

  return (
    <>
      <CircleMain />
      <div className="register d-flex justify-content-center align-items-center position-absolute">
        <div className="container p-5">
          <form onSubmit={handleSubmit}>
            <div>
              <h1 className="card-title mb-3">Login</h1>
              <div className="form-floating mb-3">
                <input type="email" className="form-control text-dark" id="floatingInput" placeholder="name@example.com" ref={inputEmail} autoComplete="email" required />
                <label for="floatingInput">Email address</label>
              </div>
            </div>
              <div>
                <div className="form-floating mb-4">
                  <input type="password" className="form-control" id="floatingPassword" placeholder="Password" ref={inputPassword} autoComplete="current-password" required />
                  <label for="floatingPassword">Password</label>
                </div>
                <p role="button" className="text-muted text-end"><Link className="text-reset" to="/reset">Forgot password?</Link></p>
                {pageLoading ? (
                  <>
                    <button class="btn btn-success w-100 mb-5" type="button" disabled>
                      <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                      <span class="visually-hidden" role="status">Loading...</span>
                    </button>
                  </> ) : (
                    <>
                    <button type="submit" className="btn btn-success w-100 mb-5">Log In</button>
                    </>
                  )}
              </div>
            </form>
            <p className="text-center text-muted fs-6">Don't have a account <span onClick={handleUp} role="button" className="text-success text-decoration-underline">Sign Up</span></p>
          </div>
      </div>
    </>
  );
};

export default Login;