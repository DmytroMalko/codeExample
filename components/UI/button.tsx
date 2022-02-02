import styles from "./button.module.scss";
import React from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void | Promise<void>;
  state?: "default" | "primary";
  type?: "button" | "submit";
};

const Button = ({
  children,
  className,
  disabled,
  onClick,
  state = "default",
  type = "button",
}: Props &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >) => {
  const changeHandler = !onClick
    ? undefined
    : (event: React.MouseEvent<HTMLElement>) => {
        onClick(event);
      };
  return (
    <button
      className={[
        className,
        styles[`button-${state}`],
        disabled && styles.disabled,
        styles.button,
      ]
        .filter((item) => Boolean(item))
        .join(" ")}
      disabled={disabled}
      onClick={changeHandler}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
