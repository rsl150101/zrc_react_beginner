const React = require("react");
const { memo } = React;
const Try = memo(({ pitch }) => {
  return (
    <li>
      <h3>
        {pitch.num} {pitch.result}
      </h3>
    </li>
  );
});

Try.displayName = "Try";

module.exports = Try;
