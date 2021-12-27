import { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import Error from "../../helpers/Error/Error";
import useForm from "../../hooks/useForm";
import { UserServices } from "../../services/UserServices";
import Button from "../Button";
import Input from "../Input";

const LoginPasswordLost = () => {
  const email = useForm(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    if (email.validate()) {
      UserServices.lostPassword(email.value)
        .then((response) => {
          setResponse(response.data);
        })
        .catch((error: AxiosError) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  return (
    <section className="animeleft">
      <h1 className="title">Perdeu senha?</h1>
      {response ? (
        <p>{response}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label="Email / Usuário" type="text" name="email" {...email} />
          {loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
            <Button>Enviar</Button>
          )}
        </form>
      )}

      {error && <Error message={error} />}
    </section>
  );
};

export default LoginPasswordLost;
