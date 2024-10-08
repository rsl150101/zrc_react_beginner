const React = require("react");
const { Component } = React;
const Try = require("./Try");

function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

class NumberBaseball extends Component {
  state = {
    inputNum: "",
    answer: getNumbers(),
    tries: [],
    result: "",
    chance: 10,
    gameover: false,
  };
  inputRef;
  handleInputRef = (cur) => {
    this.inputRef = cur;
  };
  handleInputChange = (e) => {
    this.setState({ inputNum: e.target.value });
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    const { inputNum, answer, gameover, chance } = this.state;
    if (gameover) {
      this.setState({
        inputNum: "",
        answer: getNumbers(),
        tries: [],
        result: "",
        chance: 10,
        gameover: false,
      });
      return;
    }
    if (inputNum === "" || inputNum.length < 4) {
      this.inputRef.focus();
      return;
    }
    this.setState((prevState) => ({
      chance: prevState.chance - 1,
    }));
    if (inputNum === answer.join("")) {
      this.setState((prevState) => ({
        tries: [...prevState.tries, { num: inputNum, result: "Home Run!" }],
        gameover: !prevState.gameover,
      }));
    } else if (chance === 1) {
      this.setState((prevState) => ({
        tries: [
          ...prevState.tries,
          { num: inputNum, result: `Game Over! answer is ${answer.join("")}` },
        ],
        gameover: !prevState.gameover,
      }));
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
      this.setState((prevState) => ({
        tries: [
          ...prevState.tries,
          { num: inputNum, result: `${strike}S ${ball}B` },
        ],
      }));
    }
    this.setState({ inputNum: "" });
    this.inputRef.focus();
  };
  render() {
    const { inputNum, gameover, chance, tries, answer } = this.state;

    return (
      <>
        <h2>Your Chance : {chance}</h2>
        <form onSubmit={this.handleFormSubmit}>
          <input
            ref={this.handleInputRef}
            value={inputNum}
            onChange={this.handleInputChange}
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
  }
}

module.exports = NumberBaseball;
