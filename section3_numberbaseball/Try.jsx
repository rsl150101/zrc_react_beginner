const React = require("react");
const { Component } = React;

class Try extends Component {
  render() {
    return (
      <li>
        <h3>
          {this.props.pitch.num} {this.props.pitch.result}
        </h3>
      </li>
    );
  }
}

module.exports = Try;
