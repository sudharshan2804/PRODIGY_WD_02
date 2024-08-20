// script.js
document.addEventListener('DOMContentLoaded', () => {
    let startTime;
    let updatedTime;
    let difference;
    let tInterval;
    let running = false;
    let paused = false;
    let elapsedTime = 0;

    const display = document.getElementById('display');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');

    function formatTime(ms) {
        const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((ms / (1000 * 60)) % 60);
        const seconds = Math.floor((ms / 1000) % 60);
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }

    function pad(number) {
        return number < 10 ? `0${number}` : number;
    }

    function updateDisplay() {
        updatedTime = new Date().getTime();
        difference = updatedTime - startTime + elapsedTime;
        display.innerText = formatTime(difference);
    }

    function startTimer() {
        if (!running) {
            startTime = new Date().getTime();
            tInterval = setInterval(updateDisplay, 1000);
            running = true;
            paused = false;
        }
    }

    function stopTimer() {
        clearInterval(tInterval);
        running = false;
    }

    function pauseTimer() {
        if (running && !paused) {
            clearInterval(tInterval);
            elapsedTime += new Date().getTime() - startTime;
            paused = true;
        }
    }

    function resumeTimer() {
        if (paused) {
            startTime = new Date().getTime();
            tInterval = setInterval(updateDisplay, 1000);
            paused = false;
        }
    }

    function resetTimer() {
        clearInterval(tInterval);
        running = false;
        paused = false;
        elapsedTime = 0;
        display.innerText = '00:00:00';
    }

    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);

    // Optional: Add resume functionality to the pause button
    pauseButton.addEventListener('dblclick', resumeTimer);
});
