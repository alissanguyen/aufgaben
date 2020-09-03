import * as React from 'react';
import TodoItem from './TodoItem';


const TodoList = (props) => {
  return (
    <ul>
      {
        props.todos.map((todo, index) => {
          return <TodoItem todo={todo} key={index}
            onToggle={() => { props.onToggleSingleTodoItem(index) }}
            onEdit={(newTodoText) => { props.onEditSingleTodoItem(index, newTodoText) }}
            onDelete={() => { props.onDeleteSingleTodoItem(index) }} />
        })
      }
    </ul>
  )
}

export default TodoList