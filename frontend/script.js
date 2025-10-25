const API_URL = "http://localhost:8080/api/todos"; // your backend endpoint. 
// USE THIS AS THE URL FOR CHECKING THE BACKEND

const form = document.getElementById("container");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const itemList = document.getElementById("item-list");

// READ: Load all todos
async function loadTodos() {
  const res = await fetch(API_URL);
  const todos = await res.json();

  itemList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.classList.add("li");

    li.innerHTML = `
      <span>${todo.title} - ${todo.description}</span>
      <div>
        <button class="button" onclick="editTodo(${todo.id}, '${todo.title}', '${todo.description}')">✏️</button>
        <button class="button" onclick="deleteTodo(${todo.id})">❌</button>
      </div>
    `;

    itemList.appendChild(li);
  });
}

// CREATE: Add todo
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newTodo = {
    title: titleInput.value,
    description: descriptionInput.value,
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });

  titleInput.value = "";
  descriptionInput.value = "";
  loadTodos();
});

// UPDATE: Edit a todo
async function editTodo(id, oldTitle, oldDesc) {
  const newTitle = prompt("Edit title:", oldTitle);
  const newDesc = prompt("Edit description:", oldDesc);

  if (newTitle !== null && newDesc !== null) {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, description: newDesc }),
    });
    loadTodos();
  }
}

// DELETE: Remove a todo
async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadTodos();
}

loadTodos();
