  const inputBox = document.getElementById("input-box");
  const listContainer = document.getElementById("list-container");
  const completedCounter = document.getElementById("completed-counter");
  const uncompletedCounter = document.getElementById("uncompleted-counter");

  inputBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      addTask();
    }
  });

  function addTask() {
    const task = inputBox.value.trim();
    if (!task) {
      alert("please write down a task");
      return;
    }

    const p = document.createElement("p");
    p.innerHTML = `
      <label>
        <input type="checkbox" class="task-checkbox">
        <span class="task-text">${task}</span>
      </label>
      <span class="edit-btn">edit</span>
      <span class="delete-btn">delete</span>
    `;

    listContainer.appendChild(p);
    inputBox.value = "";
    updateCounters();
  }

  listContainer.addEventListener("click", function (e) {
    const target = e.target;

    if (target.classList.contains("delete-btn")) {
      target.parentElement.remove();
      updateCounters();
    }

    else if (target.classList.contains("edit-btn")) {
      const textSpan = target.parentElement.querySelector(".task-text");
      const newText = prompt("edit task:", textSpan.textContent);
      if (newText !== null) {
        textSpan.textContent = newText.trim();
      }
    }

    else if (target.classList.contains("task-checkbox")) {
      updateCounters();
    }
  });

  function updateCounters() {
    const allTasks = document.querySelectorAll("#list-container p");
    let completed = 0;
    let uncompleted = 0;

    allTasks.forEach((p) => {
      const checkbox = p.querySelector(".task-checkbox");
      if (checkbox.checked) completed++;
      else uncompleted++;
    });

    completedCounter.textContent = completed;
    uncompletedCounter.textContent = uncompleted;
  }