import React from "react";
import styles from "./spinner.module.css";
import classnames from "classnames";

function Spinner({ fullpage }) {
  function getClassName(spinnerNum) {
    return classnames(styles["loader"], {
      [styles["loader--start"]]: spinnerNum === 1,
      [styles["loader--mid"]]: spinnerNum === 2,
      [styles["loader--end"]]: spinnerNum === 3
    });
  }

  return (
    <div className={fullpage ? styles["loader--fullpage"] : null}>
      <div className={getClassName(1)} />
      <div className={getClassName(2)} />
      <div className={getClassName(3)} />
    </div>
  );
}

export { Spinner };
