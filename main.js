const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const tasksList = document.getElementById('tasks');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-timer');
const pauseButton = document.getElementById('pause-timer');
const resetButton = document.getElementById('reset-timer');

// Pomodoro Timer Variables
let timer;
let timeLeft = 25 * 60; 
let isRunning = false;

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.text, task.completed));
}

// Function to update the timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Pomodoro Timer Functions
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
                timeLeft = 25 * 60; 
                updateTimerDisplay();
                alert("Time's up! Take a break.");
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 25 * 60;
    updateTimerDisplay();
}

// To-Do List Functions
function addTask(text, completed = false) {
    const task = document.createElement('li');
    task.classList.add('task');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    if (completed) {
        task.classList.add('completed'); // Applies strikethrough if completed
    }
    checkbox.addEventListener('change', () => {
        task.classList.toggle('completed', checkbox.checked); // Toggle strikethrough
        saveTasks(); 
    });

    const taskText = document.createTextNode(text);
    task.appendChild(checkbox);
    task.appendChild(taskText);
    tasksList.appendChild(task);
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = Array.from(tasksList.children).map(task => ({
        text: task.textContent.trim(),
        completed: task.querySelector('input').checked,
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add task from input field
addTaskButton.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text) {
        addTask(text);
        taskInput.value = '';
        saveTasks();
    }
});

// Timetable Section
const timeSlotInput = document.getElementById('time-slot-input');
const addTimeSlotButton = document.getElementById('add-time-slot');
const timetableContent = document.getElementById('timetable-content');

function addTimeSlot() {
    const timeSlotText = timeSlotInput.value.trim();
    if (timeSlotText) {
        const timeSlot = document.createElement('div');
        timeSlot.classList.add('time-slot');
        timeSlot.textContent = timeSlotText;
        timetableContent.appendChild(timeSlot);
        timeSlotInput.value = '';
    }
}

addTimeSlotButton.addEventListener('click', addTimeSlot);

// Motivational Quotes Section
const quotes = [
    "Believe in yourself and all that you are.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Success is not the key to happiness. Happiness is the key to success.",
    "Your time is limited, don't waste it living someone else's life.",
    "Don't watch the clock; do what it does. Keep going.",
    "Start where you are. Use what you have. Do what you can."
];
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');

function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.textContent = quotes[randomIndex];
}

// Display a random quote on page load
displayRandomQuote();
newQuoteButton.addEventListener('click', displayRandomQuote);

// Load stored tasks and initialize timer
loadTasks();
updateTimerDisplay();

// Event Listeners for Pomodoro Timer
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
