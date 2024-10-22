import React from "react";
import { createRoot } from "react-dom/client";
import Minesweeper from "./Minesweeper";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Minesweeper />
  </React.StrictMode>
);
