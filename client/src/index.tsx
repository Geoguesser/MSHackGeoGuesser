/* eslint-disable */

require("dotenv").config();
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/global.css";
import "./styles/variables.css";

declare global {
  interface Window {
    PlayFabClientSDK: any;
    PlayFab: any;
    gapi: any;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
