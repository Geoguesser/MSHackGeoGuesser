import React from "react";
import Button from "./Button";
import { useAuth } from "../hooks/auth";

import "../style/login-form.scss";

function LoginForm(props) {
  const [name, setName] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const { login } = useAuth();

  const changeName = e => {
    setName(e.currentTarget.value);
  };

  const loginUser = () => {
    setDisabled(true);
    login(name, res => {
      if (res && res.error === "NameNotAvailable") {
        alert("Name is not available, please enter again.");
        this.setState({ name: "" });
      }
    });
  };

  return (
    <>
      <div className="name-input-container">
        <label htmlFor="name-input" className="visuallyhidden">
          Enter name
        </label>
        <input
          type="text"
          id="name-input"
          value={name}
          onChange={changeName}
          placeholder="Enter your name"
        />
      </div>

      <div className="login-button-container">
        <Button icon="🛫" iconName="airplane" onClick={loginUser} disabled={disabled}>
          Let's go
        </Button>
      </div>
    </>
  );
}

export default LoginForm;
