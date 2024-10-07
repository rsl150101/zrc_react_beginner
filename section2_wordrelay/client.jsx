const { createRoot } = require("react-dom/client");
const React = require("react");
const WordRelay = require("./WordRelay");

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WordRelay />
  </React.StrictMode>
);
