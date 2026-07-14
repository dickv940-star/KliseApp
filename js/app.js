// =============================================
// FilmHD v2
// app.js
// =============================================

// ----------------------------
// Canvas
// ----------------------------

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// ----------------------------
// Input
// ----------------------------

const fileInput = document.getElementById("fileInput");

// ----------------------------
// Buttons
// ----------------------------

const btnSave = document.getElementById("btnSave");
const btnReset = document.getElementById("btnReset");

const btnUndo = document.getElementById("btnUndo");
const btnRedo = document.getElementById("btnRedo");

const btnZoomIn = document.getElementById("zoomIn");
const btnZoomOut = document.getElementById("zoomOut");
const btnZoomFit = document.getElementById("zoomFit");

const btnAutoPreset =
document.getElementById("btnAutoPreset");

const btnCrop =
document.getElementById("btnCrop");

const btnRotate =
document.getElementById("btnRotate");

const btnFullscreen =
document.getElementById("btnFullscreen");

// ----------------------------
// Slider
// ----------------------------

const exposureSlider =
document.getElementById("exposure");

const contrastSlider =
document.getElementById("contrast");

const temperatureSlider =
document.getElementById("temperature");

const saturationSlider =
document.getElementById("saturation");

// ----------------------------
// Runtime
// ----------------------------

let renderPending=false;

let beforeMode=false;

let dragging=false;

let lastX=0;

let lastY=0;

let pinchDistance=null;
// =============================================
// Upload
// =============================================

fileInput.addEventListener("change",loadImage);

function loadImage(e){

    const file=e.target.files[0];

    if(!file) return;

    const reader=new FileReader();

    reader.onload=function(ev){

        const img=new Image();

        img.onload=function(){

            EditorState.image=img;

            EditorState.originalWidth=
            img.width;

            EditorState.originalHeight=
            img.height;

            canvas.width=img.width;

            canvas.height=img.height;

            resetView();

            requestRender();

        };

        img.src=ev.target.result;

    };

    reader.readAsDataURL(file);

}
function resetView(){

    EditorState.zoom=1;

    EditorState.rotation=0;

    EditorState.offsetX=0;

    EditorState.offsetY=0;

}
function requestRender(){

    if(renderPending) return;

    renderPending=true;

    requestAnimationFrame(function(){

        renderPending=false;

        render();

    });

}
// =============================================
// Create Processed Image
// =============================================

function createProcessedCanvas(){

    if(!EditorState.image) return null;

    const temp=document.createElement("canvas");

    temp.width=EditorState.originalWidth;

    temp.height=EditorState.originalHeight;

    const tctx=temp.getContext("2d",{
        willReadFrequently:true
    });

    tctx.drawImage(

        EditorState.image,

        0,

        0

    );

    const imageData=tctx.getImageData(

        0,

        0,

        temp.width,

        temp.height

    );

    // Jalankan seluruh pipeline converter
    convertImage(imageData);

    tctx.putImageData(

        imageData,

        0,

        0

    );

    return temp;

}
// =============================================
// Render
// =============================================

function render(){

    if(!EditorState.image) return;

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.save();

    ctx.translate(
        canvas.width/2 + EditorState.offsetX,
        canvas.height/2 + EditorState.offsetY
    );

    ctx.scale(
        EditorState.zoom,
        EditorState.zoom
    );

    ctx.rotate(
        EditorState.rotation * Math.PI/180
    );

    const processed = createProcessedCanvas();

    if(!processed){

        ctx.restore();
        return;

    }
function rotate90(){

    saveState();

    EditorState.rotation+=90;

    requestRender();

}
    // ==========================
    // Crop
    // ==========================

    if(EditorState.crop){

        const c = EditorState.crop;

        ctx.drawImage(

            processed,

            c.x,
            c.y,
            c.width,
            c.height,

            -c.width/2,
            -c.height/2,
            c.width,
            c.height

        );

    }else{

        ctx.drawImage(

            processed,

            -processed.width/2,

            -processed.height/2

        );

    }

    ctx.restore();

    updateHistogram();

}
// =============================================
// Fit Image
// =============================================

function fitImage(){

    if(!EditorState.image) return;

    const sx =
        canvas.width /
        EditorState.originalWidth;

    const sy =
        canvas.height /
        EditorState.originalHeight;

    EditorState.zoom =
        Math.min(sx,sy);

    EditorState.offsetX=0;

    EditorState.offsetY=0;

    requestRender();

}
// =============================================
// Before / After
// =============================================

function renderOriginal(){

    if(!EditorState.image) return;

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

        EditorState.image,

        -EditorState.originalWidth/2,

        -EditorState.originalHeight/2

    );

    ctx.restore();

}
const renderPipeline=render;

render=function(){

    if(beforeMode){

        renderOriginal();

        return;

    }

    renderPipeline();

};
// =============================================
// Histogram
// =============================================

function updateHistogram(){

    if(typeof refreshHistogram==="function"){

        refreshHistogram();

    }

}
// =============================================
// Update Image
// =============================================

function updateImage(){

    requestRender();

}
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
// =============================================
// Slider Binding
// =============================================

function bindSlider(slider,key){

    if(!slider) return;

    slider.value = EditorState[key];

    slider.addEventListener("input",function(){

        saveState();

        EditorState[key] = Number(this.value);

        updateImage();

    });

}

bindSlider(exposureSlider,"exposure");
bindSlider(contrastSlider,"contrast");
bindSlider(temperatureSlider,"temperature");
bindSlider(saturationSlider,"saturation");

// =============================================
// Zoom
// =============================================

btnZoomIn?.addEventListener("click",()=>{

    EditorState.zoom*=1.1;

    requestRender();

});

btnZoomOut?.addEventListener("click",()=>{

    EditorState.zoom/=1.1;

    if(EditorState.zoom<0.1)
        EditorState.zoom=0.1;

    requestRender();

});

btnZoomFit.onclick=fitImage;

    resetView();

    requestRender();

});
// =============================================
// Mouse Wheel
// =============================================

canvas.addEventListener("wheel",function(e){

    e.preventDefault();

    const zoomFactor = e.deltaY<0 ? 1.1 : 0.9;

    EditorState.zoom*=zoomFactor;

    EditorState.zoom=Math.max(
        0.1,
        Math.min(
            20,
            EditorState.zoom
        )
    );

    requestRender();

},{passive:false});

// =============================================
// Drag
// =============================================

canvas.addEventListener("mousedown",function(e){

    dragging=true;

    lastX=e.clientX;

    lastY=e.clientY;

});

window.addEventListener("mousemove",function(e){

    if(!dragging) return;

    EditorState.offsetX+=

        e.clientX-lastX;

    EditorState.offsetY+=

        e.clientY-lastY;

    lastX=e.clientX;

    lastY=e.clientY;

    requestRender();

});

window.addEventListener("mouseup",()=>{

    dragging=false;

});

// =============================================
// Touch Gesture
// =============================================

canvas.addEventListener("touchstart",function(e){

    if(e.touches.length===1){

        dragging=true;

        lastX=e.touches[0].clientX;

        lastY=e.touches[0].clientY;

    }

},{passive:false});

canvas.addEventListener("touchmove",function(e){

    if(e.touches.length!==1)
        return;

    e.preventDefault();

    EditorState.offsetX+=

        e.touches[0].clientX-lastX;

    EditorState.offsetY+=

        e.touches[0].clientY-lastY;

    lastX=e.touches[0].clientX;

    lastY=e.touches[0].clientY;

    requestRender();

},{passive:false});

canvas.addEventListener("touchend",()=>{

    dragging=false;

});
// =============================================
// Touch Gesture
// =============================================

canvas.addEventListener("touchstart",function(e){

    if(e.touches.length===1){

        dragging=true;

        lastX=e.touches[0].clientX;

        lastY=e.touches[0].clientY;

    }

},{passive:false});

canvas.addEventListener("touchmove",function(e){

    if(e.touches.length!==1)
        return;

    e.preventDefault();

    EditorState.offsetX+=

        e.touches[0].clientX-lastX;

    EditorState.offsetY+=

        e.touches[0].clientY-lastY;

    lastX=e.touches[0].clientX;

    lastY=e.touches[0].clientY;

    requestRender();

},{passive:false});

canvas.addEventListener("touchend",()=>{

    dragging=false;

});

// =============================================
// Pinch Zoom
// =============================================

function touchDistance(a,b){

    const dx=a.clientX-b.clientX;

    const dy=a.clientY-b.clientY;

    return Math.sqrt(dx*dx+dy*dy);

}

canvas.addEventListener("touchmove",function(e){

    if(e.touches.length!==2)
        return;

    e.preventDefault();

    const dist=

    touchDistance(

        e.touches[0],

        e.touches[1]

    );

    if(!pinchDistance){

        pinchDistance=dist;

        return;

    }

    EditorState.zoom*=

        dist/pinchDistance;

    EditorState.zoom=Math.max(

        0.1,

        Math.min(

            20,

            EditorState.zoom

        )

    );

    pinchDistance=dist;

    requestRender();

},{passive:false});

canvas.addEventListener("touchend",()=>{

    pinchDistance=null;

});

// =============================================
// Reset
// =============================================

btnReset?.addEventListener("click",()=>{

    saveState();

    resetView();

    EditorState.exposure=0;

    EditorState.contrast=0;

    EditorState.temperature=0;

    EditorState.saturation=0;

    exposureSlider.value=0;
    contrastSlider.value=0;
    temperatureSlider.value=0;
    saturationSlider.value=0;

    requestRender();

});
canvas.addEventListener(

    "dblclick",

    function(){

        resetView();

        fitImage();

    }

);
// =============================================
// Undo / Redo
// =============================================

btnUndo?.addEventListener("click",undo);

btnRedo?.addEventListener("click",redo);

window.addEventListener("keydown",function(e){

    if(e.ctrlKey && e.key==="z"){

        e.preventDefault();

        undo();

    }

    if(e.ctrlKey && e.key==="y"){

        e.preventDefault();

        redo();

    }

});
// =============================================
// Auto Preset
// =============================================

btnAutoPreset?.addEventListener("click",()=>{

    saveState();

    if(typeof autoPreset==="function"){

        autoPreset();

    }

    requestRender();

});

function autoPreset(){
    // ubah EditorState sesuai preset
}

// =============================================
// Auto Crop
// =============================================

btnCrop?.addEventListener("click",()=>{

    if(typeof detectFrame!=="function")
        return;

    const img=createProcessedCanvas();

    const tctx=img.getContext("2d");

    const imageData=tctx.getImageData(

        0,
        0,
        img.width,
        img.height

    );

    const rect=detectFrame(imageData);

    EditorState.crop=rect;

    requestRender();

});
function exportCrop(){

    if(!EditorState.crop){

        btnSave.click();

        return;

    }

    const c=EditorState.crop;

    const temp=document.createElement("canvas");

    temp.width=c.width;

    temp.height=c.height;

    const tctx=temp.getContext("2d");

    tctx.drawImage(

        canvas,

        c.x,
        c.y,
        c.width,
        c.height,

        0,
        0,
        c.width,
        c.height

    );

    const a=document.createElement("a");

    a.download="FilmHD_Crop.jpg";

    a.href=temp.toDataURL(

        "image/jpeg",

        1

    );

    a.click();

}
// =============================================
// Auto Rotate
// =============================================

btnRotate?.addEventListener("click",()=>{

    if(typeof autoRotate==="function"){

        saveState();

        autoRotate();

        requestRender();

    }

});

// =============================================
// Fullscreen
// =============================================

btnFullscreen?.addEventListener("click",()=>{

    if(!document.fullscreenElement){

        canvas.requestFullscreen();

    }else{

        document.exitFullscreen();

    }

});

// =============================================
// Save JPEG
// =============================================

btnSave?.addEventListener("click",()=>{

    const a=document.createElement("a");

    a.download="FilmHD.jpg";

    a.href=canvas.toDataURL(

        "image/jpeg",

        1

    );

    a.click();

});

function savePNG(){

    const a=document.createElement("a");

    a.download="FilmHD.png";

    a.href=canvas.toDataURL("image/png");

    a.click();

}

// =============================================
// Shortcut
// =============================================

window.addEventListener("keydown",function(e){

    if(e.key==="0"){

        resetView();

        requestRender();

    }

    if(e.key==="f"){

        if(btnFullscreen){

            btnFullscreen.click();

        }

    }

    if(e.ctrlKey && e.key==="s"){

        e.preventDefault();

        btnSave?.click();

    }

});

// =============================================
// Save Editor Settings
// =============================================

function saveEditorSettings(){

    localStorage.setItem(

        "filmhd",

        JSON.stringify({

            exposure:EditorState.exposure,

            contrast:EditorState.contrast,

            temperature:EditorState.temperature,

            saturation:EditorState.saturation,

            zoom:EditorState.zoom,

            rotation:EditorState.rotation

        })

    );

}

function loadEditorSettings(){

    const data=

    localStorage.getItem("filmhd");

    if(!data) return;

    Object.assign(

        EditorState,

        JSON.parse(data)

    );

}

window.addEventListener(

    "beforeunload",

    saveEditorSettings

);

loadEditorSettings();

// =============================================
// Init
// =============================================

requestRender();
