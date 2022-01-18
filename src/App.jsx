import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import "./styles/global.css";

const App = () => {
  const [user, setUser] = useState(false);
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
