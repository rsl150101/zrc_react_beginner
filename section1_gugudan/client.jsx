const { createRoot } = require("react-dom/client");
const React = require("react");
const GuGuDan = require("./GuGuDan.jsx");

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GuGuDan />
  </React.StrictMode>
);
