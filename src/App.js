import React from 'react';
import './tailwind.output.css';

const INPUT_CLASSNAME = "bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
const BUTTON_CLASSNAME = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'

// 1. Add an Edit button right next to the Toggle button.
// 2. When clicking on the Edit button, the button change to "Save"

function App() {
  const [todos, setTodos] = useLocalStorageState('todos', [])

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
    <div style={{ margin: 'auto' }} className="container flex-col max-w-screen-sm content-center">
      <h1 className={"font-sans text-6xl text-center"}>Aufgaben</h1>

      <div className="flex mb-3">
        <AddTodoForm onNewTodo={newTodo => {
          setTodos(prev => prev.concat(newTodo))
        }} />
        {
          todos.length > 0 ? (
            <ToggleAllButton onToggleAll={toggleAll} />
          ) : null
        }
      </div>

      <TodoList todos={todos}
        onToggleSingleTodoItem={(index) => toggleOne(index)}
        onEditSingleTodoItem={(index, newTodoText) => editOne(index, newTodoText)} />
    </div>

  );
}

const TodoList = (props) => {
  return (
    <ul>
      {
        props.todos.map((todo, index) => {
          return <TodoItem todo={todo} key={index}
            onToggle={() => { props.onToggleSingleTodoItem(index) }}
            onEdit={(newTodoText) => { props.onEditSingleTodoItem(index, newTodoText) }} />
        })
      }
    </ul>
  )
}

const TodoItem = (props) => {

  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <li className="grid mt-3" style={{
      gridTemplateColumns: '1fr 200px',
      alignItems: 'center'
    }} >
      {
        isEditing ? (
          <EditAndSaveForm todo={props.todo} onEdit={(newTodoText) => {
            props.onEdit(newTodoText);
            setIsEditing(false)
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
                  <button className={BUTTON_CLASSNAME} onClick={() => { setIsEditing(true) }}>
                    <span role="img" aria-label="Edit">🖊️</span>
                  </button>
                </div>
              </div>
            </React.Fragment>
          )
      }
    </li >
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
    <form style={{ flex: '1' }} onSubmit={e => {
      e.preventDefault(); if (newTodoText !== '') {
        addNewTodo()
      }
    }}>
      <input placeholder="Enter a new todo" className={INPUT_CLASSNAME} type="text" value={newTodoText} onChange={(e) => {
        setNewTodoText(e.target.value);
      }} />
    </form>
  )
}

const EditAndSaveForm = (props) => {
  const [newTodoText, setNewTodoText] = React.useState(props.todo.todoText)

  return (
    <React.Fragment>
      <input className={INPUT_CLASSNAME} value={newTodoText} onChange={event => {
        setNewTodoText(event.target.value)
      }} />
      <button className={BUTTON_CLASSNAME} onClick={() => { props.onEdit(newTodoText); }}>Save</button>
    </React.Fragment>
  )
}

const ToggleAllButton = (props) => {
  return (
    <button className={BUTTON_CLASSNAME + " ml-3"}
      onClick={props.onToggleAll}>Toggle All</button>
  )
}

const useLocalStorageState = (key, initialValue) => {

  const existentValueInLocalStorage = window.localStorage.getItem(key) && JSON.parse(window.localStorage.getItem(key))

  const [state, setState] = React.useState(existentValueInLocalStorage === undefined || existentValueInLocalStorage === null ? initialValue : existentValueInLocalStorage)


  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))

  }, [key, state])

  return [state, setState]
}

export default App;
