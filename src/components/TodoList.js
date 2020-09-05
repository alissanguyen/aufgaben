import * as React from 'react';
import TodoItem from './TodoItem';


const TodoList = (props) => {

  return (
    <ul>
      {
        props.todos.map((todo) => {
          return <TodoItem todo={todo} key={todo.id}
            onToggle={() => { props.onToggleSingleTodoItem(todo.id) }}
            onEdit={(newTodoText) => { props.onEditSingleTodoItem(todo.id, newTodoText) }}
            onDelete={() => { props.onDeleteSingleTodoItem(todo.id) }} />
        })
      }
    </ul>
  )
}

export default TodoList