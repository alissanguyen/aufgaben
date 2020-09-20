import * as React from "react";
import { v4 } from "uuid";
import { createDefaultTodo } from "../utils/validation";

const validateTodosFromLocalStorage = (todos) => {
  if (todos === null || todos === undefined) {
    return {};
  }

  /**
   * For users on older versions, todos was an array of objects with a content property and a completed propert.
   */
  if (Array.isArray(todos)) {
    /**
     * Take the todos array they have in local storage and turn into the new data form which is Record<id, TodoItem>
     */
    return todos
      .filter((todo) => {
        // Filter out things that might corrupt our data
        return (
          typeof todo.todoText === "string" &&
          typeof todo.completed === "boolean"
        );
      })
      .reduce((acc, cur) => {
        const uniqueId = v4();

        acc[uniqueId] = {
          ...createDefaultTodo(uniqueId),
          ...cur,
        };

        return acc;
      }, {});
  } else {
    return todos;
  }

  /**
   * we want to return an object. If anything fails or doesn't pass validation, just return an empty object
   *
   * 1. We want to validate that it's not null or undefined
   * 2. We want to validate that it is an object that is not an array
   * 3. We want to keep only todos that have all the properties we need.
   *
   *
   * todoId {
   *  content: string;
   *  completed: boolean;
   *  dueDate: Date;
   * }
   */
};

const useLocalStorageState = (key, initialValue) => {
  const existentValueInLocalStorage =
    window.localStorage.getItem(key) &&
    JSON.parse(window.localStorage.getItem(key));

  const [state, setState] = React.useState(
    existentValueInLocalStorage === undefined ||
      existentValueInLocalStorage === null
      ? {}
      : validateTodosFromLocalStorage(existentValueInLocalStorage)
  );

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  const normalizedState = typeof state !== "object" ? {} : state;

  return [normalizedState, setState];
};

export default useLocalStorageState;
