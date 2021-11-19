import { AxiosError } from "axios";
import { FormEvent, useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../context/UserContext";
import useForm from "../../hooks/useForm";
import { ErrorResponse } from "../../objectType";
import { UserServices } from "../../services/UserServices";
import Button from "../Button";
import Input from "../Input";

const Register = () => {
  const username = useForm("username");
  const email = useForm("email");
  const password = useForm("password");
  const confirm_password = useForm("password");
  const { userLogin } = useUser();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (email.validate() && password.validate()) {
      UserServices.addUser({
        username: username.value,
        email: email.value,
        password: password.value,
      })
        .then(() => {
          userLogin({ username: username.value, password: password.value });
        })
        .catch((error: AxiosError) => {
          const err = error.response?.data as ErrorResponse;
          console.log(err.message);
        });
    }
  }

  return (
    <section className="animeleft">
      <h1 className="title"> Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" name="username" {...username} />
        <Input label="E-mail" name="usuario" {...email} />
        <Input label="Senha" name="password" {...password} type="password" />
        <Input
          label="Confirme a senha"
          name="confirm-password"
          {...confirm_password}
          type="password"
        />

        <Button
          disabled={
            !username && !email && !password && !confirm_password ? true : false
          }
        >
          Cadastre-se
        </Button>
      </form>
    </section>
  );
};

export default Register;
