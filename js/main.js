// Kontrollera om webbläsaren stöder PWA-installation
let deferredPrompt;

// Kontrollera om appen redan är installerad eller om installationsprompt redan visats
const isAppInstalled =
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone ||
  document.referrer.includes("android-app://");

// Hämta lagrad information om installation
const hasPromptBeenShown =
  localStorage.getItem("installPromptShown") === "true";

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // Visa bara prompten om appen inte är installerad och prompten inte visats tidigare
  if (!isAppInstalled && !hasPromptBeenShown) {
    const installPrompt = document.getElementById("installPrompt");
    installPrompt.style.display = "block";

    // Lägg till klickhändelsehanterare för installation
    installPrompt.addEventListener("click", async () => {
      if (deferredPrompt) {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;

        if (choiceResult.outcome === "accepted") {
          console.log("Användaren accepterade installationsprompten");
        }

        // Markera att prompten har visats
        localStorage.setItem("installPromptShown", "true");
        installPrompt.style.display = "none";
        deferredPrompt = null;
      }
    });
  }
});

// Lyssna efter när appen har installerats
window.addEventListener("appinstalled", (evt) => {
  localStorage.setItem("installPromptShown", "true");
  document.getElementById("installPrompt").style.display = "none";
});

// Resten av koden är oförändrad
window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);

function updateOnlineStatus() {
  const status = navigator.onLine ? "Uppkopplad" : "Offline";
  document.getElementById("status").textContent = status;
}

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function addTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value.trim();

  if (text) {
    const todo = {
      id: Date.now(),
      text,
      completed: false,
    };

    todos.push(todo);
    saveTodos();
    renderTodos();
    input.value = "";
  }
}

function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    renderTodos();
  }
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const div = document.createElement("div");
    div.className = `todo-item ${todo.completed ? "completed" : ""}`;
    div.innerHTML = `
                    <input type="checkbox" 
                           ${todo.completed ? "checked" : ""} 
                           onchange="toggleTodo(${todo.id})">
                    <span>${todo.text}</span>
                `;
    todoList.appendChild(div);
  });
}

// Initiera appen
renderTodos();
updateOnlineStatus();

document.getElementById("todoInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});
