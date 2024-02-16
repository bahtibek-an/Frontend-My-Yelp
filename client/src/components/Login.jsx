import React, { useState } from "react";
import "./Login.css";
import { gql, useMutation } from "@apollo/client";
// import { Link } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { Home } from "./Home";
const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(data: { 
    email: $email, 
    password: $password 
  }) {
    success
    token
    message
    data{
      email
      password
      name
      id
    }
  }
}
`;
export const Login = () => {
  const navigate = useNavigate()
  const [emailUser, setEmail] = useState("")
  const [passwordUSer, setPassword] = useState("")
  const [loginMutation, { loading, error }] = useMutation(LOGIN_USER, {
  })
  function handleLog() {
    loginMutation({
      variables: {
        email: emailUser,
        password: passwordUSer
      }
    }).then((data) => {
      const success = data.data.login.success;
      const message = data.data.login.message;
      const dataUser = data.data.login.data.id;
  
      if (!success) {
        alert(message);
        navigate('/login');
        return false;
      } else {
        alert(message);
        console.log(data.data);
        navigate(`/home/${dataUser}`);
        return true;
      }
    }).catch((error) => {
      console.error("GraphQL Error:", error);
      alert("An error occurred. Please check console for details.");
    });
  }
  
  return (

    <div className="login_wrape">
      <h3 style={{color:"#fff"}}>Login</h3>
      <form onSubmit={handleLog}>
        <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      </form>
      <button className="btn" onClick={handleLog}>
        Login
      </button>
      <p>Doy you not have account? <Link to={'/register'}>Register</Link></p>
    </div>
  );
};
