import * as React from "react";
import classnames from "classnames";
import styles from "./button.module.css";
import { Link } from "react-router-dom";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?(e: React.MouseEvent<HTMLButtonElement>): void;
  to?: string;
}

function Button(props: ButtonProps) {
  const [hover, setHover] = React.useState<boolean>(false);
  const buttonClasses = classnames(styles["button"], {
    [styles["button-hovered"]]: hover
  });
  return props.to ? (
    <div onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
      <Link to={props.to} className={styles["link"]}>
        <button onClick={props.onClick} className={buttonClasses}>
          <span className={styles["text"]}>{props.children}</span>
        </button>
      </Link>
    </div>
  ) : (
    <div onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
      <button onClick={props.onClick} className={buttonClasses}>
        <span className={styles["text"]}>{props.children}</span>
      </button>
    </div>
  );
}

export { Button };
