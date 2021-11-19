import { AxiosResponse } from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../context/UserContext";
import useForm from "../../hooks/useForm";
import { UserPostImageProps } from "../../objectType";
import PhotoServices from "../../services/PhotoServices";
import Button from "../Button";
import Input from "../Input";
import styles from "./UserPhotoPost.module.css";
const UserPhotoPost = () => {
  const name = useForm(false);
  const weight = useForm("number");
  const age = useForm("number");
  const [img, setImg] = useState<UserPostImageProps | null>(null);
  const { loading, handleSetLoading } = useUser();
  const navigate = useNavigate();
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSetLoading(true);
    const formData = new FormData();
    if (img?.raw) {
      formData.append("img", img.raw);
    }
    formData.append("nome", name.value);
    formData.append("peso", weight.value);
    formData.append("idade", age.value);
    await PhotoServices.addPhoto(formData)
      .then((response: AxiosResponse) => {
        if (response.data) {
          navigate("/user");
        }
      })
      .finally(() => {
        handleSetLoading(false);
      });
  }
  async function handleImgChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImg({
        preview: URL.createObjectURL(file),
        raw: file,
      });
    }
  }
  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" {...name} />
        <Input label="Peso" type="number" name="peso" {...weight} />
        <Input label="Idade" type="number" name="idade" {...age} />
        <input type="file" name="img" id="img" onChange={handleImgChange} />
        {loading ? (
          <Button disabled={true}>Enviando</Button>
        ) : (
          <Button>Enviar</Button>
        )}
      </form>
      <div>
        {img?.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url(${img.preview})` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
