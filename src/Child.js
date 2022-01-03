import { useState } from "react";
import styles from "./Child.module.css";

const Component1 = (props) => {
  const [enteredName, setEnteredName] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    props.onPass(enteredName);
  };

  const inputChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };

  return (
    <form onSubmit={formSubmitHandler} className={styles.form}>
      <div>
        <label>Type Your Name</label>
        <input type="text" onChange={inputChangeHandler} />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};
export default Component1;
