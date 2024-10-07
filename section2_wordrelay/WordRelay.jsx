const React = require("react");
const { Component } = React;

class WordRelay extends Component {
  state = {
    word: "리액트",
    inputWord: "",
    wrongMsg: "",
  };
  inputRef;

  handleInputChange = (e) => {
    this.setState({ inputWord: e.target.value });
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.inputWord === "") {
      this.inputRef.focus();
      return;
    }
    if (this.state.inputWord.at(0) === this.state.word.at(-1)) {
      this.setState({
        word: this.state.inputWord,
        inputWord: "",
        wrongMsg: "",
      });
    } else {
      this.setState({
        inputWord: "",
        wrongMsg: `${
          this.state.inputWord
        } does not start with ${this.state.word.at(-1)}`,
      });
    }
    this.inputRef.focus();
  };
  handleInputRef = (cur) => {
    this.inputRef = cur;
  };

  render() {
    return (
      <>
        <h2>{this.state.word}</h2>
        <form onSubmit={this.handleFormSubmit}>
          <input
            ref={this.handleInputRef}
            value={this.state.inputWord}
            onChange={this.handleInputChange}
          />
          <button>Submit</button>
        </form>
        <h3>{this.state.wrongMsg}</h3>
      </>
    );
  }
}

module.exports = WordRelay;
