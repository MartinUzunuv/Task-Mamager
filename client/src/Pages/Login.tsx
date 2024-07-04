import React, { useState } from "react";
import "../styles/login.css";

const Login: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Password:", password);
  };

  return (
    <div className="container">
      <div className="formContainer">
        <h2 className="title">Login</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="inputGroup">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submitButton">
            Submit
          </button>
        </form>
        <a href="/create-account" className="link">
          Create Account
        </a>
      </div>
    </div>
  );
};

export default Login;
