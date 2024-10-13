const React = require("react");
const { Component } = React;

const rspCoords = {
  scissors: "-140px",
  rock: "0",
  paper: "-287px",
};

const score = {
  scissors: -1,
  rock: 0,
  paper: 1,
};

const getComputerRsp = (imgCoord) => {
  return Object.keys(rspCoords).find((key) => rspCoords[key] === imgCoord);
};

class RSP extends Component {
  state = { result: "", imgCoord: "0", score: 0, shoot: false };
  interval;

  changeHand = () => {
    const { imgCoord } = this.state;
    if (imgCoord === rspCoords.scissors) {
      this.setState({ imgCoord: rspCoords.paper });
    } else if (imgCoord === rspCoords.rock) {
      this.setState({ imgCoord: rspCoords.scissors });
    } else if (imgCoord === rspCoords.paper) {
      this.setState({ imgCoord: rspCoords.rock });
    }
  };

  componentDidMount() {
    this.interval = setInterval(this.changeHand, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleRspClickBtn = (chosen) => {
    this.setState((prevState) => ({ shoot: !prevState.shoot }));
    clearInterval(this.interval);
    const userChosen = score[chosen];
    const { imgCoord } = this.state;
    const computerChosen = score[getComputerRsp(imgCoord)];
    const diff = userChosen - computerChosen;

    if (diff === 0) {
      this.setState({ result: "Draw" });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => ({
        result: "Lose",
        score: prevState.score - 1,
      }));
    } else {
      this.setState((prevState) => ({
        result: "Win",
        score: prevState.score + 1,
      }));
    }
    setTimeout(() => {
      this.setState((prevState) => ({ shoot: !prevState.shoot }));
      this.interval = setInterval(this.changeHand, 100);
    }, 2000);
  };

  render() {
    const { imgCoord, result, score, shoot } = this.state;
    return (
      <>
        <div
          className="computer"
          style={{
            background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
          }}
        />
        <div>
          <button
            onClick={() => this.handleRspClickBtn("scissors")}
            disabled={shoot}
          >
            Scissors
          </button>
          <button
            onClick={() => this.handleRspClickBtn("rock")}
            disabled={shoot}
          >
            Rock
          </button>
          <button
            onClick={() => this.handleRspClickBtn("paper")}
            disabled={shoot}
          >
            Paper
          </button>
        </div>
        <div>
          <h2>{result}</h2>
        </div>
        <div>
          <h4>score : {score}</h4>
        </div>
      </>
    );
  }
}

module.exports = RSP;
