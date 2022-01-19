import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="navbar-container">
      <Link className="logo" to="/">
        trello
      </Link>
      <div className="links">
        {user ? (
          <>
            <Link to="/profile">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC1jQVf2JYOvvadw85Y-KeSmjJdUX-rl7bWaIDibs2s26v1QGCa5xeXpr48VhEfnG6ero&usqp=CAU"
                alt="profile photo"
                id="profile"
              />
            </Link>
            <button onClick={handleLogout}>Logout</button>
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
