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
  id: string;
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
  id: string;
  idade: number;
  peso: number;
  src: string;
  title: string;
  total_comments: string;
}

export interface CommentProps {
  comment_ID: string;
  comment_agent: string;
  comment_approved: string;
  comment_author: string;
  comment_author_IP: string;
  comment_author_email: string;
  comment_author_url: string;
  comment_content: string;
  comment_date: string;
  comment_date_gmt: string;
  comment_karma: string;
  comment_parent: string;
  comment_post_ID: string;
  comment_type: string;
  user_id: string;
}

export interface PhotoSelectedProps {
  comments: CommentProps[];
  photo: PostImageData;
}
