import React from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = React.useState([

  ])

  const handleNewTodo = newTodo => {
    setTodos(prev => prev.concat(newTodo))
  }

  return (
    <div>
      <h1>Todo List React</h1>
      <button>Toggle All</button>

      <AddTodoForm onNewTodo={handleNewTodo} />

      <div>
        <button >Change Todo</button>
        <input id="locationOfTodo" type="number" />
        <input id="newTodoName" type="text" />
      </div>

      <div>
        <button >Toggle This Todo</button>
        <input id="whichTodo" type="number" />
      </div>
      <ul>
        {
          todos.map(el => {
            return (
              <li>{el.todoText}</li>
            )
          })
        }
      </ul>
    </div>

  );
}

const AddTodoForm = (props) => {
  const [newTodoText, setNewTodoText] = React.useState("")

  const addNewTodo = () => {

    props.onNewTodo({
      completed: false,
      todoText: newTodoText
    })
    /**
     * clear the input  value after you click the add todo button.
     */
    setNewTodoText('');
  }
  return (
    <div>
      <button onClick={() => {
        addNewTodo()
      }}>Add Todo</button>
      <input type="text" value={newTodoText} onChange={(e) => {
        setNewTodoText(e.target.value);
      }} />
    </div>
  )
}

export default App;


