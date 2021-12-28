import React, { FormEvent } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Error from "../../helpers/Error/Error";
import useForm from "../../hooks/useForm";

import Button from "../Button";
import Head from "../Head";
import Input from "../Input";

import styles from "./Login.module.css";

const Login = () => {
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
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário" name="usuario" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button disabled={loading}>
          {loading ? "Carregando..." : "Entrar"}
        </Button>
        {error && <Error message={error && "Dados incorretos"} />}
      </form>
      <Link className={styles.lostPassword} to="/auth/lost">
        Perdeu a senha?
      </Link>
      <div className={styles.register}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site</p>
        <Link to="/auth/register">
          <Button>Cadastro</Button>
        </Link>
      </div>
    </section>
  );
};

export default Login;
