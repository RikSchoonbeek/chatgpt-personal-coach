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

import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";

import axios from "axios";
import DashBoard from "./components/DashBoard";
import MainAppBar from "./components/layout/MainAppBar";
import LoginPage from "./pages/LoginPage";
import { AuthenticationContext } from "./context/AuthenticationContext";
import { deleteCookie } from "./helpers";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const authenticationContextValue = useMemo(
    () => ({ loggedInUser, setLoggedInUser }),
    [loggedInUser]
  );
  // Make sure csrf token cookie is available
  // useEffect(() => {
  //   deleteCookie("csrftoken");
  //   axios.get("http://localhost:8000/api/user/auth/get_csrf_cookie/");
  // }, []);

  return (
    <div>
      <AuthenticationContext.Provider value={authenticationContextValue}>
        <MainAppBar />
        <Routes>
          <Route index element={<DashBoard />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<p>Can't find page</p>} />
        </Routes>
      </AuthenticationContext.Provider>
    </div>
  );

  // return (
  //   <div>
  //     {isLoggedIn ? (
  //       <div>
  //         <h1>Welcome, {username}!</h1>
  //         <Button onClick={handleLogout}>Logout</Button>
  //       </div>
  //     ) : (
  //       <div>
  //         <h1>Login</h1>
  //         <form onSubmit={handleLogin}>
  //           <input
  //             type="text"
  //             placeholder="Username"
  //             value={username}
  //             onChange={(e) => setUsername(e.target.value)}
  //           />
  //           <input
  //             type="password"
  //             placeholder="Password"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //           />
  //           <Button type="submit">Log in</Button>
  //         </form>
  //         {isRegistering ? (
  //           <div>
  //             <h1>Register</h1>
  //             <form onSubmit={handleRegister}>
  //               <input
  //                 type="text"
  //                 placeholder="Username"
  //                 value={username}
  //                 onChange={(e) => setUsername(e.target.value)}
  //               />
  //               <input
  //                 type="password"
  //                 placeholder="Password"
  //                 value={password}
  //                 onChange={(e) => setPassword(e.target.value)}
  //               />
  //               <Button type="submit">Register</Button>
  //             </form>
  //             {registrationError && <p>{registrationError}</p>}
  //             <Button onClick={() => setRegistering(false)}>Cancel</Button>
  //           </div>
  //         ) : (
  //           <Button onClick={() => setRegistering(true)}>Register</Button>
  //         )}
  //         {isResettingPassword ? (
  //           <div>
  //             <h1>Reset Password</h1>
  //             <form onSubmit={handleResetPassword}>
  //               <input
  //                 type="email"
  //                 placeholder="Email"
  //                 value={resetEmail}
  //                 onChange={(e) => setResetEmail(e.target.value)}
  //               />
  //               <Button type="submit">Reset Password</Button>
  //             </form>
  //             {resetPasswordError && <p>{resetPasswordError}</p>}
  //             <Button onClick={() => setResettingPassword(false)}>
  //               Cancel
  //             </Button>
  //           </div>
  //         ) : (
  //           <Button onClick={() => setResettingPassword(true)}>
  //             Reset Password
  //           </Button>
  //         )}
  //       </div>
  //     )}
  //   </div>
  // );
};

export default App;
