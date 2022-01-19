import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "./contexts/auth";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profie";
import "./styles/global.css";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Switch>
        <Route
          exact
          path="/"
          render={(props) =>
            user ? <Home {...props} /> : <Redirect to="/login" />
          }
        />
        <Route
          exact
          path="/profile"
          render={(props) =>
            user ? <Profile {...props} /> : <Redirect to="/login" />
          }
        />
        <Route
          exact
          path="/signup"
          render={(props) =>
            !user ? <Signup {...props} /> : <Redirect to="/" />
          }
        />
        <Route
          exact
          path="/login"
          render={(props) =>
            !user ? <Login {...props} /> : <Redirect to="/" />
          }
        />
      </Switch>
    </>
  );
};

export default App;
