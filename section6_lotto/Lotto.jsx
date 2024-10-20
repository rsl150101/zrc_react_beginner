import React, { Component } from "react";

const getWinNumbers = () => {
  const candidate = Array(45)
    .fill()
    .map((_, i) => i + 1);
  const chosen = [];
  while (candidate.length > 38) {
    chosen.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const winNumbers = chosen.slice(0, 6).sort((p, c) => p - c);
  const bonusNumber = chosen[chosen.length - 1];
  return [...winNumbers, bonusNumber];
};

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null,
    redo: false,
  };

  timeouts = [];

  runTimeouts = () => {
    const { winNumbers } = this.state;
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => ({
          winBalls: [...prevState.winBalls, winNumbers[i]],
        }));
      }, (i + 1) * 1000);
    }
    this.timeouts[winNumbers.length - 1] = setTimeout(() => {
      this.setState({ bonus: winNumbers[winNumbers.length - 1], redo: true });
    }, winNumbers.length * 1000);
  };

  componentDidMount() {
    this.runTimeouts();
  }

  componentDidUpdate() {
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
  }

  componentWillUnmount() {
    this.timeouts.forEach((t) => {
      clearTimeout(t);
    });
  }

  handleRedoBtn = () => {
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  };

  render() {
    const { winBalls, redo, bonus } = this.state;

    return (
      <>
        <h1>Lotto Number</h1>
        <div>
          {winBalls.map((v) => (
            <big key={`win_number_${v}`}> {v} </big>
          ))}
        </div>
        <h1>Bonus Number</h1>
        <big>{bonus}</big>
        <div>{redo && <button onClick={this.handleRedoBtn}>Redo</button>}</div>
      </>
    );
  }
}

export default Lotto;
