import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import React, { useRef, useState, useEffect } from "react";

const CircleMain = React.lazy(() => import("../pages/CircleMain.jsx"));

const ResetPassword = () => {
  const inputEmail = useRef();
  const portal = useHistory();
  const { resetPassword } = useAuth();
  const [ pageLoading, setPageLoading ] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPageLoading(true);

    try {
      await resetPassword(inputEmail.current.value);
      alert("Check your email");
      portal("/login");
    } catch {
      alert("Failed to reset password");
    };
    setPageLoading(false);
  };
  
  useEffect(() => {
    document.title = "Reset Password || My Yelp";
  }, []);

  return (
    <>
      <CircleMain />
      <div className="register d-flex justify-content-center align-items-center position-absolute">
        <div className="container p-5">
          <form onSubmit={handleSubmit}>
            <h1 className="card-title mb-3">Reset password</h1>
            <div className="form-floating mb-4"> 
                <input type="email" className="form-control text-dark" id="floatingInput" placeholder="name@example.com" ref={inputEmail} autoComplete="email" required />
                <label for="floatingInput">Email address</label>
            </div>
            {pageLoading ? (
              <>
                <button class="btn btn-success w-100 mb-4" type="button" disabled>
                  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span class="visually-hidden" role="status">Loading...</span>
                </button>
              </> ) : (
              <>
                <button type="submit" className="btn btn-success w-100 mb-4">Reset password</button>
              </>
            )}
          </form>
          <p className="text-center text-muted fs-6">Back to <Link to={"/login"} role="button" className="text-success text-decoration-underline">Log In</Link></p>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;