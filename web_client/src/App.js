// In the code above, the handlePasswordReset function handles the submission of the new password for
// password reset. The form fields and UI elements for registration and password reset have been added.
// The conditional rendering allows users to toggle between the login, registration, and password reset
// sections.

// Make sure to replace the placeholders ({/* Login form fields */}, {/* Registration form fields */},
// {/* Reset password form fields */}) with the appropriate JSX for the respective forms.

// Remember to adjust the API URL (API_URL) to match your Django backend's URL.

// Note: This code assumes that you have the necessary form fields in the JSX markup for each form. It
// also assumes that you have corresponding Django views and URLs set up to handle the registration and
// password reset functionality on the backend.

import React, { useEffect, useState } from "react";

import axios from "axios";

import { performBackendRequest } from "./helpers";

const API_URL = "http://localhost:8000/api/";

axios.defaults.withCredentials = true; // even for get requests if demand session authentication
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "x-csrftoken";

const App = () => {
  const [username, setUsername] = useState("rik");
  const [password, setPassword] = useState("Zrnmwu11");
  const [newPassword, setNewPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isRegistering, setRegistering] = useState(false);
  const [isResettingPassword, setResettingPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [registrationError, setRegistrationError] = useState(null);
  const [resetPasswordError, setResetPasswordError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/api/user/auth/get_csrf_cookie/");
  }, []);

  const getCookieValue = (cookieName) => {
    const cookie = document.cookie.match(
      "(^|;)\\s*" + cookieName + "\\s*=\\s*([^;]+)"
    );
    const cookieValue = cookie ? cookie.pop() : null;
    return cookieValue;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    performBackendRequest(
      "user/auth/login/",
      "POST",
      { username, password },
      { "Content-Type": "application/json" }
    )
      .then(() => {
        // Handle successful login, redirect, etc.
        setLoggedIn(true);
      })
      // TODO better solution
      .catch(() => alert("Log in error"));
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}user/auth/logout/`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setLoggedIn(false);
        // Handle successful logout, redirect, etc.
      } else {
        // Handle failed logout
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // performBackendRequest(
    //   "user/auth/register/",
    //   "POST",
    //   { username, password },
    //   { "Content-Type": "application/json" }
    // )
    //   .then(() => {
    //     setLoggedIn(true);
    //     setRegistering(false);
    //   })
    //   .catch((error) => {
    //     setRegistrationError(error.response.data);
    //   });

    try {
      const response = await fetch(`${API_URL}user/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookieValue("csrftoken"),
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      if (response.ok) {
        setLoggedIn(true);
        setRegistering(false);
        // Handle successful registration, redirect, etc.
      } else {
        const data = await response.json();
        setRegistrationError(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}user/auth/reset-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
        credentials: "include",
      });
      if (response.ok) {
        setResetPasswordError(null);
        // Handle successful password reset request
      } else {
        const data = await response.json();
        setResetPasswordError(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    // Backend should send email with link to frontend page, containing the resetToken in the URL
    // I should find a way to get access to the token in the code, probably using react router
    const resetToken = "TODO get token from URL";
    try {
      const response = await fetch(
        `${API_URL}user/auth/password-reset/${resetToken}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ new_password: newPassword }),
          credentials: "include",
        }
      );
      if (response.ok) {
        // Handle successful password reset
      } else {
        const data = await response.json();
        // Handle failed password reset
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome, {username}!</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
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
            <button type="submit">Log in</button>
          </form>
          {isRegistering ? (
            <div>
              <h1>Register</h1>
              <form onSubmit={handleRegister}>
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
                <button type="submit">Register</button>
              </form>
              {registrationError && <p>{registrationError}</p>}
              <button onClick={() => setRegistering(false)}>Cancel</button>
            </div>
          ) : (
            <button onClick={() => setRegistering(true)}>Register</button>
          )}
          {isResettingPassword ? (
            <div>
              <h1>Reset Password</h1>
              <form onSubmit={handleResetPassword}>
                <input
                  type="email"
                  placeholder="Email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
                <button type="submit">Reset Password</button>
              </form>
              {resetPasswordError && <p>{resetPasswordError}</p>}
              <button onClick={() => setResettingPassword(false)}>
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={() => setResettingPassword(true)}>
              Reset Password
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
