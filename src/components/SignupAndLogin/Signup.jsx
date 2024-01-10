import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import React, { useRef, useState, useEffect } from "react";

const CircleMain = React.lazy(() => import("../pages/CircleMain.jsx"));

const Signup = () => {
  const portal = useHistory();
  const inputEmail = useRef();
  const { signup } = useAuth();
  const inputPassword = useRef();
  const inputPasswordConfirm = useRef();
  const [ pageLoading, setPageLoading ] = useState(false);

   
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPageLoading(true);

    if (inputPassword.current.value !== inputPasswordConfirm.current.value) {
      return alert("Passwords do not match");
    };

    try {
      alert("Sign Up Successfully!");
      await signup(inputEmail.current.value, inputPassword.current.value);
      portal.push("/");
    } catch {
      alert("Failed to create an account!");
    };
    setPageLoading(false);
  };

  useEffect(() => {
    document.title = "Signup || My Yelp";
  }, []);

  return (
    <>
      <CircleMain />
      <div className="register d-flex justify-content-center align-items-center position-absolute">
        <div className="container p-5">
            <form onSubmit={handleSubmit}>
                <h1 className="card-title mb-3">Sign Up</h1>
                <div className="form-floating mb-3">
                    <input type="email" ref={inputEmail} className="form-control text-dark" id="floatingInput" placeholder="name@example.com" required />
                    <label for="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" ref={inputPassword} className="form-control" id="floatingPassword" placeholder="Password" required />
                    <label for="floatingPassword">Password</label>
                </div>
                <div className="form-floating mb-4">
                    <input type="password" ref={inputPasswordConfirm} className="form-control" id="floatingPassword" placeholder="Password" autoComplete="current-password" required />
                    <label for="floatingPassword">Confirm password</label>
                </div>
                {pageLoading ? (
                  <>
                    <button class="btn btn-success w-100 mb-4" type="button" disabled>
                      <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                      <span class="visually-hidden" role="status">Loading...</span>
                    </button>
                  </> ) : (
                    <>
                      <button type="submit" className="btn btn-success w-100 mb-4">Sign Up</button>
                    </>
                )}
            </form>
            <p className="text-center text-muted fs-6">Already have a account <Link to="/login" role="button" className="text-success text-decoration-underline">Log In</Link></p>
        </div>
      </div>
    </>
  );
};

export default Signup;