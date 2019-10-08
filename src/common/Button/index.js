import React from "react";
import classNames from "classnames";
import styles from "./button.module.css";

const SIZE = {
  SMALL: "small",
  LARGE: "large"
};

export function Button({ children, onClick, size, fullWidth = false, disabled = false, unstyled }) {
  let classes;
  if (unstyled) {
    classes = classNames(styles["btn"], styles["btn-unstyled"]);
  } else {
    classes = classNames(styles["btn"], {
      [styles["btn--small"]]: size === SIZE.SMALL,
      [styles["btn--large"]]: size === SIZE.LARGE,
      [styles["btn--full"]]: fullWidth,
      [styles["btn--disabled"]]: disabled
    });
  }
  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
