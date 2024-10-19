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
  return chosen;
};

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(),
  };
  render() {
    const { winNumbers } = this.state;

    return (
      <>
        <h1>Lotto Number</h1>
        <div>
          {winNumbers.map((v, i) => {
            if (i < 6) return <big key={i}> {v} </big>;
          })}
        </div>
        <h1>Bonus Number</h1>
        <big>{winNumbers[6]}</big>
      </>
    );
  }
}

export default Lotto;
