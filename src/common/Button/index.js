import React from "react";
import classNames from "classnames";
import styles from "./button.module.css";

const SIZE = {
  SMALL: "small",
  LARGE: "large"
};

export function Button({ children, onClick, size, isFullWidth = false }) {
  console.log(styles);
  const className = classNames(styles["btn"], {
    [styles["btn--small"]]: size === SIZE.SMALL,
    [styles["btn--large"]]: size === SIZE.LARGE,
    [styles["btn--full"]]: isFullWidth
  });
  // sizes

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
