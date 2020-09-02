import React from 'react';
import './tailwind.output.css';
import AddTodoForm from './components/AddTodoForm';
import ToggleAllButton from './components/ToggleAllButton';
import TodoList from './components/TodoList';
import useLocalStorageState from './components/useLocalStorageState';


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

  function deleteOne(index) {
    const todoArray = [...todos]
    todoArray.splice(index, 1)
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
        onEditSingleTodoItem={(index, newTodoText) => editOne(index, newTodoText)}
        onDeleteSingleTodoItem={(index) => deleteOne(index)} />
    </div>

  );
}

export default App;
