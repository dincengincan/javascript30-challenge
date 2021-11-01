const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


const getVideo = () => {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(localMediaStream => {
        video.srcObject = localMediaStream;
        video.play();
    })
    .catch(e => console.error(e))
}

const paintToCanvas = () => {
    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;
    
    return setInterval(() => {
        ctx.drawImage(video, 0, 0);
        
        // take out the pixels
        let pixelsData = ctx.getImageData(0, 0, width, height);

        // manipulate pixels
        pixelsData = applyFilter(pixelsData);
        
        
        // ghosting effect
        // ctx.globalAlpha= 0.1;

        // put manipulated pixels
        ctx.putImageData(pixelsData, 0, 0);
    },50)
}

const takePhoto = () => {
    // play the sound
    snap.currentTime = 0;
    snap.play();

    // take snapshot
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href= data;
    link.innerHTML= `<img src="${data}" alt="photo" />`
    link.setAttribute('download', 'photo')
    strip.appendChild(link);
}

const redFilter = (pixels) => {
    for(let i = 0; i < pixels.data.length; i += 4){
        pixels.data[i] += 100;
        pixels.data[i+1] -= 10;
        pixels.data[i+2] *= 0.1;
    }
    return pixels;
}

const greenFilter = (pixels) => {
    for(let i = 0; i < pixels.data.length; i += 4){
        pixels.data[i] -= 100;
        pixels.data[i+1] -= 10;
        pixels.data[i+2] *= 0.1;
    }
    return pixels;
}

const rgbSplitFilter = (pixels) => {
    for(let i = 0; i < pixels.data.length; i += 4){
        pixels.data[i - 150] = pixels.data[i];
        pixels.data[i + 250] = pixels.data[i + 1];
        pixels.data[i + 400] = pixels.data[i + 2];
    }
    return pixels;
}

const greenScreenFilter = (pixels) => {

const levels = {};
let red, green, blue, alpha;

document.querySelectorAll('.rgb input[type="range"]').forEach(input => {
    levels[input.name] = input.value;
})

    for(let i = 0; i < pixels.data.length; i += 4){
        red = pixels.data[i];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];
        
        // if they are in the range remove them
        if(red >= levels.rmin && green >= levels.gmin && blue >= levels.bmin && red <= levels.rmax && green <= levels.gmax && blue <= levels.bmax){
            pixels.data[i + 3] = 0;
        }
    }
    return pixels;

}

const applyFilter = (pixels) => {
    let selectedFilter;
    document.querySelectorAll('.rgb input[type="radio"]').forEach(input => {
        if(input.checked){
            selectedFilter = input.value;
        }
    })
    if(selectedFilter === 'red-filter'){
        return redFilter(pixels)
    }
    if(selectedFilter === 'green-filter'){
        return greenFilter(pixels)
    }
    if(selectedFilter === 'rgb-split-filter'){
        return rgbSplitFilter(pixels)
    }
    if(selectedFilter === 'green-screen-filter'){
        return greenScreenFilter(pixels)
    }
    return pixels;
}



getVideo();

video.addEventListener('canplay', paintToCanvas)

