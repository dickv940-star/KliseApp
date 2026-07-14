// =======================================
// FilmHD
// app.js
// =======================================

// INPUT

const fileInput =
document.getElementById("fileInput");

// BUTTON

const btnSave =
document.getElementById("btnSave");

const btnReset =
document.getElementById("btnReset");

const btnUndo =
document.getElementById("btnUndo");

const btnRedo =
document.getElementById("btnRedo");

const btnZoomIn =
document.getElementById("zoomIn");

const btnZoomOut =
document.getElementById("zoomOut");

const btnFit =
document.getElementById("zoomFit");

// =======================================
// Upload
// =======================================

fileInput.onchange=(e)=>{

    const file=e.target.files[0];

    if(!file)
        return;

    const reader=
        new FileReader();

    reader.onload=(ev)=>{

        const img=
            new Image();

        img.onload=()=>{

            EditorState.image=img;

            EditorState.originalWidth=
                img.width;

            EditorState.originalHeight=
                img.height;

            EditorState.zoom=1;

            EditorState.rotation=0;

            EditorState.offsetX=0;

            EditorState.offsetY=0;

            render();

        };

        img.src=
            ev.target.result;

    };

    reader.readAsDataURL(file);

};
// =======================================
// Zoom
// =======================================

btnZoomIn.onclick = () => {

    EditorState.zoom *= 1.1;

    render();

};

btnZoomOut.onclick = () => {

    EditorState.zoom /= 1.1;

    if(EditorState.zoom < 0.1){

        EditorState.zoom = 0.1;

    }

    render();

};

btnFit.onclick = () => {

    EditorState.zoom = 1;

    EditorState.offsetX = 0;

    EditorState.offsetY = 0;

    EditorState.rotation = 0;

    render();

};

// =======================================
// Mouse Wheel Zoom
// =======================================

canvas.addEventListener("wheel", function(e){

    e.preventDefault();

    if(e.deltaY < 0){

        EditorState.zoom *= 1.1;

    }else{

        EditorState.zoom /= 1.1;

    }

    if(EditorState.zoom < 0.1){

        EditorState.zoom = 0.1;

    }

    if(EditorState.zoom > 20){

        EditorState.zoom = 20;

    }

    render();

});

// =======================================
// Drag / Pan
// =======================================

let dragging = false;

let lastX = 0;

let lastY = 0;

canvas.addEventListener("mousedown", function(e){

    dragging = true;

    lastX = e.clientX;

    lastY = e.clientY;

});

window.addEventListener("mouseup", function(){

    dragging = false;

});

window.addEventListener("mousemove", function(e){

    if(!dragging) return;

    const dx = e.clientX - lastX;

    const dy = e.clientY - lastY;

    lastX = e.clientX;

    lastY = e.clientY;

    EditorState.offsetX += dx;

    EditorState.offsetY += dy;

    render();

});

// =======================================
// Touch Support
// =======================================

canvas.addEventListener("touchstart", function(e){

    if(e.touches.length == 1){

        dragging = true;

        lastX = e.touches[0].clientX;

        lastY = e.touches[0].clientY;

    }

}, {passive:false});

canvas.addEventListener("touchmove", function(e){

    e.preventDefault();

    if(!dragging) return;

    if(e.touches.length != 1) return;

    const dx = e.touches[0].clientX - lastX;

    const dy = e.touches[0].clientY - lastY;

    lastX = e.touches[0].clientX;

    lastY = e.touches[0].clientY;

    EditorState.offsetX += dx;

    EditorState.offsetY += dy;

    render();

}, {passive:false});

canvas.addEventListener("touchend", function(){

    dragging = false;

});

// =======================================
// Reset
// =======================================

btnReset.onclick = function(){

    saveState();

    EditorState.zoom = 1;

    EditorState.rotation = 0;

    EditorState.offsetX = 0;

    EditorState.offsetY = 0;

    EditorState.exposure = 0;

    EditorState.contrast = 0;

    EditorState.temperature = 0;

    EditorState.saturation = 0;

    render();

};

// =======================================
// Undo / Redo
// =======================================

if(btnUndo){

    btnUndo.onclick = function(){

        undo();

    };

}

if(btnRedo){

    btnRedo.onclick = function(){

        redo();

    };

}

// =======================================
// Save JPEG
// =======================================

btnSave.onclick = function(){

    const link = document.createElement("a");

    link.download = "FilmHD.jpg";

    link.href = canvas.toDataURL("image/jpeg", 1);

    link.click();

};

// =======================================
// Keyboard Shortcut
// =======================================

window.addEventListener("keydown", function(e){

    if(e.ctrlKey && e.key === "z"){

        e.preventDefault();

        undo();

    }

    if(e.ctrlKey && e.key === "y"){

        e.preventDefault();

        redo();

    }

    if(e.key === "+"){

        EditorState.zoom *= 1.1;

        render();

    }

    if(e.key === "-"){

        EditorState.zoom /= 1.1;

        render();

    }

});
// =======================================
// Render Scheduler
// =======================================

let renderPending = false;

function requestRender(){

    if(renderPending) return;

    renderPending = true;

    requestAnimationFrame(() => {

        renderPending = false;

        render();

        if(typeof refreshHistogram === "function"){

            refreshHistogram();

        }

    });

}

// =======================================
// Slider Binding
// =======================================

const exposureSlider = document.getElementById("exposure");
const contrastSlider = document.getElementById("contrast");
const temperatureSlider = document.getElementById("temperature");
const saturationSlider = document.getElementById("saturation");

function bindSlider(slider,key){

    if(!slider) return;

    slider.addEventListener("input",function(){

        EditorState[key]=Number(this.value);

        if(typeof updateImage==="function"){

            updateImage();

        }else{

            requestRender();

        }

    });

}

bindSlider(exposureSlider,"exposure");
bindSlider(contrastSlider,"contrast");
bindSlider(temperatureSlider,"temperature");
bindSlider(saturationSlider,"saturation");

// =======================================
// Pinch Zoom (2 Fingers)
// =======================================

let pinchDistance = null;

function getDistance(t1,t2){

    const dx=t1.clientX-t2.clientX;
    const dy=t1.clientY-t2.clientY;

    return Math.sqrt(dx*dx+dy*dy);

}

canvas.addEventListener("touchmove",function(e){

    if(e.touches.length!==2) return;

    e.preventDefault();

    const d=getDistance(
        e.touches[0],
        e.touches[1]
    );

    if(pinchDistance===null){

        pinchDistance=d;
        return;

    }

    const ratio=d/pinchDistance;

    EditorState.zoom*=ratio;

    if(EditorState.zoom<0.1)
        EditorState.zoom=0.1;

    if(EditorState.zoom>20)
        EditorState.zoom=20;

    pinchDistance=d;

    requestRender();

},{passive:false});

canvas.addEventListener("touchend",function(){

    pinchDistance=null;

});

// =======================================
// Before / After
// =======================================

let beforeMode=false;

window.addEventListener("keydown",function(e){

    if(e.code==="Space"){

        e.preventDefault();

        beforeMode=true;

        requestRender();

    }

});

window.addEventListener("keyup",function(e){

    if(e.code==="Space"){

        beforeMode=false;

        requestRender();

    }

});

// =======================================
// Render Override
// =======================================

const originalRender=render;

render=function(){

    if(beforeMode){

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.drawImage(

            EditorState.image,

            0,

            0

        );

        return;

    }

    originalRender();

};

// =======================================
// Fullscreen
// =======================================

const btnFullscreen=document.getElementById("btnFullscreen");

if(btnFullscreen){

    btnFullscreen.onclick=()=>{

        if(!document.fullscreenElement){

            canvas.requestFullscreen();

        }else{

            document.exitFullscreen();

        }

    };

}

// =======================================
// Auto Save Editor State
// =======================================

function saveEditorSettings(){

    localStorage.setItem(

        "filmhd-editor",

        JSON.stringify({

            exposure:EditorState.exposure,
            contrast:EditorState.contrast,
            temperature:EditorState.temperature,
            saturation:EditorState.saturation,
            zoom:EditorState.zoom

        })

    );

}

function loadEditorSettings(){

    const data=
    localStorage.getItem(
        "filmhd-editor"
    );

    if(!data) return;

    const s=JSON.parse(data);

    Object.assign(EditorState,s);

    if(exposureSlider)
        exposureSlider.value=s.exposure;

    if(contrastSlider)
        contrastSlider.value=s.contrast;

    if(temperatureSlider)
        temperatureSlider.value=s.temperature;

    if(saturationSlider)
        saturationSlider.value=s.saturation;

}
// =======================================
// Create Processed Image
// =======================================

function createProcessedCanvas(){

    if(!EditorState.image)
        return null;

    const temp =
        document.createElement("canvas");

    temp.width =
        EditorState.originalWidth;

    temp.height =
        EditorState.originalHeight;

    const tctx =
        temp.getContext("2d");

    tctx.drawImage(

        EditorState.image,

        0,

        0

    );

    const imgData =
        tctx.getImageData(

            0,

            0,

            temp.width,

            temp.height

        );

    convertImage(imgData);

    tctx.putImageData(

        imgData,

        0,

        0

    );

    return temp;

}
function render(){

    if(!EditorState.image)
        return;

    const processed =
        createProcessedCanvas();

    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );

    ctx.save();

    ctx.translate(

        canvas.width/2+

        EditorState.offsetX,

        canvas.height/2+

        EditorState.offsetY

    );

    ctx.scale(

        EditorState.zoom,

        EditorState.zoom

    );

    ctx.rotate(

        EditorState.rotation*

        Math.PI/180

    );

    ctx.drawImage(

        processed,

        -processed.width/2,

        -processed.height/2

    );

    ctx.restore();

}
window.addEventListener("beforeunload",saveEditorSettings);

loadEditorSettings();
