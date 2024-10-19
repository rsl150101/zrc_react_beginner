import React from "react";
import { createRoot } from "react-dom/client";
import Lotto from "./Lotto";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Lotto />
  </React.StrictMode>
);
