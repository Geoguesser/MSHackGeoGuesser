/* eslint-disable */

require("dotenv").config();
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./contexts/auth";
import "./common/styles/variables.css";
import "./common/styles/global.css";
import "./style/index.scss";

declare global {
  interface Window {
    PlayFabClientSDK: any;
    PlayFab: any;
    gapi: any;
  }
}

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
