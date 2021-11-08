import React, { FormEvent, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import useForm from "../../hooks/useForm";
import api from "../../services/api";
import { TokenServices } from "../../services/TokenServices";
import { UserServices } from "../../services/UserServices";
import Button from "../Button";
import Head from "../Head";
import Input from "../Input";

// import { Container } from './styles';

const LoginForm = () => {
  const username = useForm(false);
  const password = useForm(false);
  const userContext = useUser();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userContext.userLogin({
        username: username.value,
        password: password.value,
      });
    }
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
