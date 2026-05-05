const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const suppTaskBtn = document.getElementById("suppTaskBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");

let tasks = [];

function sauvegarderTaches() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function mettreAJourCompteur() {
  taskCounter.textContent = `Nombre de tâches : ${tasks.length}`;
}

function afficherTaches() {
  taskList.innerHTML = "";

  tasks.forEach(function (task, index) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function () {
      tasks[index].completed = checkbox.checked;

      sauvegarderTaches();

      afficherTaches();
    });

    const span = document.createElement("span");
    span.textContent = task.text;
    span.classList.add("task-text");

    if (task.completed) {
      span.classList.add("completed");
    }

    span.addEventListener("click", function () {
      tasks[index].completed = !tasks[index].completed;
      sauvegarderTaches();
      afficherTaches();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Supprimer";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function () {
      tasks.splice(index, 1);
      sauvegarderTaches();
      afficherTaches();
    });
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  mettreAJourCompteur();
}

function chargerTaches() {
  const tasksFromStorage = localStorage.getItem("tasks");

  if (tasksFromStorage) {
    tasks = JSON.parse(tasksFromStorage);
    afficherTaches();
  }
}

function ajouterTache() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Écris une tâche avant d'ajouter.");
    return;
  }

  const nouvelleTache = {
    text: taskText,
    completed: false,
  };

  tasks.push(nouvelleTache);
  sauvegarderTaches();
  afficherTaches();

  taskInput.value = "";
  taskInput.focus();
}

suppTaskBtn.addEventListener("click", function () {
  if (tasks.length === 0) {
    alert("Il n'y a aucune tâche à supprimer.");
    return;
  }

  const confirmation = confirm("Tu veux vraiment tout supprimer ?");

  if (confirmation) {
    tasks = [];
    sauvegarderTaches();
    afficherTaches();
  }
});

addTaskBtn.addEventListener("click", ajouterTache);

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    ajouterTache();
  }
});

chargerTaches();
