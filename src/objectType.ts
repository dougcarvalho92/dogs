import { AxiosResponse } from "axios";

export interface UserCredentials {
  username: string;
  email?: string;
  password: string;
}
export interface TokenProps {
  token: string;
  user_email: string;
  user_nicename: string;
  user_display_name: string;
}
export interface UserProps {
  username: string;
  id: number;
  nome: string;
  email: string;
}
export interface ErrorResponse {
  code: string;
  data: {
    status: number;
  };
  message: string;
}

export interface ErrorMessage {
  message: string;
}
