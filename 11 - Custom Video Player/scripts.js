const playButton = document.querySelector('button.toggle');
const volumeSlider = document.querySelector("input[name='volume']");
const playbackSlider = document.querySelector("input[name='playbackRate']");
const video = document.querySelector('video');
const skipButtons = document.querySelectorAll('[data-skip]');
const progressFilled = document.querySelector(".progress__filled");
const progress = document.querySelector(".progress");
const fullscreen = document.querySelector("[name=fullscreen]");

const playVideo = () => {
    if(video.paused){
        video.play();
    }
    else{
        video.pause();
    }
}

const updatePlayButton = () => {
    if(video.paused){
        playButton.textContent = '►'
    }
    else{
        playButton.textContent = 'X'
    }
}

const skipVideo = function(){
    video.currentTime += Number(this.dataset.skip)
}

const onVolumeChange = (e) => {
    video.volume = e.target.value;
}

const onSpeedChange = (e) => {
    video.playbackRate = e.target.value;
}

const handleProgress = (e) => {
    const calculatedPercentage = Number(e.offsetX * 100 / progress.offsetWidth);
    video.currentTime = Number(video.duration) * calculatedPercentage / 100
}

const handlePlay = (e) => {
    const formattedTime = video.currentTime * 100 / video.duration;
    progressFilled.style.flexBasis = `${formattedTime}%`
}

const goFullscreen = () => {
    video.requestFullscreen();
}

video.addEventListener('timeupdate', handlePlay)
progress.addEventListener('click', handleProgress)
skipButtons.forEach(button => button.addEventListener('click', skipVideo))
playButton.addEventListener('click', playVideo);
video.addEventListener('click', playVideo);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
volumeSlider.addEventListener('change', onVolumeChange);
playbackSlider.addEventListener('change', onSpeedChange);
fullscreen.addEventListener('click', goFullscreen);
