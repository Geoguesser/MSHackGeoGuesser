import React, { useState } from "react";
import Button from "./Button";
import { getUser as getUsernameFromLocalStorage } from "../utils/auth";

import "../style/welcome.scss";

let retryInterval;

// handle race condition with login cookie setting at same time as this page loads
const Welcome = props => {
  const [username, setUsername] = useState(null);

  retryInterval = setInterval(() => {
    if (username === null) {
      setUsername(getUsernameFromLocalStorage());
    } else {
      clearInterval(retryInterval);
    }
  }, 10);

  return (
    <>
      <div className="welcome-name-container">
        <h1 className="heading1">{username === null ? "Loading...." : `Welcome, ${username}`}</h1>
      </div>
      <div className="welcome-button-container">
        <Button icon="🗺️" iconName="Map" onClick={() => props.history.push("/game")}>
          Play game
        </Button>
      </div>
    </>
  );
};

export default Welcome;
