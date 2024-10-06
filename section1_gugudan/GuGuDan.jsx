const React = require("react");
const { useState, useRef } = React;

const GuGuDan = () => {
  const [firstNum, setFristNum] = useState(Math.ceil(Math.random() * 9));
  const [secondNum, setSecondNum] = useState(Math.ceil(Math.random() * 9));
  const [inputNum, setInputNum] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setInputNum(e.target.value);
  };

  const handleGuGuDanFormSubmit = (e) => {
    e.preventDefault();
    if (inputNum === "") {
      inputRef.current.focus();
      return;
    }
    if (parseInt(inputNum) === firstNum * secondNum) {
      setFristNum(Math.ceil(Math.random() * 9));
      setSecondNum(Math.ceil(Math.random() * 9));
      setResult("Correct!");
      setInputNum("");
    } else {
      setResult("Wrong!");
      setInputNum("");
    }
    inputRef.current.focus();
  };

  return (
    <>
      <h2>
        {firstNum} X {secondNum} = ?
      </h2>
      <form onSubmit={handleGuGuDanFormSubmit}>
        <input
          type="number"
          value={inputNum}
          onChange={handleInputChange}
          ref={inputRef}
        />
        <button>Submit</button>
      </form>
      <h3>{result}</h3>
    </>
  );
};

module.exports = GuGuDan;
