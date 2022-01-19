import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
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
                src={
                  user.profilePhoto
                    ? user.profilePhoto
                    : `https://saiuniversity.edu.in/wp-content/uploads/2021/02/default-img.jpg`
                }
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
