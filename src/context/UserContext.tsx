import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { AxiosErrorResponse, UserCredentials, UserProps } from "../objectType";
import api from "../services/api";
import { TokenServices } from "../services/TokenServices";
import { UserServices } from "../services/UserServices";

interface UserContextData {
  signed: boolean;
  loading: boolean;
  user: UserProps | null;
  error: string | null;
  userLogin: ({ username, password }: UserCredentials) => void;
  userLogout: () => void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const userLogout = useCallback(
    async function () {
      setUser(null);
      setSigned(false);
      setError(null);
      setLoading(false);
      window.localStorage.removeItem("token");
      navigate("/");
    },
    [navigate]
  );
  async function userLogin({ username, password }: UserCredentials) {
    setLoading(true);
    try {
      const response = await TokenServices.getToken({
        username,
        password,
      });
      if (response.status !== 200) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const token = response.data.token;
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", token);
        await getUser();
        setSigned(true);
        navigate("/conta");
      }
    } catch (error) {
      setSigned(false);
      setUser(null);
      if (isErrorResponse(error)) {
        const err = error as AxiosErrorResponse;
        setError(err.data.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function getUser() {
    const userResponse = await UserServices.getUser();
    if (userResponse.status === 200) {
      setSigned(true);
      const userData = userResponse.data;
      if (isUserProps(userData)) {
        setUser(userData);
      }
    }
  }

  function isUserProps(object: any): object is UserProps {
    return "nome" in object;
  }
  function isErrorResponse(object: any): object is AxiosErrorResponse {
    return "data.message" in object;
  }

  useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const validate = await TokenServices.validateToken();
          if (validate.status !== 200) throw new Error(validate.statusText);
          await getUser();
          setSigned(true);
        } catch (error) {
          userLogout();
        } finally {
          setLoading(false);
        }
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ signed, loading, user, error, userLogin, userLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  return context;
}
