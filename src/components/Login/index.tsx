import React, { FormEvent } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Error from "../../helpers/Error/Error";
import useForm from "../../hooks/useForm";

import Button from "../Button";
import Head from "../Head";
import Input from "../Input";

import "./style.css";

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
      <h1 className="title">Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        <Input label="Usuário" name="usuario" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button disabled={loading}>
          {loading ? "Carregando..." : "Entrar"}
        </Button>
        {error && <Error message={error} />}
      </form>
      <Link className="lost-password" to="/auth/lost">
        Perdeu a senha?
      </Link>
      <div className="register">
        <h2 className="subtitle">Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site</p>
        <Link to="/auth/register">
          <Button>Cadastro</Button>
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
