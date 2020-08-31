import React from 'react';
import './App.css';

// 1. Add an Edit button right next to the Toggle button.
// 2. When clicking on the Edit button, the button change to "Save"

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

  function editOne(index, newTodoText) {
    const todoArray = [...todos]
    todoArray[index].todoText = newTodoText;
    setTodos(todoArray)
  }

  return (
    <div>
      <h1>Aufgaben</h1>
      <AddTodoForm onNewTodo={newTodo => {
        setTodos(prev => prev.concat(newTodo))
      }} />
      <ToggleAllButton onToggleAll={toggleAll} />
      <TodoList todos={todos}
        onToggleSingleTodoItem={(index) => toggleOne(index)}
        onEditSingleTodoItem={(index, newTodoText) => editOne(index, newTodoText)} />
    </div>

  );
}

const TodoList = (props) => {
  return (
    <ul>
      {props.todos.map((todo, index) => {
        return <TodoItem todo={todo}
          key={index}
          onToggle={() => {
            props.onToggleSingleTodoItem(index)
          }}
          onEdit={(newTodoText) => {
            props.onEditSingleTodoItem(index, newTodoText)
          }} />
      })
      }
    </ul>
  )
}

const TodoItem = (props) => {

  const [isEditing, setIsEditing] = React.useState(false);

  const [newTodoText, setNewTodoText] = React.useState(props.todo.todoText)

  return (
    <li>
      {
        isEditing ? (
          <React.Fragment>
            <input value={newTodoText} onChange={event => {
              setNewTodoText(event.target.value)
            }} />
            <button onClick={() => { props.onEdit(newTodoText); setIsEditing(false) }}>Save</button>
          </React.Fragment>
        ) : (
            <React.Fragment>
              <p style={{ display: 'inline', marginRight: 20 }}>{props.todo.completed ? "(x)" : "( )"} {props.todo.todoText}</p>
              <button onClick={props.onToggle}>Toggle</button>
              <button onClick={() => {
                setIsEditing(true)
              }}>Edit</button>
            </React.Fragment>
          )
      }
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


