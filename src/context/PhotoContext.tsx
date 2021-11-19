import { AxiosError, AxiosResponse } from "axios";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { PhotoSelectedProps, PostImageData } from "../objectType";
import PhotoServices from "../services/PhotoServices";

interface PhotoContextData {
  photos: PostImageData[] | null;
  photoSelected: PhotoSelectedProps | null;
  error: string;
  loading: boolean;
  handleChangeModalPhoto: (photo: PostImageData) => void;
}

const PhotoContext = createContext<PhotoContextData>({} as PhotoContextData);

interface PhotoProviderProps {
  children: ReactNode;
}

export const PhotoProvider = ({ children }: PhotoProviderProps) => {
  const [photos, setPhotos] = useState<PostImageData[] | null>(null);
  const [photoSelected, setPhotoSelected] = useState<PhotoSelectedProps | null>(
    null
  );
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

  async function handleChangeModalPhoto(photo: PostImageData) {
    await PhotoServices.getPhotoById(photo.id).then((result) => {
      if (result.data) {
        const data = result.data;
        setPhotoSelected(data);
      }
      console.log(result.data);
    });
  }

  return (
    <PhotoContext.Provider
      value={{
        photos,
        photoSelected,
        error,
        loading,
        handleChangeModalPhoto,
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
