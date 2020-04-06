import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { store } from "./store";

const app = <App />;

ReactDOM.render(
  <Provider store={store}>{app}</Provider>,
  document.getElementById("root")
);
