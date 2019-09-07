/* eslint-disable */

require("dotenv").config();
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AzureAD } from "react-aad-msal";
import * as serviceWorker from "./serviceWorker";
import "./style/index.scss";
import { authProvider } from "./utils/msalAuthProvider";

ReactDOM.render(
  <AzureAD provider={authProvider} forceLogin={true}>
    <App />
  </AzureAD>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
