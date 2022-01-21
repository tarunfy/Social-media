import React, { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //login user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Sign in</h2>
        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            required
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        {error && <div id="error">{error}</div>}
        <button type="submit" className="login-btn btn">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
