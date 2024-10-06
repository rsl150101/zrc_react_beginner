const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    app: ["./client.jsx"],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
  },
};
