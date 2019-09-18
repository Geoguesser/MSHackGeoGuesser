import React from "react";
import classnames from "classnames";
import styles from "./input.module.css";

function Input({ label, type = "text", id, value, onChange, center }) {
  const [active, setActive] = React.useState(false);

  const labelClasses = classnames(styles["label"]);
  const inputClasses = classnames(styles["input"]);
  const containerClasses = classnames(styles["input-container"], {
    [styles["input-container--active"]]: active,
    [styles["input-container--center"]]: center
  });
  if (!id) {
    console.warn("You must provide input component with an id prop");
  }
  return (
    <div className={containerClasses}>
      <input
        type={type}
        id={id}
        value={value}
        placeholder={label}
        onChange={onChange}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        className={inputClasses}
      />
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
    </div>
  );
}

export { Input };
