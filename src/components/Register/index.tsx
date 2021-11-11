import { AxiosError } from "axios";
import React, { FormEvent, useContext } from "react";
import { useUser } from "../../context/UserContext";
import useForm from "../../hooks/useForm";
import { ErrorResponse } from "../../objectType";
import { UserServices } from "../../services/UserServices";
import Button from "../Button";
import Input from "../Input";

const Register = () => {
  const username = useForm(false);
  const email = useForm("email");
  const password = useForm("password");
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
        <Input label="Password" name="usuario" {...password} type="password" />
        <Button>Cadastre-se</Button>
      </form>
    </section>
  );
};

export default Register;
