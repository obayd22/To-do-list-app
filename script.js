// wait for the HTML document to be fully loaded before running the code inside.

document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");
  const emptyImage = document.querySelector(".empty-image");
  const todosContainer = document.querySelector(".todos-container");
  const progressBar = document.querySelector(".progress");
  const progressNumbers = document.getElementById("numbers");

  /*
    to remove the image that displays when there are no tasks:
    */
  const toggleEmptyState = () => {
    emptyImage.style.display =
      taskList.children.length === 0 ? "block" : "none";
    todosContainer.style.width = taskList.children.length > 0 ? "100%" : "50%";
  };

  // save to local storage function
  const saveTaskToLocalStorage = () => {
    const tasks = Array.from(taskList.querySelectorAll("li")).map((li) => ({
      text: li.querySelector("span").textContent,
      completed: li.querySelector(".checkbox").checked,
    }));

    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const loadFromLocalStorage = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(({ text, completed }) => addTask(text, completed, true));

    toggleEmptyState();
    // skip confetti effect
    updateProgress(true);
  };

// editing progressBar and Numbers:
const updateProgress = (skipCelebration = false) => {
  const totalTasks = taskList.children.length;
  const completedTasks = taskList.querySelectorAll(".checkbox:checked").length;

  progressBar.style.width = totalTasks
    ? `${(completedTasks / totalTasks) * 100}%`
    : "0%";

  progressNumbers.textContent = `${completedTasks} / ${totalTasks}`;

  if (!skipCelebration && totalTasks > 0 && completedTasks === totalTasks) {
    Confetti();
  }
};

  // adding tasks
  const addTask = (text, completed = false, skipCelebration = false) => {
    const taskText = text || taskInput.value.trim();

    if (!taskText) {
      return;
    }

    const li = document.createElement("li");

    // building the checkbox + buttons with innerHTML:
    li.innerHTML = `
        <input type="checkbox" class="checkbox" aria-label="mark task as complete" ${completed ? "checked" : ""}/>  
        <span></span>
 
        <!-- create two buttons for edit and delete -->
        <div class="task-buttons">
            <button class="edit-btn">
                <i class="fa-solid fa-pen"></i>
            </button>
 
            <button class="delete-btn">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        `;

    li.querySelector("span").textContent = taskText;

    // Get the created elements:
    const checkbox = li.querySelector(".checkbox");
    const editBtn = li.querySelector(".edit-btn");
    const deleteBtn = li.querySelector(".delete-btn");


    // deleting elements
    deleteBtn.addEventListener("click", () => {
      li.remove();
      toggleEmptyState();
      updateProgress();
      saveTaskToLocalStorage();
    });

    //
    if (completed) {
      li.classList.add("completed");
      editBtn.disabled = true;
      editBtn.style.opacity = "0.5";
      editBtn.style.pointerEvents = "none";
    }

    /* 
    if the element is narked as done:
        - disable the edit button
        - edit its style
    */
    checkbox.addEventListener("change", () => {
      const isChecked = checkbox.checked;

      li.classList.toggle("completed", isChecked);

      editBtn.disabled = isChecked;
      editBtn.style.opacity = isChecked ? "0.5" : "1";
      editBtn.style.pointerEvents = isChecked ? "none" : "auto";

      updateProgress();
      saveTaskToLocalStorage();
    });

    // editing button => 
    editBtn.addEventListener("click", () => {
      if (checkbox.checked || li.classList.contains("editing")) {
        return;
      }
    
      const span = li.querySelector("span");
      const oldText = span.textContent;

      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.className = "edit-input";
      editInput.value = oldText;

      li.classList.add("editing");
      li.replaceChild(editInput, span);
      editInput.focus();
      editInput.select();

     const finishEdit = (save) => {
        const newText = editInput.value.trim();

        const newSpan = document.createElement("span");
        newSpan.textContent = save && newText ? newText : oldText;

        li.replaceChild(newSpan, editInput);
        li.classList.remove("editing");

        if (save && newText && newText !== oldText) {
          saveTaskToLocalStorage();
        }
      };

      editInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          finishEdit(true);
        } else if (e.key === "Escape") {
          e.preventDefault();
          finishEdit(false);
        }
      });

      editInput.addEventListener("blur", () => finishEdit(true));
    });

    taskList.appendChild(li);

    // clear the input
    taskInput.value = "";

    toggleEmptyState();
    updateProgress(skipCelebration);
    saveTaskToLocalStorage();
  };

  // when btn clicked => call addTask
  addTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addTask();
  });

   // when Enter is pressed => call addTask
   taskInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
        e.preventDefault();
        addTask();
        }
    });

    loadFromLocalStorage();
    toggleEmptyState();
    updateProgress(true);
    });

// confetti effect
const Confetti = () => {
  const count = 200,
    defaults = { origin: { y: 0.7 } };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      }),
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, { spread: 60 });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};