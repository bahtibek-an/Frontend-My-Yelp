import { useState } from "react";
import "../firebase/config";
import "./styles/register.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordErr, setPasswordErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length >= 6) {
      try {
        createUserWithEmailAndPassword(getAuth(), email, password)
          .then(() => setEmailErr(false))
          .catch(() => setEmailErr(true));
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
          <h1 className="my-4 text-danger">Sign Up to Yelp</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-floating my-3">
              <input
                type="text"
                className="form-control "
                id="floatingInput"
                placeholder="name@example.com"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
              <label for="floatingInput">User name:</label>
            </div>

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
              <label for="floatingInput">Email:</label>
              {emailErr && <span className="text-danger">Email already used</span>}
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
                  Password must be at least 6 characters
                </span>
              )}
            </div>

            <button type="submit" className="btn btn-danger my-3">
              Sign Up
            </button>
            <div className="rega">
              <p>
                Don't have an account? <Link to={"/login"}>Login</Link>
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
export default Register;
