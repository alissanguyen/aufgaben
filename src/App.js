import React from "react";
import "./tailwind.output.css";
import AddTodoForm from "./components/AddTodoForm";
import ToggleAllButton from "./components/ToggleAllButton";
import TodoList from "./components/TodoList";
import useLocalStorageState from "./hooks/useLocalStorageState";
import { pluralize } from "./utils/pluralize";

// todoId: {
//   content: todoId,
//   state: incomplete | completed
// }\

// type AufgabenTodo = Record<String, {content: String, isCompleted: boolean, dueDate: Date }>

/**
 * git checkout -b migrate-to-object-format
 */

function App() {
  const [
    completedTodosShouldBeHidden,
    setCompletedTodosShouldBeHidden,
  ] = React.useState(false);
  const [todos, setTodos] = useLocalStorageState("todos", {});

  function toggleAll() {
    const totalTodos = Object.values(todos).length;

    setTodos((prevTodos) => {
      /**
       * Counting how many are completed;
       */
      let totalCompleted = 0;

      for (const key in prevTodos) {
        const todo = prevTodos[key];
        totalCompleted += todo.completed ? 1 : 0;
      }

      /**
       * If all are completed, set them all false;
       * If none or any less than all are completed, set them all true
       */
      const newCompletedValue = totalCompleted !== totalTodos;
      for (const key in prevTodos) {
        const todo = prevTodos[key];
        todo.completed = newCompletedValue;
      }

      return { ...prevTodos };
    });
  }

  function toggleOne(id) {
    setTodos((prevTodos) => {
      const todoToChange = prevTodos[id];
      if (todoToChange) {
        todoToChange.completed = !todoToChange.completed;
        return { ...prevTodos };
      } else {
        return prevTodos;
      }
    });
  }

  function editOne(id, newTodoText) {
    setTodos((prevTodos) => {
      const todoToChange = prevTodos[id];
      if (todoToChange) {
        todoToChange.todoText = newTodoText;
        return { ...prevTodos };
      } else {
        return prevTodos;
      }
    });
  }

  function deleteOne(id) {
    setTodos((prevTodos) => {
      delete prevTodos[id];
      return { ...prevTodos };
    });
  }

  const sortedTodos = Object.values(todos).sort((a, b) => {
    if (a.completed) {
      return 1;
    } else if (b.completed) {
      return -1;
    } else {
      return 0;
    }
  });

  const onlyUncompletedTodos = sortedTodos.filter(
    (todo) => todo.completed === false
  );
  const onlyCompletedTodos = sortedTodos.filter(
    (todo) => todo.completed === true
  );

  return (
    <div
      style={{ margin: "auto" }}
      className="container flex-col max-w-screen-sm content-center"
    >
      <h1 className="aufgaben-hero-text text-lg text-6xl text-center">
        Aufgaben
      </h1>

      <div style={{ padding: "0px" }} className="flex mb-3">
        <AddTodoForm
          onNewTodo={(newTodo) => {
            setTodos((prev) => {
              return {
                ...prev,
                [newTodo.id]: newTodo,
              };
            });
          }}
        />
        {sortedTodos.length > 0 ? (
          <ToggleAllButton onToggleAll={toggleAll} />
        ) : null}
      </div>

      <div>
        <button
          className="button"
          onClick={() => {
            setCompletedTodosShouldBeHidden((prev) => !prev);
          }}
        >
          {" "}
          {completedTodosShouldBeHidden ? "Show Completed" : "Hide Completed"}
        </button>

        <React.Fragment>
          <TodoList
            todos={
              completedTodosShouldBeHidden ? onlyUncompletedTodos : sortedTodos
            }
            onToggleSingleTodoItem={(id) => toggleOne(id)}
            onEditSingleTodoItem={(id, newTodoText) => editOne(id, newTodoText)}
            onDeleteSingleTodoItem={(id) => deleteOne(id)}
          />

          {completedTodosShouldBeHidden ? (
            <React.Fragment>
              <div
                style={{
                  display: "block",
                  height: 30,
                  backGroundColor: "gray",
                  width: "100%",
                }}
              >
                {generateHiddenTodosText(
                  onlyCompletedTodos.length,
                  onlyCompletedTodos.length === sortedTodos.length
                )}
              </div>
            </React.Fragment>
          ) : null}
        </React.Fragment>
      </div>
    </div>
  );
}

function generateHiddenTodosText(numItems, allCompleted) {
  if (allCompleted && numItems > 1) {
    return `All ${numItems} ${pluralize("item", "items", numItems)} completed.`;
  } else {
    return `${numItems} completed ${pluralize("item", "items", numItems)}`;
  }
}

export default App;
