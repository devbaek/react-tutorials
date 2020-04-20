const React = require("react");
const { Component } = React;

class WordRelay extends Component {
  state = {
    text: 'Hello React',
  };

  render() {
    return (
      <h4>
        {this.state.text}
      </h4>
    )
  }
}

module.exports = WordRelay;
