import React from "react"; 
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const portal = useHistory();
  const logOut = () => {
    alert("Log Out Successfully!");
    portal.push("/login");
  }

  return (
    <>
      <nav className="navbar p-3 border-bottom">
        <h3 role="button">My Yelp</h3>
        <div className="d-flex">
            <button onClick={logOut} className="btn btn-success">Log Out</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;