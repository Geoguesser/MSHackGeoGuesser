/* eslint-disable */

require("dotenv").config();
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./contexts/auth";
import * as serviceWorker from "./serviceWorker";
import "./common/styles/variables.css";
import "./common/styles/global.css";
import "./style/index.scss";
// import "./common/styles/base.css";

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
