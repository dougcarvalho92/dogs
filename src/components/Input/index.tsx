import React, { InputHTMLAttributes } from "react";

import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
}

const Input = (props: InputProps) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={props.name} className={styles.label}>
        {props.label}
      </label>
      <input id={props.name} {...props} className={styles.input} />
      {props.error && <p className={styles.error}>{props.error}</p>}
    </div>
  );
};

export default Input;
