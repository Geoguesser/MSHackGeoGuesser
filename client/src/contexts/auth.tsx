import React from "react";
import { login as loginUser, getUser, updateUsername } from "../utils/auth";

export interface DefaultAuthContext {
  login: (u: string | null, cb?: () => void) => void;
  user: string | null; // username from localstorage
  oldLogin: (
    u: string,
    cb: () => void
  ) => Promise<{ data: { SessionTicket: string; PlayFabId: string } } | null>;
}

const defaultContext: DefaultAuthContext = {
  login: () => {},
  user: "",
  oldLogin: loginUser
};

const AuthContext = React.createContext(defaultContext);

function AuthProvider(props: React.PropsWithChildren<{}>) {
  const [user, setUser] = React.useState<string | null>(getUser());
  const login: DefaultAuthContext["login"] = (username, callback = () => {}) => {
    loginUser(username || "")
      .then(() => updateUsername(username || ""))
      .then(() => setUser(getUser()))
      .then(() => callback())
      .catch(err => console.log(err));
  };
  return <AuthContext.Provider value={{ login, user, oldLogin: loginUser }} {...props} />;
}

export { AuthProvider, AuthContext };
