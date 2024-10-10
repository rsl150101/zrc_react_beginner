const React = require("react");
const { createRoot } = require("react-dom/client");
const ResponseCheck = require("./ResponseCheck");

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ResponseCheck />
  </React.StrictMode>
);
