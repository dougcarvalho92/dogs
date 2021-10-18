import { ChangeEvent, useState } from "react";

const useForm = () => {
  const [value, setValue] = useState("");

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
  };

  return {
    value,
    onChange,
  };
};

export default useForm;
