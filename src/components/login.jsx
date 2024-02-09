import React, { useState } from "react";
import "./styles/login.css";
import "../firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);  



  const handleLogin = (e) => {
    e.preventDefault();
    if (password.length >= 6) {
      try {
        signInWithEmailAndPassword(getAuth(), email, password)
          .then(() => setPasswordErr(false))
          .catch(() => setPasswordErr(true));
      } catch (error) {
        console.log(error);
      }
      setPasswordErr(false);
    } else {
      setPasswordErr(true);
    }
  };

  return (
    <div className="login">
      <div className="wrapper">
        <div className="login-cont my-5">
          <h1 className="my-4 text-danger">Log in to Yelp</h1>
          <form onSubmit={handleLogin}>
            <div className="form-floating">
              <input
                type="email"
                className="form-control "
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="floatingInput">Email:</label>
            </div>

            <div className="form-floating my-3">
              <input
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <label>Password:</label>
                   {passwordErr && (
                <span className="text-danger">
                  email or passwor is invalid
                </span>
              )}
            </div>

            <button type="submit" className="btn btn-danger my-3">
              Log in
            </button>
            <div className="rega">
              <p>
                Don't have an account? <Link to={"/register"}>Register</Link>
              </p>
            </div>
          </form>
        </div>
        <div className="login-img">
          <img
            className="img"
            src="https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
