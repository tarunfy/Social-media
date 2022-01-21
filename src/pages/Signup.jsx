import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { addDoc, collection } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [error, setError] = useState("");

  //signing up and saving user's info in firestore db:
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (password === confirmPassword) {
        const cred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const res = await addDoc(collection(db, "users"), {
          userId: cred.user.uid,
          contactNumber,
          fullName,
          email,
          profilePhoto: "",
        });
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setContactNumber("");
        setFullName("");
      } else {
        throw new Error("Make sure passwords match");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <div className="input-container">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              id="input-name"
              autoComplete="off"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Contact"
              autoComplete="off"
              className="input"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            autoComplete="off"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>
        {error && (
          <div id="error">
            <p>{error}</p>
          </div>
        )}
        <button type="submit" className="signup-btn btn">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Login;
