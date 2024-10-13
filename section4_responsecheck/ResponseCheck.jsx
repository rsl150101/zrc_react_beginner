const React = require("react");
const { useState, useRef } = React;

const ResponseCheck = () => {
  const [screen, setScreen] = useState("waiting");
  const [message, setMessage] = useState("Click start");
  const [result, setResult] = useState([]);
  const timeoutRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);

  const handleScreenClick = () => {
    if (screen === "waiting") {
      timeoutRef.current = setTimeout(() => {
        setScreen("now");
        setMessage("Now!");
        startTimeRef.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
      setScreen("ready");
      setMessage("Click when background color is green");
    } else if (screen === "ready") {
      clearTimeout(timeoutRef.current);
      setScreen("waiting");
      setMessage("Too fast! Click when background color is green");
    } else if (screen === "now") {
      endTimeRef.current = new Date();
      setScreen("waiting");
      setMessage("Click start");
      setResult((prevResult) => [
        ...prevResult,
        endTimeRef.current - startTimeRef.current,
      ]);
    }
  };

  renderAverage = () => {
    if (result.length === 0) {
      return 0;
    } else {
      return result.reduce((a, c) => a + c, 0) / result.length;
    }
  };

  handleResetBtn = () => {
    setResult([]);
  };

  return (
    <>
      <div className={`screen screen_${screen}`} onClick={handleScreenClick}>
        <h3>{message}</h3>
      </div>
      <h2>Average : {renderAverage()} ms</h2>
      <button onClick={handleResetBtn}>Reset</button>
    </>
  );
};

module.exports = ResponseCheck;
