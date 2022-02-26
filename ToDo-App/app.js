//Select DOM
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);

//Functions

function addTodo(e) {
  //Prevent brower from refreshing bc form button type is submit. To prevent this event, we use preventDefault()
  e.preventDefault();
  //Create todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create list
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value; //todoInput.value takes whatever you type and saves it for each new <li>
  //Save to local - do this last
  //Save to local
  saveLocalTodos(todoInput.value);
  //
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  todoInput.value = ""; //when saving the todo, the main todo that you inputted will be cleared
  //Create Completed Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //Create trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //attach final Todo
  todoList.appendChild(todoDiv);
}

function deleteTodo(e) {
  const item = e.target; //retreives whatever you're clicking on. Good for getting the specific clicked class, id, etc

  if (item.classList.contains("trash-btn")) {
    // e.target.parentElement.remove();
    //if we just did item.remove(), it just removes the trash icon, not the todo list. Therefore to remove todolist, we must get
    //the parent of the item
    const todo = item.parentElement;
    //creates class fall. In CSS file, added transition of todo list falling
    todo.classList.add("fall");
    //at the end
    removeLocalTodos(todo);
    //waits for the fall transition to finish before removing the todo list. Without this, it will remove todolist before transition is finished
    todo.addEventListener("transitionend", e => {
      todo.remove();
    });
  }
  if (item.classList.contains("complete-btn")) {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    console.log(todo);
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex"; //shows todo that has class "completed"
        } else {
          todo.style.display = "none"; //if todo doesn't have class "completed", don't show them
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

function saveLocalTodos(todo) {
  let todosStorage;
  if (localStorage.getItem("todosStorage") === null) {
    todosStorage = [];
  } else {
    todosStorage = JSON.parse(localStorage.getItem("todosStorage"));
  }
  todosStorage.push(todo);
  localStorage.setItem("todosStorage", JSON.stringify(todosStorage));
}

function removeLocalTodos(todo) {
  let todosStorage;
  if (localStorage.getItem("todosStorage") === null) {
    todosStorage = [];
  } else {
    todosStorage = JSON.parse(localStorage.getItem("todosStorage"));
  }
  const todoIndex = todo.children[0].innerText;
  todosStorage.splice(todosStorage.indexOf(todoIndex), 1);
  localStorage.setItem("todosStorage", JSON.stringify(todosStorage));
}

//Even when page refreshes, the todo list will still appear bc the local storage already saved it and this function basically
//takes what's saved in local storage and displays it back onto the web page
function getTodos() {
  let todosStorage;
  if (localStorage.getItem("todosStorage") === null) {
    todosStorage = [];
  } else {
    todosStorage = JSON.parse(localStorage.getItem("todosStorage"));
  }
  todosStorage.forEach(function(todo) {
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //attach final Todo
    todoList.appendChild(todoDiv);
  });
}