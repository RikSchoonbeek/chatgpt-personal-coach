import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";

import { AuthenticationContext } from "../context/AuthenticationContext";
import { performBackendRequest } from "../helpers";

const LoginPage = () => {
  const navigate = useNavigate();
  const { loggedInUser, setLoggedInUser } = useContext(AuthenticationContext);
  const [username, setUsername] = useState("rik");
  const [password, setPassword] = useState("Zrnmwu11");

  const handleLogin = async (e) => {
    e.preventDefault();
    performBackendRequest(
      "user/auth/login/",
      "POST",
      { username, password },
      { "Content-Type": "application/json" }
    )
      .then(() => {
        debugger;
        setLoggedInUser(username);
      })
      .catch(() => alert("Login attempt failed"));
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Log in</Button>
      </form>
    </div>
  );
};

export default LoginPage;
