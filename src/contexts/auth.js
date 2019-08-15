import React from "react";
import { login as loginUser, getUser, updateUsername } from "../utils/auth";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [user, setUser] = React.useState(getUser());
  const login = (username, callback = () => {}) => {
    loginUser(username)
      .then(() => updateUsername(username))
      .then(() => setUser(getUser()))
      .then(() => callback())
      .catch(err => console.log(err));
  };
  return <AuthContext.Provider value={{ login, user, oldLogin: loginUser }} {...props} />;
}

export { AuthProvider, AuthContext };
