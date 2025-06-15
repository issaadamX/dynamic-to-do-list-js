// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage and display them
    loadTasks();

    // Add event listener for the Add Task button
    addButton.addEventListener('click', () => addTask(taskInput.value, true));

    // Add event listener for Enter key in the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value, true);
        }
    });

    /**
     * Loads tasks from Local Storage and adds them to the DOM
     */
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    /**
     * Adds a new task to the list and optionally saves it to Local Storage
     * @param {string} taskText - The text of the task to add
     * @param {boolean} save - Whether to save the task to Local Storage
     */
    function addTask(taskText, save = true) {
        taskText = taskText.trim();
        if (!taskText) {
            alert('Please enter a task.');
            return;
        }

        // Create list item for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove task from DOM and Local Storage when Remove button is clicked
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        // Append Remove button and list item to the task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to Local Storage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the input field
        taskInput.value = '';
    }

    /**
     * Removes a task from Local Storage
     * @param {string} taskText - The text of the task to remove
     */
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
});
