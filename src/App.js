import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Main from "./components/main";
import Register from "./components/register";
import "./firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  

  let auth = getAuth();

  useEffect(() => {
    let findOut = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });

    return findOut;
  }, [auth]);

  return (
    <div className="App">
     <Navbar />
      <Routes>
        <Route
          path="/login"
          element={isLogged ? <Navigate to={"/"} replace /> : <Login />}
        ></Route>
        <Route
          path="/register"
          element={
            isLogged ? (
              <Navigate to={"/"} replace />
            ) : (
              <Register />
            )
          }
        ></Route>
        <Route
          path="/"
          element={
            isLogged ? (
              <Main />
            ) : (
              <Navigate to={"/login"} replace />
            )
          }
        ></Route>
      </Routes>
    </div>
  );
}
export default App;
