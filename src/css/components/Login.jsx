import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(getAuth(), email, pass)
      .then(() => navigate("/"))
      .catch(() => {});
  };
  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="email" htmlFor="email">
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="someone@gmail.com"
        />
        <label className="password" htmlFor="password">
          Password
        </label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="123456"
        />
        <button type="submit"> Log in </button>
      </form>
      <button className="link-btn" onClick={() => navigate("/register")}>
        {" "}
        Have not any account ? Register here.{" "}
      </button>
    </div>
  );
};
export default Login;
