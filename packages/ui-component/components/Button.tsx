import React from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  type = "button",
  disabled,
  onClick = () => {},
  children,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={styles.button}
    >
      {children}
    </button>
  );
};

export default Button;
