import React, { InputHTMLAttributes } from "react";

import "./style.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
}

const Input = (props: InputProps) => {
  return (
    <div className="wrapper">
      <label htmlFor={props.name} className="label">
        {props.label}
      </label>
      <input id={props.name} {...props} className="input" />
      {props.error && <p className="error">{props.error}</p>}
    </div>
  );
};

export default Input;
