// Globals
const todoList = document.querySelector("#todo-list");
const userList = document.querySelector("#user-todo");
const form = document.querySelector("form");
let todos = [];
let users = [];

// Attach events
document.addEventListener("DOMContentLoaded", initApp);
document.addEventListener("submit", handleSubmit);

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

function createUserOption(user) {
  const option = document.createElement("option");
  option.value = user.id;
  option.innerText = user.name;

  userList.append(option);
}

// Event Logic
async function initApp() {
  try {
    [todos, users] = await Promise.all([getAllTodos(), getAllUsers()]);

    todos.forEach((todo) => {
      printTodo(todo);
    });
    users.forEach((user) => createUserOption(user));
  } catch (error) {
    console.error("Error initializing app:", error);
  }
}

function handleSubmit(event) {
  event.preventDefault();

  createTodo({
    userId: Number(form.user.value),
    title: form.todo.value,
    completed: false,
  });
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

async function createTodo(todo) {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-type": "application/json",
    },
  });

  const newTodo = await response.json();
  printTodo({ ...newTodo });
}
