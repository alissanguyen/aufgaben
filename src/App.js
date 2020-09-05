import React from 'react';
import './tailwind.output.css';
import AddTodoForm from './components/AddTodoForm';
import ToggleAllButton from './components/ToggleAllButton';
import TodoList from './components/TodoList';
import useLocalStorageState from './components/useLocalStorageState';


function App() {

  const [isChecked, setIsChecked] = React.useState(false);
  const [todos, setTodos] = useLocalStorageState('todos', [], (todos) => {
    return todos.filter((todo) => {
      return typeof todo.id === 'string'
    })
  })


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

  function toggleOne(id) {
    const todoArray = [...todos]

    const todoToChange = todoArray.find(todo => todo.id === id)

    if (todoToChange) {
      todoToChange.completed = !todoToChange.completed
      setTodos(todoArray)
    }

  }

  function editOne(id, newTodoText) {
    const todoArray = [...todos]

    const todoToChange = todoArray.find(todo => todo.id === id)

    if (todoToChange) {
      todoToChange.todoText = newTodoText
      setTodos(todoArray)
    }
  }

  function deleteOne(id) {
    const todoArray = [...todos]

    const todoToChangeIndex = todoArray.findIndex(todo => todo.id === id)

    if (todoToChangeIndex !== -1) {
      todoArray.splice(todoToChangeIndex, 1)
      setTodos(todoArray)
    }
  }

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed) {
      return 1
    } else if (b.completed) {
      return -1
    } else {
      return 0
    }
  })

  return (
    <div style={{ margin: 'auto' }} className="container flex-col max-w-screen-sm content-center">
      <h1 className="aufgaben-hero-text text-lg text-6xl text-center">Aufgaben</h1>

      <div style={{ padding: '0px' }} className="flex mb-3">
        <AddTodoForm onNewTodo={newTodo => {
          setTodos(prev => prev.concat(newTodo))
        }} />
        {
          todos.length > 0 ? (
            <ToggleAllButton onToggleAll={toggleAll} />
          ) : null
        }
      </div>

      <div>
        <input type="checkbox" onChange={() => setIsChecked(!isChecked)} checked={isChecked} />
          Keep completed Todos at the end
      </div>

      <TodoList todos={isChecked ? sortedTodos : todos}
        onToggleSingleTodoItem={(id) => toggleOne(id)}
        onEditSingleTodoItem={(id, newTodoText) => editOne(id, newTodoText)}
        onDeleteSingleTodoItem={(id) => deleteOne(id)} />
    </div>

  );
}

export default App;
