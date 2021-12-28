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
  commentsSelected: CommentProps[] | null;
  error: string;
  loading: boolean;
  handleChangeModalPhoto: (id: string | null) => void;
  PostComments: (comment: string, id: string) => void;
  handleDeletePhoto: (id: string) => void;
  handleChangePage: (page: number) => void;
  handleChangeComments: (comments: CommentProps[]) => void;
}

const PhotoContext = createContext<PhotoContextData>({} as PhotoContextData);

interface PhotoProviderProps {
  userId: string | null;
  children: ReactNode;
}

export const PhotoProvider = ({ children, userId }: PhotoProviderProps) => {
  const [photos, setPhotos] = useState<PostImageData[]>([]);
  const [photoSelected, setPhotoSelected] = useState<PostImageData | null>(
    null
  );
  const [commentsSelected, setCommentsSelected] = useState<CommentProps[]>([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [infinite, setInfinite] = useState(true);
  async function handleChangeModalPhoto(id: string | null) {
    if (id) {
      await PhotoServices.getPhotoById(id).then((result) => {
        if (result.data) {
          const data = result.data;
          setPhotoSelected(data.photo);
          handleChangeComments(data.comments);
        }
      });
    } else {
      setPhotoSelected(null);
      handleChangeComments([]);
    }
  }
  function handleChangeComments(comments: CommentProps[]) {
    setCommentsSelected(comments);
  }
  async function PostComments(comment: string, id: string) {
    if (comment && id) {
      CommentServices.commentPost(comment, id)
        .then((result) => {
          const newComment = commentsSelected
            ? [...commentsSelected, result.data]
            : [result.data];
          handleChangeComments(newComment);
        })
        .catch(() => {
          setError("Não foi possivel. Tente novamente mais tarde!");
        });
    }
  }
  function handleDeletePhoto(id: string) {
    PhotoServices.deletePhoto(id);
  }
  const handleChangePage = (page: number) => setPage(page);

  useEffect(() => {
    async function getPhotos() {
      setLoading(true);
      await PhotoServices.filterPhotos(page * 3, 1, userId ? userId : "0")
        .then((response: AxiosResponse) => {
          const feedPhotos = response.data as PostImageData[];
          setPhotos((fp) => {
            if (
              feedPhotos.length === fp.length ||
              feedPhotos.length % 3 !== 0
            ) {
              setInfinite(false);
            }
            return feedPhotos;
          });
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

    if (infinite) {
      getPhotos();
    }
  }, [page, userId, infinite]);

  useEffect(() => {
    let wait = false;
    function InfinityScroll() {
      const scrollY = window.scrollY;
      const height = document.body.offsetHeight - window.innerHeight;

      if (scrollY > height && !wait) {
        setPage((page) => page + 1);
        wait = true;
        setTimeout(() => {
          wait = false;
        }, 1000);
      }
    }
    window.addEventListener("scroll", InfinityScroll);
    window.addEventListener("wheel", InfinityScroll);
    return () => {
      window.removeEventListener("scroll", InfinityScroll);
      window.removeEventListener("wheel", InfinityScroll);
    };
  }, []);

  return (
    <PhotoContext.Provider
      value={{
        photos,
        photoSelected,
        error,
        loading,
        handleChangeModalPhoto,
        PostComments,
        commentsSelected,
        handleDeletePhoto,
        handleChangePage,
        handleChangeComments,
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
