const { createRoot } = require("react-dom/client");
const React = require("react");
const NumberBaseball = require("./NumberBaseball");

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NumberBaseball />
  </React.StrictMode>
);
