import * as React from "react";
import "./TodoItem.css";
import EditSaveAndDeleteForm from "./EditSaveAndDeleteForm";

const TodoItem = (props) => {
  const [isHovering, setIsHovering] = React.useState(false);

  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <li
      className="grid mt-3"
      style={{
        gridTemplateColumns: "1fr auto",
        alignItems: "baseline",
      }}
    >
      {isEditing ? (
        <EditSaveAndDeleteForm
          todo={props.todo}
          onEdit={(newTodoText) => {
            if (newTodoText.trim().length === 0) {
              props.onDelete();
            } else {
              props.onEdit(newTodoText);
              setIsEditing(false); //exit editing state, users no longer editing the todo
            }
          }}
        />
      ) : (
        <React.Fragment>
          <div
            className="flex"
            style={{
              alignItems: "baseline",
            }}
          >
            <button className="button" onClick={props.onToggle}>
              {props.todo.completed ? (
                <span role="img" aria-label="Completed">
                  ✅
                </span>
              ) : (
                <span role="img" aria-label="Not completed">
                  🙅‍♀️
                </span>
              )}
            </button>
            <p
              className="todo-font text-3xl text-gray-800"
              style={{
                display: "inline",
                marginRight: 20,
                wordBreak: "break-word",
              }}
            >
              {props.todo.todoText}
            </p>
          </div>

          <div
            className="flex"
            style={{
              justifyContent: "flex-end",
            }}
            onMouseLeave={() => setIsHovering(false)}
          >
            {isHovering ? (
              <React.Fragment>
                <button
                  className="button"
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  <span role="img" aria-label="Edit">
                    Edit
                  </span>
                </button>
                <button
                  className="button"
                  onClick={() => {
                    props.onDelete();
                  }}
                >
                  <span role="img" aria-label="Delete">
                    Delete
                  </span>
                </button>
              </React.Fragment>
            ) : (
              <button
                className="button"
                onMouseEnter={() => setIsHovering(true)}
              >
                ...
              </button>
            )}
          </div>
        </React.Fragment>
      )}
    </li>
  );
};

export default TodoItem;
