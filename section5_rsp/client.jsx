const React = require("react");
const { createRoot } = require("react-dom/client");
const RSP = require("./RSP");

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RSP />
  </React.StrictMode>
);
