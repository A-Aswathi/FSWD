let taskId = 0; // Track task ID for uniqueness

// Initialize tasks if there are any stored in localStorage
window.onload = function() {
    loadTasks();
};

// Allow dropping tasks between columns
function allowDrop(event) {
    event.preventDefault();
}

// Handle the drop action and move tasks between columns
function drop(event) {
    event.preventDefault();
    const task = document.getElementById(event.dataTransfer.getData("text"));
    const targetColumn = event.target;

    if (targetColumn.classList.contains("task-list")) {
        targetColumn.appendChild(task);
        updateTaskStatus(task);
    }
}

// Function to add a new task
function addTask(status) {
    const taskList = document.getElementById(`${status}-tasks`);
    const taskElement = document.createElement("li");
    taskElement.classList.add("task-item");
    taskElement.draggable = true;
    taskElement.id = `task-${taskId++}`;
    taskElement.textContent = `Task ${taskId}`;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn");
    editButton.onclick = function() { editTask(taskElement) };

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");
    removeButton.onclick = function() { removeTask(taskElement) };

    taskElement.appendChild(editButton);
    taskElement.appendChild(removeButton);

    taskElement.ondragstart = function (event) {
        event.dataTransfer.setData("text", event.target.id);
    };

    taskList.appendChild(taskElement);
    saveTasks();
}

// Function to edit the task name
function editTask(taskElement) {
    const newTaskName = prompt("Edit task name:", taskElement.textContent.replace("EditRemove", "").trim());
    if (newTaskName) {
        taskElement.childNodes[0].textContent = newTaskName; // Update the task name
        saveTasks();
    }
}

// Function to remove a task
function removeTask(taskElement) {
    const parent = taskElement.parentNode;
    parent.removeChild(taskElement);
    saveTasks();
}

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = {
        "pending": getTasksFromColumn("pending-tasks"),
        "in-progress": getTasksFromColumn("in-progress-tasks"),
        "complete": getTasksFromColumn("completed-tasks")
    };
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Helper function to get tasks from a column
function getTasksFromColumn(columnId) {
    const column = document.getElementById(columnId);
    const tasks = [];
    column.childNodes.forEach(task => {
        if (task.nodeType === 1) { // Only consider element nodes
            tasks.push(task.textContent.replace("EditRemove", "").trim());
        }
    });
    return tasks;
}

// Function to load tasks from localStorage and populate the columns
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        for (let status in tasks) {
            tasks[status].forEach(task => {
                const taskList = document.getElementById(`${status}-tasks`);
                const taskElement = document.createElement("li");
                taskElement.classList.add("task-item");
                taskElement.draggable = true;
                taskElement.textContent = task;

                const editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.classList.add("edit-btn");
                editButton.onclick = function() { editTask(taskElement) };

                const removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
                removeButton.classList.add("remove-btn");
                removeButton.onclick = function() { removeTask(taskElement) };

                taskElement.appendChild(editButton);
                taskElement.appendChild(removeButton);

                taskElement.ondragstart = function (event) {
                    event.dataTransfer.setData("text", event.target.id);
                };

                taskList.appendChild(taskElement);
            });
        }
    }
}
