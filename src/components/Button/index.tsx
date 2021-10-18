import React, { ButtonHTMLAttributes, ReactNode } from "react";

import "./style.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button {...props} className="button">
      {children}
    </button>
  );
};

export default Button;
