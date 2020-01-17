import * as React from "react";
import { User } from "../utils/types";
import { serverUrl } from "../utils/url-resolver";
import { ryokoApi } from "../utils/apiClient";

interface AuthProviderProps {
  children?: React.ReactNode;
}

interface State {
  user?: User;
  login: () => void;
  fetchCurrentUser?: () => Promise<User | undefined>;
  loading: boolean;
}

const login = () => {
  window.open(`${serverUrl}/auth/google`, "_self");
};

const fetchUser = (callback: (user?: User) => any): Promise<User | undefined> => {
  return ryokoApi<{ user: User }>("/api/user").then(data => {
    if (data.user) {
      callback(data.user);
      return data.user;
    }
  });
};

const initialState: State = { login, loading: true };

const authContext = React.createContext(initialState);
const { Provider } = authContext;

// actual logic provided to useAuth
const useAuthProvider = () => {
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const [loading, setLoading] = React.useState<boolean>(true);

  const fetchCurrentUser = (): Promise<User | undefined> => {
    return fetchUser(user => {
      setUser(user);
      setLoading(false);
    });
  };

  React.useEffect(() => {
    fetchCurrentUser();
  }, []);

  return {
    loading,
    user,
    login,
    fetchCurrentUser
  };
};

// needed to allow any children components to access auth through useAuth()
export const AuthProvider: React.FunctionComponent = ({ children }: AuthProviderProps) => {
  const auth = useAuthProvider();
  return <Provider value={auth}>{children}</Provider>;
};

// hook to be used from child components
export const useAuth = () => {
  return React.useContext(authContext);
};
