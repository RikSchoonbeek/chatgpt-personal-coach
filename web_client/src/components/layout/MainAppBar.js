import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import { AppBar, Button, Toolbar, Typography } from "@mui/material";

import { AuthenticationContext } from "../../context/AuthenticationContext";

const API_URL = "http://localhost:8000/api/";

const MainAppBar = () => {
  const { loggedInUser } = useContext(AuthenticationContext);
  const isLoggedIn = !!loggedInUser;

  console.log("MainAppBar, loggedInUser", loggedInUser);

  const [newPassword, setNewPassword] = useState("");
  const [isRegistering, setRegistering] = useState(false);
  const [isResettingPassword, setResettingPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [registrationError, setRegistrationError] = useState(null);
  const [resetPasswordError, setResetPasswordError] = useState(null);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}user/auth/logout/`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        // TODO remove username from context
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
    // try {
    //   const response = await fetch(`${API_URL}user/auth/register/`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "X-CSRFToken": getCookieValue("csrftoken"),
    //     },
    //     body: JSON.stringify({ username, password }),
    //     credentials: "include",
    //   });
    //   if (response.ok) {
    //     setLoggedIn(true);
    //     setRegistering(false);
    //     // Handle successful registration, redirect, etc.
    //   } else {
    //     const data = await response.json();
    //     setRegistrationError(data.error);
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  const handlePasswordChange = () => {
    // TODO
  };

  const handlePasswordResetRequest = async (e) => {
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
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MyApp
        </Typography>
        {!isLoggedIn && (
          <React.Fragment>
            <NavLink to="/login">Log in</NavLink>
            <Button color="inherit" onClick={handleRegister}>
              Register
            </Button>
            <Button color="inherit" onClick={handlePasswordResetRequest}>
              Reset Password
            </Button>
          </React.Fragment>
        )}
        {isLoggedIn && (
          <React.Fragment>
            <NavLink to="/">Dashboard</NavLink>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
            <Button color="inherit" onClick={handlePasswordChange}>
              Change Password
            </Button>
          </React.Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
