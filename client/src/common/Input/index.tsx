import React from "react";
import classnames from "classnames";
import styles from "./input.module.css";

interface InputProps {
  label: string;
  type?: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  center: boolean;
}

function Input({ label, type = "text", id, value, onChange, center }: InputProps): JSX.Element {
  const [active, setActive] = React.useState<boolean>(false);

  const labelClasses: string = classnames(styles["label"]);
  const inputClasses: string = classnames(styles["input"]);
  const containerClasses: string = classnames(styles["input-container"], {
    [styles["input-container--active"]]: active,
    [styles["input-container--center"]]: center
  });
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
