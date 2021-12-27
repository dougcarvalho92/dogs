import { AxiosError } from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Error from "../../helpers/Error/Error";
import useForm from "../../hooks/useForm";
import { UserServices } from "../../services/UserServices";
import Button from "../Button";
import Input from "../Input";

const LoginReset = () => {
  const [login, setLogin] = useState("");
  const [key, setKey] = useState("");
  const password = useForm("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");
    const login = params.get("login");
    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.validate()) {
      setLoading(true);
      UserServices.resetPassword(login, key, password.value)
        .then(() => {
          navigate("/login");
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
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nova senha"
          type="password"
          name="password"
          {...password}
        />
      </form>
      {loading ? (
        <Button disabled>Resetando...</Button>
      ) : (
        <Button>Resetar</Button>
      )}
      {error && <Error message={error} />}
    </div>
  );
};

export default LoginReset;
