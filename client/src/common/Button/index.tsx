import React from "react";
import classNames from "classnames";
import styles from "./button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  size?: SIZE;
  fullWidth?: boolean;
  disabled?: boolean;
}

enum SIZE {
  SMALL = "small",
  LARGE = "large"
}

export function Button({
  children,
  onClick,
  size,
  fullWidth = false,
  disabled = false
}: ButtonProps): JSX.Element {
  const className = classNames(styles["btn"], {
    [styles["btn--small"]]: size === SIZE.SMALL,
    [styles["btn--large"]]: size === SIZE.LARGE,
    [styles["btn--full"]]: fullWidth,
    [styles["btn--disabled"]]: disabled
  });
  // sizes

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
