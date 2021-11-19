import { AxiosError, AxiosResponse } from "axios";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { CommentProps, PostImageData } from "../objectType";
import { CommentServices } from "../services/CommentServices";
import PhotoServices from "../services/PhotoServices";

interface PhotoContextData {
  photos: PostImageData[] | null;
  photoSelected: PostImageData | null;
  comments: CommentProps[] | null;
  error: string;
  loading: boolean;
  handleChangeModalPhoto: (photo: PostImageData | null) => void;
  PostComments: (comment: string, id: string) => void;
}

const PhotoContext = createContext<PhotoContextData>({} as PhotoContextData);

interface PhotoProviderProps {
  children: ReactNode;
}

export const PhotoProvider = ({ children }: PhotoProviderProps) => {
  const [photos, setPhotos] = useState<PostImageData[] | null>(null);
  const [photoSelected, setPhotoSelected] = useState<PostImageData | null>(
    null
  );
  const [comments, setComments] = useState<CommentProps[] | null>(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getPhotos() {
      setLoading(true);
      PhotoServices.filterPhotos(10, 1, 0)
        .then((response: AxiosResponse) => {
          const feedPhotos = response.data as PostImageData[];
          setPhotos(feedPhotos);
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            setError(error.response?.statusText);
          } else {
            setError("Erro ao buscar imagens");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
    getPhotos();
  }, []);

  async function handleChangeModalPhoto(photo: PostImageData | null) {
    if (photo) {
      await PhotoServices.getPhotoById(photo.id).then((result) => {
        if (result.data) {
          const data = result.data;
          setPhotoSelected(data.photo);
          setComments(data.comments);
        }
      });
    } else {
      setPhotoSelected(null);
      setComments(null);
    }
  }
  async function PostComments(comment: string, id: string) {
    if (comment && id) {
      CommentServices.commentPost(comment, id)
        .then((result) => {
          const newComment = comments
            ? [...comments, result.data]
            : [result.data];
          setComments(newComment);
        })
        .catch(() => {
          setError("Não foi possivel. Tente novamente mais tarde!");
        });
    }
  }

  return (
    <PhotoContext.Provider
      value={{
        photos,
        photoSelected,
        error,
        loading,
        handleChangeModalPhoto,
        PostComments,
        comments,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};

export function usePhotos() {
  const context = useContext(PhotoContext);
  return context;
}
