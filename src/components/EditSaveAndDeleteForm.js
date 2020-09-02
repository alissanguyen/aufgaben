import * as React from 'react';
import { BUTTON_CLASSNAME, INPUT_CLASSNAME } from '../constants';

const EditSaveAndDeleteForm = (props) => {
  const [newTodoText, setNewTodoText] = React.useState(props.todo.todoText)

  return (
    <React.Fragment>
      <form className="flex" style={{
        width: '100%'
      }} onSubmit={(e) => {
        e.preventDefault();
        props.onEdit(newTodoText)
      }}>
        <input className={INPUT_CLASSNAME + " mr-3"} value={newTodoText} onChange={event => {
          setNewTodoText(event.target.value)
        }} />
        <button type="submit" className={BUTTON_CLASSNAME} >Save</button>
      </form>
    </React.Fragment>
  )
}

export default EditSaveAndDeleteForm