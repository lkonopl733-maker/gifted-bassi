// Отримання елементів DOM
const form = document.querySelector("#todo-form");
const input = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");

// Отримання завдань з localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Функція збереження у localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Функція відображення завдань
function renderTasks() {
  // Очищення списку
  taskList.innerHTML = "";

  // Перебір масиву
  tasks.forEach((task, index) => {
    // Створення елемента списку
    const li = document.createElement("li");
    li.classList.add("task-item");
    // Якщо завдання виконане
    if (task.completed) {
      li.style.textDecoration = "line-through";
      li.style.color = "gray";
      li.style.backgroundColor = "#dcdcdc";
    }

    // Текст завдання
    const span = document.createElement("span");
    span.textContent = task.text;
    span.dataset.index = index;

    // Кнопка видалення
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Видалити";
    deleteBtn.dataset.index = index;

    // Додавання елементів
    li.append(span);
    li.append(deleteBtn);

    // Додавання у список
    taskList.append(li);
  });
}

// Додавання нового завдання
form.addEventListener("submit", (event) => {
  // Забороняємо перезавантаження сторінки
  event.preventDefault();

  // Отримання тексту
  const taskText = input.value.trim();

  // Перевірка на порожнє поле
  if (taskText !== "") {
    // Додавання нового об'єкта
    tasks.push({
      text: taskText,
      completed: false,
    });

    // Збереження
    saveTasks();

    // Очищення input
    input.value = "";

    // Оновлення списку
    renderTasks();
  }
});

// Обробка кліків по списку
taskList.addEventListener("click", (event) => {
  // Якщо натиснули кнопку видалення
  if (event.target.tagName === "BUTTON") {
    const index = event.target.dataset.index;

    // Видалення завдання
    tasks.splice(index, 1);
  }

  // Якщо натиснули на текст або li
  else {
    // Знаходимо li
    const li = event.target.closest("li");

    // Отримуємо всі li
    const allItems = Array.from(taskList.children);

    // Знаходимо індекс
    const index = allItems.indexOf(li);

    // Змінюємо статус
    tasks[index].completed = !tasks[index].completed;
  }

  // Збереження
  saveTasks();

  // Оновлення списку
  renderTasks();
});

// Початкове відображення
renderTasks();
