// App.js

import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "./firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import Main from "./components/Main/Main";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import './App.css'
function App() {
  const [isLogged, setIsLogged] = useState(true);
  const [accountList, setAccountList] = useState([]);
  const auth = getAuth();

  const itemCollectionAccount = collection(db, "accounts");

  const fetchAccountList = async () => {
    try {
      const dataAcc = await getDocs(itemCollectionAccount);
      const filteredDataAcc = dataAcc.docs.map((doc) => ({
        ...doc.data(),
      }));
      setAccountList(filteredDataAcc);
    } catch (error) {
      console.error("Error fetching account list:", error);
    }
  };

  const checkAuthState = (user) => {
    setIsLogged(!!user);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, checkAuthState);
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (isLogged) {
      fetchAccountList();
    }
  }, [isLogged]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={
            isLogged ? <Navigate to="/" replace /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            isLogged ? (
              <Navigate to="/" replace />
            ) : (
              <Register itemCollectionAccount={itemCollectionAccount} />
            )
          }
        />
        <Route
          path="/"
          element={
            isLogged ? (
              <Suspense fallback={<div>Loading...</div>}>
                <Main accountList={accountList} getAccountList={fetchAccountList} />
              </Suspense>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
