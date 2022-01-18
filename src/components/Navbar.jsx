import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(false);

  return (
    <div className="navbar-container">
      <div className="logo">PHOENIX</div>
      <div className="links">
        {user ? (
          <>
            <Link to="/profile" className="link">
              Profile
            </Link>
            <button>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="link">
              Sign in
            </Link>
            <Link to="/signup" className="link">
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
