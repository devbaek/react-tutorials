import React, { Component, createRef } from "react";
import TryClass from "./TryClass";

function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

class NumberBaseballClass extends Component {
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: [],
  };

  onSubmitForm = (e) => {
    const { value, answer, tries } = this.state;
    e.preventDefault();
    if (value === answer.join("")) {
      this.setState((prevState) => {
        return {
          result: "Home Run!",
          tries: [...prevState.tries, { try: value, result: "Home Run" }],
        };
      });
      alert("Home Run!!");
      this.setState({
        tries: [],
        value: "",
        answer: getNumbers(),
      });
    } else {
      const answerArray = value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        this.setState({
          result: `Game Over...the answer was ${answer.join(",")}`,
        });
        alert("Game Restart");
        this.setState({
          value: "",
          answer: getNumbers(),
          tries: [],
        });
      } else {
        for (let i = 0; i < 4; i += 4) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState((prevState) => {
          return {
            tries: [
              ...prevState.tries,
              { try: value, result: `${strike} Strike, ${ball} Ball` },
            ],
            value: "",
          };
        });
        this.inputRef.current.focus();
      }
    }
  };

  onChangeInput = (e) => {
    console.log(this.state.answer);
    this.setState({
      value: e.target.value,
    });
  };

  inputRef = createRef();

  render() {
    const { result, value, tries } = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            ref={this.inputRef}
            type="number"
            maxLength={4}
            value={value}
            onChange={this.onChangeInput}
          />
        </form>
        <div>try: {tries.length}</div>
        <ul>
          {tries.map((v, i) => {
            return <TryClass key={`${i + 1}차 시도 : `} tryInfo={v} />;
          })}
        </ul>
      </>
    );
  }
}

export default NumberBaseballClass;
