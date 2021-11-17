import { AxiosError } from "axios";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import {
  ErrorResponse,
  TokenProps,
  UserCredentials,
  UserProps,
} from "../objectType";
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
  function userLogin({ username, password }: UserCredentials) {
    setLoading(true);
    TokenServices.getToken({
      username,
      password,
    })
      .then(async (result) => {
        const data = result.data as TokenProps;
        if (data.token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
          localStorage.setItem("token", data.token);
          await getUser();
          navigate("/user");
        }
      })
      .catch((err: AxiosError) => {
        const error = err.response?.data as ErrorResponse;
        const message = error.message
          ? error.message
          : "Tente novamente mais tarde";
        console.log(message);
        setSigned(false);
        setUser(null);
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function getUser() {
    const userResponse = await UserServices.getUser();
    if (userResponse.status === 200) {
      const userData = userResponse.data;
      if (isUserProps(userData)) {
        setSigned(true);
        setUser(userData);
      }
    }
  }

  function isUserProps(object: any): object is UserProps {
    return "nome" in object;
  }

  useEffect(() => {
    async function autoLogin() {
      setLoading(true);
      const token = window.localStorage.getItem("token");
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const validate = await TokenServices.validateToken();
      if (token && validate.status === 200) {
        setError(null);
        await getUser();
      } else {
        setError("Acesso Invalido");
      }
      setLoading(false);
    }
    autoLogin();
  }, []);

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
