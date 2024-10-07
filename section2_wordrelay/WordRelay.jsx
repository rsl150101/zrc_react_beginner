const React = require("react");
const { useState, useRef } = React;

const WordRelay = () => {
  const [word, setWord] = useState("react");
  const [inputWord, setInputWord] = useState("");
  const [wrongMsg, setWrongMsg] = useState("");
  const inputRef = useRef(null);

  handleInputChange = (e) => {
    setInputWord(e.target.value);
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputWord === "") {
      inputRef.current.focus();
      return;
    }
    if (inputWord.at(0) === word.at(-1)) {
      setWord(inputWord);
      setInputWord("");
      setWrongMsg("");
    } else {
      setInputWord("");
      setWrongMsg(`${inputWord} does not start with ${word.at(-1)}`);
    }
    inputRef.current.focus();
  };

  return (
    <>
      <h2>{word}</h2>
      <form onSubmit={handleFormSubmit}>
        <input ref={inputRef} value={inputWord} onChange={handleInputChange} />
        <button>Submit</button>
      </form>
      <h3>{wrongMsg}</h3>
    </>
  );
};

module.exports = WordRelay;
