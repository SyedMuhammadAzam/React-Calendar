import React from "react";
import { useState } from "react";
import Child from "./Child";

const Parent = () => {
  const [show, setShow] = useState([]);
  const addHandler = (enteredText) => {
    setShow((prev) => {
      const updated = [...prev ];
      updated.unshift({ text: enteredText });
      return updated;
    });
  };
  console.log(show);

  return (
    <div>
      <Child onPass={addHandler} />
    </div>
  );
};

export default Parent;
