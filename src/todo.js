var todoList = {
  todos: [],
  addTodos: function(todoText) {
    this.todos.push({
      todoText,
      completed: false
    });
  },
  changeTodos: function(location, changeTo) {
    this.todos[location].todoText = changeTo;
  },
  deleteTodo: function(index) {
    this.todos.splice(index, 1);
  },
  toggleCompleted: function(index) {
    this.todos[index].completed = !this.todos[index].completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var totalCompleted = 0;
    var todoArray = this.todos;

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
  }
};

var handlers = {
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  },
  addTodo: function() {
    var item = document.getElementById("addTodoInput");
    todoList.addTodos(item.value);
    item.value = "";
    view.displayTodos();
  },
  changeTodo: function() {
    var location = document.getElementById("locationOfTodo");
    var newItemName = document.getElementById("newTodoName");
    todoList.changeTodos(location.value, newItemName.value);
    location.value = "";
    newItemName.value = "";
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  
  toggleOne: function() {
    var whichTodo = document.getElementById("whichTodo");
    todoList.toggleCompleted(whichTodo.value);
    whichTodo.value = "";
    view.displayTodos();
  }
};



var view = {
  displayTodos: function() {
    var todosUl = document.querySelector("ul");
    todosUl.innerHTML = ""; 
    
    function createElements(element, index) {
      var todoLi = document.createElement("li");
      var todoTextWithCompletion;
      if (element.completed === true) {
        todoTextWithCompletion = "(x)";
      } else {
        todoTextWithCompletion = "( )";
      }
       
      todoLi.id = index;
      todoLi.textContent = `${todoTextWithCompletion} ${todoList.todos[index].todoText}`;
      todosUl.appendChild(todoLi);
      todoLi.appendChild(this.createDeleteButton()); //WHATTTTTTT
    }
    
    todoList.todos.forEach(createElements);
  },
  setUpEventListeners: function() {
    var todosUl = document.querySelector("ul");

    todosUl.addEventListener("click", function(event) {
      var elementClicked = event.target;

      if (elementClicked.className === "deleteButton") {
        // handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
        handlers.deleteTodo(elementClicked.parentNode.id);
      }
    });
  }
};

view.setUpEventListeners();
  
function createDeleteButton() {
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "deleteButton"; //will make it pretty later
  return deleteButton;
}

