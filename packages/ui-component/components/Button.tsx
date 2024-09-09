import React from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  title: string;
  type: "button" | "submit";
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ title, type, onClick = () => {} }) => {
  return (
    <button type={type} onClick={onClick} className={styles.button}>
      {title}
    </button>
  );
};

export default Button;
