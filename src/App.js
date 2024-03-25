import React, { useEffect, useState } from "react";
import "./App.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Route, Routes } from "react-router-dom";
import "./firebase/config";
import "./App.css"
import Home from "./Home/Home";
import Login from "./css/components/Login";
// import Register from "./components/Register";

function App() {
  const [login, setIsLoggin] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    let findOut = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggin(true);
      } else {
        setIsLoggin(false);
      }
    });
    return findOut;
  }, [auth]);

  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </div>
  );
}
export default App;
