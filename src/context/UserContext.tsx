import React, { createContext, ReactNode, useContext, useState } from "react";
import { TokenProps, UserCredentials, UserProps } from "../objectType";
import api from "../services/api";
import { TokenServices } from "../services/TokenServices";
import { UserServices } from "../services/UserServices";

interface UserContextData {
  signed: boolean;
  loading: boolean;
  user: UserProps | null;
  error: string;
  userLogin: ({ username, password }: UserCredentials) => void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function userLogin({ username, password }: UserCredentials) {
    const response = await TokenServices.getToken({
      username,
      password,
    });
    const token = response.data.token;
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
      getUser();
    }
  }
  async function getUser() {
    const userResponse = await UserServices.getUser();
    setSigned(true);
    setUser(userResponse.data);
  }
  return (
    <UserContext.Provider value={{ signed, loading, user, error, userLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  return context;
}
