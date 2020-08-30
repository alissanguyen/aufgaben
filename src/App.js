import React from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = React.useState([])

  function toggleAll() {
    const totalTodos = todos.length;
    let totalCompleted = 0;
    const todoArray = [...todos]

    todoArray.forEach(function checkCompletion(todo) {
      if (todo.completed === true) {
        totalCompleted++;
      }
    });

    if (totalTodos === totalCompleted) {
      todoArray.forEach(element => (element.completed = false));
    } else {
      todoArray.forEach(element => (element.completed = true));
    }

    setTodos(todoArray);
  }

  function toggleOne(index) {
    const todoArray = [...todos]
    todoArray[index].completed = !todoArray[index].completed
    setTodos(todoArray)
  }
  return (
    <div>
      <h1>Todo List React</h1>
      <AddTodoForm onNewTodo={newTodo => {
        setTodos(prev => prev.concat(newTodo))
      }} />
      <ToggleAllButton onToggleAll={toggleAll} />

      <div>
        <button >Change Todo</button>
        <input id="locationOfTodo" type="number" />
        <input id="newTodoName" type="text" />
      </div>
      <TodoList todos={todos} onToggleSingleTodoItem={(index) => toggleOne(index)} />
    </div>

  );
}

const TodoList = (props) => {
  return (
    <ul>
      {props.todos.map((todo, index) => {
        return <TodoItem todo={todo} onToggle={() => {
          props.onToggleSingleTodoItem(index)
        }} />
      })
      }
    </ul>
  )
}

const TodoItem = (props) => {
  return (
    <li>
      <p style={{ display: 'inline', marginRight: 20 }}>{props.todo.completed ? "(x)" : "( )"} {props.todo.todoText}</p>
      <button onClick={props.onToggle}>Toggle</button>
    </li>
  )
}

const AddTodoForm = (props) => {
  const [newTodoText, setNewTodoText] = React.useState("")

  const addNewTodo = () => {

    props.onNewTodo({
      completed: false,
      todoText: newTodoText,
    })
    /**
     * clear the input  value after you click the add todo button.
     */
    setNewTodoText('');
  }
  return (
    <form onSubmit={e => e.preventDefault()}>
      <button type='submit' onClick={() => {
        if (newTodoText !== '') {
          addNewTodo()
        }
      }}>Add Todo</button>
      <input type="text" value={newTodoText} onChange={(e) => {
        setNewTodoText(e.target.value);
      }} />
    </form>
  )
}

const ToggleAllButton = (props) => {
  return (
    <button onClick={props.onToggleAll}>Toggle All</button>
  )
}

export default App;


