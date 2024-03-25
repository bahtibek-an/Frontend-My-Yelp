import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(getAuth(), email, pass)
    .then(() =>  navigate('/'))
    .catch(() => {})
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
          placeholder="Full Name"
        />
        <label htmlFor="email">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)}type='email' placeholder='someone@gmail.com' />

        <label htmlFor="password">Password</label>
        <input value={pass} onChange={(e) => setPass(e.target.value)}type='password' placeholder='123456' />
        <button type="submit"> Log in </button>
      </form>
      <button className="link-btn" onClick={() => navigate("/login")}>
        {" "}
        Already have an account ? Login in here.{" "}
      </button>
    </div>
  );
};

export default Register;
