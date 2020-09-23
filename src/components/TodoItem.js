import * as React from "react";
import "./TodoItem.css";
import EditSaveAndDeleteForm from "./EditSaveAndDeleteForm";
import completeIcon from "./complete.png";
import incompleteIcon from "./incomplete.png";
import deleteIcon from "./delete.png";
import editIcon from "./edit.png";

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
            <button className="icon-button" onClick={props.onToggle}>
              {props.todo.completed ? (
                <img src={completeIcon} aria-label="Completed" alt="">
                </img>
              ) : (
                <img src={incompleteIcon} aria-label="Incompleted" alt="">
                </img>
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
            onBlur={() => setIsHovering(false)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {isHovering ? (
              <React.Fragment>
                <button
                  className="icon-button-hover"
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  <img src={editIcon} aria-label="Edit" alt="">
                </img>
                </button>
                <button
                  className="icon-button-hover"
                  onClick={() => {
                    props.onDelete();
                  }}
                >
                  <img src={deleteIcon} aria-label="Delete" alt="">
                </img>
                </button>
              </React.Fragment>
            ) : (
              <button
                className="button"
                onFocus={() => setIsHovering(true)}
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
