import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const portal = useHistory();
  const [ pageLoading, setPageLoading ] = useState(false);

  const logOut = () => {
    setPageLoading(true);
    alert("Log Out Successfully!");
    portal.push("/login");
    setPageLoading(false);
  };

  return (
    <>
      <nav className="navbar p-3 border-bottom">
        <h3 role="button">My Yelp</h3>
        <div className="d-flex">
            {pageLoading ? (
              <>
                <button class="btn btn-success" type="button" disabled>
                  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span class="visually-hidden" role="status">Loading...</span>
                </button>
              </> ) : (
              <>
                <button onClick={logOut} className="btn btn-success">Log Out</button>
              </>
            )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;