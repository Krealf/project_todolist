// Globals
const todoList = document.querySelector("#todo-list");
let todos = [];
let users = [];

// Attach events
document.addEventListener("DOMContentLoaded", initApp);

// Basic logic
function getUserName(userId) {
  const user = users.find((el) => el.id === userId);
  return user.name;
}

function printTodo({ id, userId, title, completed }) {
  const li = document.createElement("li");
  li.classList.add("todo-item");
  li.dataset.id = id;
  li.innerHTML = `<span>${title} by <b>${getUserName(userId)}</b></span>`;

  const status = document.createElement("input");
  status.type = "checkbox";
  status.checked = completed;

  const close = document.createElement("span");
  close.innerHTML = "&times;";
  close.classList.add("close");

  li.prepend(status);
  li.append(close);

  todoList.prepend(li);
}

// Event Logic
async function initApp() {
  try {
    [todos, users] = await Promise.all([getAllTodos(), getAllUsers()]);

    todos.forEach((todo) => {
      printTodo(todo);
    });
  } catch (error) {
    console.error("Error initializing app:", error);
  }
}

// Async logic
async function getAllTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();

  return data;
}

async function getAllUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();

  return data;
}
