const React = require("react");

const Try = ({ pitch }) => {
  return (
    <li>
      <h3>
        {pitch.num} {pitch.result}
      </h3>
    </li>
  );
};

module.exports = Try;
