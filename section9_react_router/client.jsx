import React from "react";
import { createRoot } from "react-dom/client";
import Games from "./Games";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Games />
  </React.StrictMode>
);
