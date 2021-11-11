let interval;
const countdown = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

const timer = (seconds ) => {
    clearInterval(interval);

    let remainingSeconds;
    const now = Date.now();
    const then = now + seconds * 1000;
    
    displayTimeLeft(seconds);
    displayEndTime(then);

    interval = setInterval(() => {
        remainingSeconds = Math.round((then - Date.now()) / 1000);
        if(remainingSeconds < 0){
            clearInterval(interval);
            return;
        }
        displayTimeLeft(remainingSeconds);
        
    }, 1000)
}


const displayTimeLeft = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    countdown.textContent = `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

const displayEndTime = (seconds) => {
    const timeStamp = new Date(seconds);
    const hours = timeStamp.getHours();
    const minutes = timeStamp.getMinutes();
    endTime.textContent = `Be back at ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

const handleClick = (button) => {
    timer(Number(button.dataset.time));
}

const handleSubmit = (e) => {
    e.preventDefault();
    timer(Number(e.target.elements.minutes.value) * 60);
    e.target.reset();
}

buttons.forEach(button => button.addEventListener('click', () => handleClick(button)));
document.customForm.addEventListener('submit', handleSubmit)

