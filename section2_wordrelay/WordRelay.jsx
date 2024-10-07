const React = require("react");
const { useState, useRef } = React;

const WordRelay = () => {
  const [word, setWord] = useState("react");
  const [wrongMsg, setWrongMsg] = useState("");
  const inputRef = useRef(null);

  handleFormSubmit = (e) => {
    e.preventDefault();

    if (e.target.children.inputWord.value === "") {
      inputRef.current.focus();
      return;
    }
    if (e.target.children.inputWord.value.at(0) === word.at(-1)) {
      setWord(e.target.children.inputWord.value);
      e.target.children.inputWord.value = "";
      setWrongMsg("");
    } else {
      setWrongMsg(
        `${e.target.children.inputWord.value} does not start with ${word.at(
          -1
        )}`
      );
      e.target.children.inputWord.value = "";
    }
    inputRef.current.focus();
  };

  return (
    <>
      <h2>{word}</h2>
      <form onSubmit={handleFormSubmit}>
        <input ref={inputRef} id="inputWord" />
        <button>Submit</button>
      </form>
      <h3>{wrongMsg}</h3>
    </>
  );
};

module.exports = WordRelay;
