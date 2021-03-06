import * as React from "react";
import { INPUT_CLASSNAME } from "../constants";
import { v4 } from "uuid";
import { createDefaultTodo } from "../utils/validation";

const AddTodoForm = (props) => {
  const [newTodoText, setNewTodoText] = React.useState("");

  const addNewTodo = () => {
    props.onNewTodo({
      ...createDefaultTodo(v4()),
      todoText: newTodoText,
    });
    /**
     * clear the input  value after you click the add todo button.
     */
    setNewTodoText("");
  };
  return (
    <form
      style={{ flex: "1" }}
      onSubmit={(e) => {
        e.preventDefault();
        if (newTodoText !== "") {
          addNewTodo();
        }
      }}
    >
      <input
        placeholder="Enter a new todo"
        className={INPUT_CLASSNAME}
        type="text"
        value={newTodoText}
        onChange={(e) => {
          setNewTodoText(e.target.value);
        }}
      />
    </form>
  );
};

export default AddTodoForm;
