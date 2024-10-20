import React from "react";
import { createRoot } from "react-dom/client";
import TicTacToe from "./TicTacToe";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <TicTacToe />
  </React.StrictMode>
);
