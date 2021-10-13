import { AxiosResponse } from "axios";

export interface UserProps {
  username: string;
  password: string;
  email?: string;
}
export interface TokenProps {
  token: string;
  user_email: string;
  user_nicename: string;
  user_display_name: string;
}
