require("dotenv").config();
import React from "react"; // eslint-disable-line import/first
import ReactDOM from "react-dom"; // eslint-disable-line import/first
import App from "./App"; // eslint-disable-line import/first
import * as serviceWorker from "./serviceWorker"; // eslint-disable-line import/first
import "./style/index.scss"; // eslint-disable-line import/first

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
