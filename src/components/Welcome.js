import React from "react";
import Button from "./Button";
import { useAuth } from "../context/auth";

import "../style/welcome.scss";

function Welcome(props) {
  const { user } = useAuth();
  return (
    <>
      <div className="welcome-name-container">
        <h1 className="heading1">Hello, {user}!</h1>
      </div>
      <div className="welcome-button-container">
        <Button icon="🗺️" iconName="Map" onClick={() => props.history.push("/game")}>
          Play game
        </Button>
      </div>
    </>
  );
}

export default Welcome;
