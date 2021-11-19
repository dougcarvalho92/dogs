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

export interface UserPostImageProps {
  preview: string;
  raw: Blob;
}
export interface PostImageProps {
  nome: string;
  idade: string;
  peso: string;
  img: Blob;
}
export interface PostImageData {
  acessos: string;
  author: string;
  date: string;
  id: number;
  idade: number;
  peso: number;
  src: string;
  title: string;
  total_comments: string;
}

export interface PhotoSelectedProps {
  comments: [];
  photo: PostImageData;
}
