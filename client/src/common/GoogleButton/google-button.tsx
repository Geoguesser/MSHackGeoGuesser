import React from "react";
import classnames from "classnames";
import { GoogleIconDarkNormal } from "./icons";
import styles from "./google-button.module.css";

interface GoogleButtonProps {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  animationTime?: number;
}

function GoogleButton({ onClick, animationTime }: GoogleButtonProps) {
  const [active, setActive] = React.useState<boolean>(false);
  const [hover, setHover] = React.useState<boolean>(false);
  const buttonStyles = classnames(styles["button"], {
    [styles["button-active"]]: active,
    [styles["button-hover"]]: hover && !active
  });

  const setActiveClass = () => {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, animationTime || 200);
  };

  const onClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setTimeout(() => {
      onClick(e);
    }, animationTime || 200);
  };

  return (
    <div
      className={buttonStyles}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      onMouseDown={setActiveClass}
      onClick={onClickHandler}
    >
      <div className={styles["icon-wrapper"]}>
        <GoogleIconDarkNormal />
      </div>
      <span>Sign in with Google</span>
    </div>
  );
}

export { GoogleButton };
