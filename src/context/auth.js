import React from "react";
import { login as loginUser, getUser, updateUsername } from "../utils/auth";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [user, setUser] = React.useState(getUser());
  const login = (username, callback) => {
    loginUser(username, callback)
      .then(() => updateUsername(username))
      .then(() => setUser(getUser()))
      .catch(err => console.log(err));
  };
  return <AuthContext.Provider value={{ login, user }} {...props} />;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within an AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
