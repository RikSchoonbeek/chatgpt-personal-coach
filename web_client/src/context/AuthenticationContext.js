import { createContext } from "react";

export const AuthenticationContext = createContext({
  loggedInUser: null,
  setLoggedInUser: () => console.log("I am original function"),
});
