import React from "react";
import "./Home.css";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../firebase/config"
import Table from "../css/Table";
import Form from "../css/Form";

const Home = () => {
  const navigate = useNavigate();
 

  const logout = () => {
    signOut(getAuth()).then(() => {
      
      navigate("/login");
    });
  };
  return (
    <div>
      <button onClick={logout} className="button-log-out" >
        Log out{" "}
      </button>
      <Form />
      <Table />
    </div>
  );
};

export default Home;
