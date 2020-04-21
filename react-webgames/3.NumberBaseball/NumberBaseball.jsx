import React, { useState, useRef } from "react";
import Try from "./Try";

const getNumbers = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

const numberBaseball = () => {
  const [answer, setAnswer] = useState(getNumbers());
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [tries, setTries] = useState([]);
  const inputEl = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (value === answer.join("")) {
      setTries((t) => [
        ...t,
        {
          try: value,
          result: "Home Run!",
        },
      ]);
      setResult("Home Run");
      setValue("");
      setAnswer(getNumbers);
      setTries([]);
      alert("Game Restart");
      inputEl.current.focus();
    } else {
      const answerArray = value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setResult(`Game Over...the answer was ${answer.join(",")}`);
        alert("Game Restart");
        setValue("");
        setAnswer(getNumbers());
        setTries([]);
        inputEl.current.focus();
      } else {
        console.log('answer', answer.join(''));
        console.log('answerA', answer);
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setTries((t) => [
          ...t,
          {
            try: value,
            result: `${strike} Strike, ${ball} Ball`,
          },
        ]);
        setValue("");
        inputEl.current.focus();
      }
    }
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputEl}
          type="number"
          maxLength={4}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
      <div>try: {tries.length}</div>
      <ul>
        {tries.map((v, i) => {
          return <Try key={`${i + 1}차 시도 : `} tryInfo={v} />;
        })}
      </ul>
    </>
  );
};

export default numberBaseball;
