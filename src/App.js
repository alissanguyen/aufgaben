import React from 'react';
import './tailwind.output.css';
import AddTodoForm from './components/AddTodoForm';
import ToggleAllButton from './components/ToggleAllButton';
import TodoList from './components/TodoList';
import useLocalStorageState from './components/useLocalStorageState';
import { BUTTON_CLASSNAME } from './constants';


function App() {

  const [todosShouldBeSplit, setTodosShouldBeSplit] = React.useState(false);
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

  const onlyUncompletedTodos = sortedTodos.filter(todo => (todo.completed === false));
  const onlyCompletedTodos = sortedTodos.filter(todo => (todo.completed === true))
  const numberOfHiddenTodos = sortedTodos.length - onlyUncompletedTodos.length;

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

        <button className={BUTTON_CLASSNAME} onClick={() => { setTodosShouldBeSplit(prev => !prev) }}> {
          todosShouldBeSplit ? "Combine" : "Separate"
        }</button>

        <React.Fragment>
          <TodoList todos={todosShouldBeSplit ? onlyUncompletedTodos : todos}
            onToggleSingleTodoItem={(id) => toggleOne(id)}
            onEditSingleTodoItem={(id, newTodoText) => editOne(id, newTodoText)}
            onDeleteSingleTodoItem={(id) => deleteOne(id)} />



          {todosShouldBeSplit ? (
            <React.Fragment>
              <div style={{
                display: 'block',
                height: 30,
                backGroundColor: 'gray',
                width: '100%'
              }}> ... </div>

              <TodoList todos={onlyCompletedTodos}
                onToggleSingleTodoItem={(id) => toggleOne(id)}
                onEditSingleTodoItem={(id, newTodoText) => editOne(id, newTodoText)}
                onDeleteSingleTodoItem={(id) => deleteOne(id)} />
            </React.Fragment>
          ) : null


          }
        </React.Fragment>

      </div>


    </div >

  );
}

export default App;
