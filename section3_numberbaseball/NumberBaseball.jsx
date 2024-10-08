const React = require("react");
const { useState, useRef } = React;
const Try = require("./Try");

const getNumbers = () => {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

const NumberBaseball = () => {
  const [inputNum, setInputNum] = useState("");
  const [answer, setAnswer] = useState(getNumbers);
  const [tries, setTries] = useState([]);
  const [chance, setChance] = useState(10);
  const [gameover, setGameover] = useState(false);
  const inputRef = useRef(null);

  handleInputChange = (e) => {
    setInputNum(e.target.value);
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    if (gameover) {
      setInputNum("");
      setAnswer(getNumbers());
      setTries([]);
      setChance(10);
      setGameover(false);
      return;
    }
    if (inputNum === "" || inputNum.length < 4) {
      inputRef.current.focus();
      return;
    }
    setChance((prevChance) => (prevChance -= 1));
    if (inputNum === answer.join("")) {
      setTries((prevTries) => [
        ...prevTries,
        { num: inputNum, result: "Home Run!" },
      ]);
      setGameover((prevGameover) => !prevGameover);
    } else if (chance === 1) {
      setTries((prevTries) => [
        ...prevTries,
        { num: inputNum, result: `Game Over! answer is ${answer.join("")}` },
      ]);
      setGameover((prevGameover) => !prevGameover);
    } else {
      const inputNumArr = inputNum.split("").map((n) => parseInt(n));
      let strike = 0;
      let ball = 0;
      for (let i = 0; i < 4; i += 1) {
        if (inputNumArr[i] === answer[i]) {
          strike += 1;
        } else if (answer.includes(inputNumArr[i])) {
          ball += 1;
        }
      }
      setTries((prevTries) => [
        ...prevTries,
        { num: inputNum, result: `${strike}S ${ball}B` },
      ]);
    }
    setInputNum("");
    inputRef.current.focus();
  };

  return (
    <>
      <h2>Your Chance : {chance}</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          ref={inputRef}
          value={inputNum}
          onChange={handleInputChange}
          disabled={gameover}
        />
        {gameover ? <button>Restart</button> : <button>Submit</button>}
      </form>
      <ol>
        {tries.map((v, i) => (
          <Try key={`${answer}_${i + 1}_${v.num}`} pitch={v} />
        ))}
      </ol>
    </>
  );
};

module.exports = NumberBaseball;
