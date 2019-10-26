import React from "react";
import { getData } from "../utils/data";
import { UserData, User } from "../utils/types";

export interface AuthenticationProviderType {
  isAuthenticated?: boolean;
  logout: () => Promise<void>;
  user?: User;
}
interface AuthenticationProviderProps {
  children: React.ReactNode;
}

export const AuthenticationContext = React.createContext<AuthenticationProviderType>({
  logout: async () => {
    await fetch("/auth/logout");
  }
});

function AuthenticationProvider({ children }: AuthenticationProviderProps): JSX.Element | null {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | undefined>(undefined);
  const [user, setUser] = React.useState<User | undefined>(undefined);

  console.log("IS AUTHENTICATED:", isAuthenticated);

  React.useEffect(() => {
    console.log("USE EFFECT");
    const fetchUser = async () => {
      const data: UserData = await getData("api/user");
      if (data.error) {
        setIsAuthenticated(false);
      } else if (data.user) {
        setIsAuthenticated(true);
        setUser(data.user);
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  const logout = async () => {
    await fetch("/auth/logout");
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    logout,
    user
  };

  if (isAuthenticated === undefined) {
    return null;
  }
  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
}

export { AuthenticationProvider };
