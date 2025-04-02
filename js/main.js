/**
 * @fileoverview En enkel PWA Todo-applikation med offline-stöd och installationsmöjlighet.
 * @author Mattias Dahlgren, mattias.dahlgren@miun.se
 * @version 1.0
 */

/**
 * Spara referens till installationsprompten för att kunna visa den senare.
 * @type {BeforeInstallPromptEvent|null}
 */
let deferredPrompt;

/**
 * Kontrollera om appen redan är installerad genom att titta på olika plattformsspecifika egenskaper.
 * @type {boolean}
 */
const isAppInstalled =
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone ||
  document.referrer.includes("android-app://");

/**
 * Hämta tidigare lagrad information om installationsprompten redan visats.
 * @type {boolean}
 */
const hasPromptBeenShown =
  localStorage.getItem("installPromptShown") === "true";

/**
 * Lyssna efter 'beforeinstallprompt'-händelsen som utlöses när applikationen 
 * kan installeras som en PWA.
 * @param {BeforeInstallPromptEvent} e - Händelseobjektet som innehåller information om installationsprompten.
 */
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // Visa bara prompten om appen inte är installerad och prompten inte visats tidigare
  if (!isAppInstalled && !hasPromptBeenShown) {
    const installPrompt = document.getElementById("installPrompt");
    installPrompt.style.display = "block";

    // Hantera klick på installationsprompten för att visa den inbyggda installationsdialogen.
    installPrompt.addEventListener("click", async () => {
      if (deferredPrompt) {
        await deferredPrompt.prompt();

        // Resultat av användarens val gällande installation.
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

/**
 * Lyssna efter 'appinstalled'-händelsen som utlöses när applikationen har installerats.
 * @param {Event} evt - Händelseobjektet
 */
window.addEventListener("appinstalled", (evt) => {
  localStorage.setItem("installPromptShown", "true");
  document.getElementById("installPrompt").style.display = "none";
});

/**
 * Lyssna efter ändringar i nätverksstatus.
 */
window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);

/**
 * Uppdatera användargränssnittet baserat på aktuell nätverksstatus.
 * Denna funktion ändrar textinnehållet i ett statuselement för att visa 
 * om enheten är online eller offline.
 */
function updateOnlineStatus() {
  const status = navigator.onLine ? "Uppkopplad" : "Offline";
  document.getElementById("status").textContent = status;
}

/**
 * Todos-arrayen som innehåller alla uppgifter.
 * Laddas från localStorage vid start eller initieras som en tom array.
 * @type {Array<Object>}
 * @property {number} id - Unik identifierare för todo-uppgiften
 * @property {string} text - Todo-uppgiftens text
 * @property {boolean} completed - Om uppgiften är avklarad eller inte
 */
let todos = JSON.parse(localStorage.getItem("todos")) || [];

/**
 * Lägger till en ny todo-uppgift i listan.
 * Hämtar text från input-fältet, skapar ett nytt todo-objekt,
 * sparar till localStorage och uppdaterar gränssnittet.
 */
function addTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value.trim();

  if (text) {
    // Ny todo-uppgift med unik id
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

/**
 * Växlar mellan avklarad/ej avklarad status för en todo-uppgift.
 * @param {number} id - Identifieraren för den todo-uppgift som ska ändras
 */
function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);

  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    renderTodos();
  }
}

/**
 * Sparar todos-arrayen till localStorage för persistens.
 */
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

/**
 * Renderar todos-listan i DOM:en.
 * Skapar ett element för varje todo och lägger till i listan.
 */
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

/**
 * Initialiserar applikationen genom att rendera todos och uppdatera online-status.
 */
renderTodos();
updateOnlineStatus();

/**
 * Lägger till en händelselyssnare för att hantera Enter-tangent i input-fältet.
 */
document.getElementById("todoInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});