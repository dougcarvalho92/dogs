import React, { FormEvent } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import useForm from "../../hooks/useForm";

import Button from "../Button";
import Head from "../Head";
import Input from "../Input";

const LoginForm = () => {
  const username = useForm(false);
  const password = useForm(false);
  const { userLogin, loading, error } = useUser();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin({
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
        <Button disabled={loading}>
          {loading ? "Carregando..." : "Entrar"}
        </Button>
        {error && <p>{error}</p>}
      </form>
      <Link to="/auth/register">Cadastro</Link>
    </section>
  );
};

export default LoginForm;
