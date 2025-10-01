// Stopwatch variables
let intervalId = null;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let running = false;
let lapCount = 1;

// DOM elements
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startstop-btn');
const clearLabel = document.querySelector('.clear-label');
const lapBtn = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps-list');
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

// Toggle timer on button click
startStopBtn.addEventListener('click', () => {
    if (running) {
        stopTimer();
    } else {
        startTimer();
    }
});

// Reset timer on CLEAR label click
clearLabel.addEventListener('click', resetTimer);

// Lap button
lapBtn.addEventListener('click', recordLap);

// Theme toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
});

function startTimer() {
    if (intervalId) return;
    intervalId = setInterval(() => {
        milliseconds += 1;
        if (milliseconds === 100) {
            seconds++;
            milliseconds = 0;
        }
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        if (minutes === 60) {
            hours++;
            minutes = 0;
        }
        updateDisplay();
    }, 10); // 10ms for centiseconds
    running = true;
    startStopBtn.textContent = 'stop';
}

function stopTimer() {
    clearInterval(intervalId);
    intervalId = null;
    running = false;
    startStopBtn.textContent = 'start';
}

function resetTimer() {
    stopTimer();
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    lapCount = 1;
    lapsList.innerHTML = '';
    updateDisplay();
    startStopBtn.textContent = 'start/stop';
}

function recordLap() {
    const lapTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds)}`;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapsList.appendChild(lapItem);
    lapCount++;
}

function updateDisplay() {
    const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds)}`;
    display.textContent = formattedTime;
}

function padZero(number) {
    return number < 10 ? '0' + number : number;
}