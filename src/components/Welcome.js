import React from "react";
import { Button } from "../common";
import { useAuth } from "../hooks/auth";

import "../style/welcome.scss";

function Welcome(props) {
  const { user } = useAuth();
  return (
    <>
      <div className="welcome-name-container">
        <h1 className="heading1">Hello, {user}!</h1>
      </div>
      <div className="welcome-button-container">
        <Button onClick={() => props.history.push("/game")}>Play game</Button>
      </div>
    </>
  );
}

export default Welcome;
