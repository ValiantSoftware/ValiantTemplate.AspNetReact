import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";

const container = document.getElementById("app") as HTMLElement;
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
