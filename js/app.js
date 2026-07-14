// =====================================
// FilmHD
// app.js
// =====================================

const fileInput = document.getElementById("fileInput");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Buttons
const btnSave = document.getElementById("btnSave");
const btnReset = document.getElementById("btnReset");
const btnAutoPreset = document.getElementById("btnAutoPreset");

// Zoom
const zoomIn = document.getElementById("zoomIn");
const zoomOut = document.getElementById("zoomOut");
const zoomFit = document.getElementById("zoomFit");
const zoomValue = document.getElementById("zoomValue");

// Sliders
const exposure = document.getElementById("exposure");
const contrast = document.getElementById("contrast");
const temperature = document.getElementById("temperature");
const saturation = document.getElementById("saturation");

// =====================================
// Global
// =====================================

let image = new Image();

let scale = 1;
let offsetX = 0;
let offsetY = 0;

let dragging = false;

let startX = 0;
let startY = 0;

// =====================================
// Upload
// =====================================

fileInput.addEventListener("change", e => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = ev => {

        image.onload = () => {

            fitImage();

        };

        image.src = ev.target.result;

    };

    reader.readAsDataURL(file);

});

// =====================================
// Fit Image
// =====================================

function fitImage(){

    canvas.width = image.width;
    canvas.height = image.height;

    scale = 1;
    offsetX = 0;
    offsetY = 0;

    drawImage();

}

// =====================================
// Draw
// =====================================

function drawImage(){

    ctx.setTransform(1,0,0,1,0,0);

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.setTransform(
        scale,
        0,
        0,
        scale,
        offsetX,
        offsetY
    );

    ctx.drawImage(image,0,0);

    zoomValue.innerHTML =
        Math.round(scale*100) + "%";

}

// =====================================
// Zoom
// =====================================

zoomIn.onclick = ()=>{

    scale *= 1.1;

    drawImage();

}

zoomOut.onclick = ()=>{

    scale /= 1.1;

    drawImage();

}

zoomFit.onclick = ()=>{

    fitImage();

}

// Mouse Wheel

canvas.addEventListener("wheel",e=>{

    e.preventDefault();

    if(e.deltaY<0)
        scale*=1.1;
    else
        scale/=1.1;

    drawImage();

});

// =====================================
// Drag
// =====================================

canvas.onmousedown=e=>{

    dragging=true;

    startX=e.clientX-offsetX;
    startY=e.clientY-offsetY;

}

window.onmouseup=()=>{

    dragging=false;

}

window.onmousemove=e=>{

    if(!dragging) return;

    offsetX=e.clientX-startX;
    offsetY=e.clientY-startY;

    drawImage();

}

// =====================================
// Save JPEG
// =====================================

btnSave.onclick=()=>{

    const link=document.createElement("a");

    link.download="FilmHD.jpg";

    link.href=canvas.toDataURL("image/jpeg",1);

    link.click();

}

// =====================================
// Reset
// =====================================

btnReset.onclick=()=>{

    exposure.value=0;
    contrast.value=0;
    temperature.value=0;
    saturation.value=0;

    fitImage();

}

// =====================================
// Slider
// =====================================

[
exposure,
contrast,
temperature,
saturation
].forEach(sl=>{

    sl.oninput=()=>{

        if(typeof updateImage==="function"){

            updateImage();

        }

    }

});

// =====================================
// Auto Preset
// =====================================

btnAutoPreset.onclick=()=>{

    if(typeof applyAutoPreset==="function"){

        applyAutoPreset();

    }else{

        alert("preset.js belum dibuat");

    }

}
