const React = require("react");
const { Component } = React;

const rspCoords = {
  scissors: "-140px",
  rock: "0",
  paper: "-287px",
};
class RSP extends Component {
  state = { result: "", imgCoord: "0", score: 0 };
  interval;
  componentDidMount() {
    this.interval = setInterval(() => {
      const { imgCoord } = this.state;
      if (imgCoord === rspCoords.scissors) {
        this.setState({ imgCoord: rspCoords.paper });
      } else if (imgCoord === rspCoords.rock) {
        this.setState({ imgCoord: rspCoords.scissors });
      } else if (imgCoord === rspCoords.paper) {
        this.setState({ imgCoord: rspCoords.rock });
      }
    }, 1000);
  }
  render() {
    const { imgCoord } = this.state;
    return (
      <>
        <div
          className="computer"
          style={{
            background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
          }}
        ></div>
      </>
    );
  }
}

module.exports = RSP;
