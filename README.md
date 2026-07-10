# To-Do List App

A responsive to-do list application built with HTML, CSS, and vanilla JavaScript. The application allows users to create, edit, complete, and delete tasks while automatically saving data in the browser using Local Storage.

**Live Demo:** https://obayd22.github.io/To-do-list-app/

---

## Features

- Add new tasks
- Edit existing tasks
- Mark tasks as completed
- Delete tasks
- Automatically save tasks using Local Storage
- Progress tracker showing completed vs. total tasks
- Animated progress bar
- Confetti animation when all tasks are completed
- Responsive layout for desktop and mobile devices
- Empty state illustration when there are no tasks

---

## Built With

- HTML5
- CSS3
- JavaScript (ES6+)
- Local Storage API
- tsParticles Confetti

---

## What I Practiced

This project was primarily built to strengthen my frontend JavaScript skills and DOM manipulation.

During development I practiced:

- DOM selection and manipulation
- Event handling
- Dynamic element creation
- Form handling
- Local Storage for persistent data
- Array methods (`map`, `forEach`, `from`)
- Template literals
- Conditional rendering
- State synchronization between the UI and Local Storage
- Responsive layout using Flexbox
- CSS transitions and hover effects
- Working with third-party JavaScript libraries

---

## Project Structure

```
.
├── images/
│   ├── background2.jpg
│   └── emptyTaskLogo.svg
├── index.html
├── style.css
└── script.js
```

---

## How It Works

- Tasks are created dynamically using JavaScript.
- Every change (adding, editing, deleting, or completing a task) updates Local Storage.
- When the page reloads, saved tasks are restored automatically.
- The progress tracker updates in real time based on the number of completed tasks.
- A confetti animation is triggered when every task has been completed.

---

## Running Locally

Clone the repository:

```bash
git clone https://github.com/obayd22/To-do-list-app.git
```

Open the project folder and launch `index.html` in your browser.

---

## License

This project is open for learning and personal use.
