import * as React from 'react';
import TodoItem from './TodoItem';


const TodoList = (props) => {

  const sortedTodos = props.todos.sort((a, b) => {
    if (a.completed) {
      return 1
    } else {
      return -1
    }
  })

  return (
    <ul>
      {
        sortedTodos.map((todo) => {
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