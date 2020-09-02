import * as React from 'react';
import { BUTTON_CLASSNAME } from '../constants';
import EditSaveAndDeleteForm from './EditSaveAndDeleteForm';

const TodoItem = (props) => {

  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <li className="grid mt-3" style={{
      gridTemplateColumns: '1fr auto',
      alignItems: 'center'
    }} >
      {
        isEditing ? (
          <EditSaveAndDeleteForm todo={props.todo} onEdit={(newTodoText) => {
            if (newTodoText.trim().length === 0) {
              props.onDelete()
            } else {
              props.onEdit(newTodoText);
              setIsEditing(false) //exit editing state, users no longer editing the todo
            }
          }} />
        ) : (
            <React.Fragment>
              <div>
                <button className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mr-3`} onClick={props.onToggle}>
                  {
                    props.todo.completed ? <span role="img" aria-label="Completed">✅</span> : <span role="img" aria-label="Not completed">🙅‍♀️</span>
                  }
                </button>
                <p style={{ display: 'inline', marginRight: 20, wordBreak: 'break-all', fontSize: '1.4rem' }}>{props.todo.todoText}</p>
              </div>
              <div className="flex" style={{
                justifyContent: 'flex-end'
              }}>
                <div>
                  <button className={BUTTON_CLASSNAME + " mr-2"} onClick={() => { setIsEditing(true) }}>
                    <span role="img" aria-label="Edit">🖊️</span>
                  </button>
                </div>
                <button className={BUTTON_CLASSNAME} onClick={() => { props.onDelete() }}>
                  <span role="img" aria-label="Delete">❌</span>
                </button>
              </div>
            </React.Fragment>
          )
      }
    </li >
  )
}


export default TodoItem