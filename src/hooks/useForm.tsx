import { ChangeEvent, useState } from "react";

interface TypesProps {
  type: string;
  regex: RegExp;
  message: string;
}

const types = new Array<TypesProps>(
  {
    type: "email",
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Preencha um email válido",
  },
  {
    type: "password",
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message:
      "A senha precisa ter 1 caracter maiusculo, 1 minúsculo e 1 digito. Com no mínimo 8 caracteres.",
  }
);

const useForm = (type: string | false) => {
  console.log(types);
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  function validate(value: string) {
    const tp = types.find((tp) => tp.type === type);
    if (type === false) return true;
    if (value.length === 0) {
      setError("Preencha um valor");
      return false;
    } else if (tp && !tp.regex.test(value)) {
      setError(tp.message);
    } else {
      setError(null);
      return true;
    }
  }
  function onChange({ target }: ChangeEvent<HTMLInputElement>) {
    if (error) {
      validate(target.value);
    }
    setValue(target.value);
  }

  return {
    value,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
