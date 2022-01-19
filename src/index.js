import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./contexts/auth";
import { PostProvider } from "./contexts/post";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <PostProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </PostProvider>
  </Router>,
  document.getElementById("root")
);
