document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(taskItem => {
        tasks.push({
            text: taskItem.querySelector('.task-text').textContent,
            completed: taskItem.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value;

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    addTaskToDOM(taskText);
    saveTasks();
    taskInput.value = '';
}

function addTaskToDOM(taskText, completed = false) {
    const taskList = document.getElementById('task-list');

    const listItem = document.createElement('li');
    if (completed) {
        listItem.classList.add('completed');
    }

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    taskSpan.classList.add('task-text');
    listItem.appendChild(taskSpan);

    const editButton = document.createElement('button');
    editButton.textContent = '✎';
    editButton.classList.add('edit-button');
    editButton.onclick = () => editTask(listItem);
    listItem.appendChild(editButton);

    const completeButton = document.createElement('button');
    completeButton.textContent = '✔';
    completeButton.classList.add('complete-button');
    completeButton.onclick = () => toggleCompleteTask(listItem);
    listItem.appendChild(completeButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '✖';
    deleteButton.onclick = () => {
        taskList.removeChild(listItem);
        saveTasks();
    };
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
}

function toggleCompleteTask(listItem) {
    listItem.classList.toggle('completed');
    saveTasks();
}

function editTask(listItem) {
    const taskText = listItem.querySelector('.task-text').textContent;
    const newTaskText = prompt('Edit task:', taskText);

    if (newTaskText !== null && newTaskText !== '') {
        listItem.querySelector('.task-text').textContent = newTaskText;
        saveTasks();
    }
}
