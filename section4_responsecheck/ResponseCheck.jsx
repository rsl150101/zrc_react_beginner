const React = require("react");
const { Component } = React;

class ResponseCheck extends Component {
  state = {
    screen: "waiting",
    message: "Click start",
    result: [],
  };

  timeout;
  startTime;
  endTime;

  handleScreenClick = () => {
    const { screen } = this.state;

    if (screen === "waiting") {
      this.setState({
        screen: "ready",
        message: "Click when background color is green",
      });
      this.timeout = setTimeout(() => {
        this.setState({
          screen: "now",
          message: "Now!",
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (screen === "ready") {
      clearTimeout(this.timeout);
      this.setState({
        screen: "waiting",
        message: "Too fast! Click when background color is green",
      });
    } else if (screen === "now") {
      this.endTime = new Date();
      this.setState((prevState) => ({
        screen: "waiting",
        message: "Click start",
        result: [...prevState.result, this.endTime - this.startTime],
      }));
    }
  };

  renderAdverage = () => {
    const { result } = this.state;
    if (result.length === 0) {
      return 0;
    } else {
      return result.reduce((a, c) => a + c, result[0]) / result.length;
    }
  };

  handleResetBtn = () => {
    this.setState({ result: [] });
  };

  render() {
    const { screen, message } = this.state;
    return (
      <>
        <div
          className={`screen screen_${screen}`}
          onClick={this.handleScreenClick}
        >
          <h3>{message}</h3>
        </div>
        <h2>Adverage : {this.renderAdverage()} ms</h2>
        <button onClick={this.handleResetBtn}>Reset</button>
      </>
    );
  }
}

module.exports = ResponseCheck;
