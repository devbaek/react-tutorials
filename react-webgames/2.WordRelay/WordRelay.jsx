const React = require("react");
const { useState, useRef } = React;

const WordRelay = () => {
  const [word, setWord] = useState("하하하");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputEl = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult("correct");
      setValue("");
      setWord(value);
      inputEl.current.focus();
    } else {
      setResult("wrong");
      setValue("");
      inputEl.current.focus();
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputEl}
          value={value}
          onChange={onChangeInput}
        />
        <button>submit</button>
      </form>
      <div id="result">{result}</div>
    </>
  );
};

module.exports = WordRelay;
