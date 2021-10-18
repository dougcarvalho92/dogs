import React, { FormEvent } from "react";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import api from "../../services/api";
import { TokenServices } from "../../services/TokenServices";
import Button from "../Button";
import Head from "../Head";
import Input from "../Input";

// import { Container } from './styles';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await TokenServices.getToken({
      username: username.value,
      password: password.value,
    }).then((res) => {
      const token = res.data.token;
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", token);
      }
    });
  }

  return (
    <section className="animeLeft">
      <Head title="Login" />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" name="usuario" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button>Entrar</Button>
      </form>
      <Link to="/auth/register">Cadastro</Link>
    </section>
  );
};

export default LoginForm;
