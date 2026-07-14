// ============================================
// FilmHD v2
// app.js
// ============================================

"use strict";

// ============================================
// DOM
// ============================================

const fileInput =
document.getElementById("fileInput");

const loading =
document.getElementById("loading");

const appVersion =
"2.0.0";

// ============================================
// Init
// ============================================

document.addEventListener(

    "DOMContentLoaded",

    init

);

function init(){

    console.log(

        "FilmHD v"+appVersion

    );

    initUpload();

    initStorage();

    initShortcut();

    syncUI();

}

// ============================================
// Upload
// ============================================

function initUpload(){

    if(!fileInput) return;

    fileInput.addEventListener(

        "change",

        handleFileSelect

    );

}

// ============================================
// Handle File
// ============================================

function handleFileSelect(e){

    const file=e.target.files[0];

    if(!file) return;

    openImage(file);

}

// ============================================
// Open Image
// ============================================

function openImage(file){

    showLoading();

    const reader=

    new FileReader();

    reader.onload=function(ev){

        loadImage(

            ev.target.result

        );

    };

    reader.readAsDataURL(file);

}

// ============================================
// Decode Image
// ============================================

function loadImage(src){

    const img=

    new Image();

    img.onload=function(){

        EditorState.image=img;

        EditorState.originalWidth=

            img.width;

        EditorState.originalHeight=

            img.height;

        resetEditor();

        resizeCanvas();

        requestRender();

        hideLoading();

        console.log(

            "Image Loaded",

            img.width,

            img.height

        );

    };

    img.onerror=function(){

        hideLoading();

        alert(

            "Tidak dapat membuka gambar."

        );

    };

    img.src=src;

}

// ============================================
// UI Sync
// ============================================

function syncUI(){

    setSlider(

        "exposure",

        EditorState.exposure

    );

    setSlider(

        "contrast",

        EditorState.contrast

    );

    setSlider(

        "temperature",

        EditorState.temperature

    );

    setSlider(

        "saturation",

        EditorState.saturation

    );

}

// ============================================
// Helper
// ============================================

function setSlider(id,value){

    const el=

    document.getElementById(id);

    if(el){

        el.value=value;

    }

}

// ============================================
// Loading
// ============================================

function showLoading(){

    if(!loading) return;

    loading.style.display="flex";

}

function hideLoading(){

    if(!loading) return;

    loading.style.display="none";

}

// ============================================
// Open From URL
// ============================================

function openImageURL(url){

    loadImage(url);

}

// ============================================
// Reload
// ============================================

function reloadImage(){

    if(!EditorState.image)
        return;

    requestRender();

}

// ============================================
// Clear Editor
// ============================================

function clearEditor(){

    EditorState.image=null;

    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );

}

// ============================================
// Version
// ============================================

function getVersion(){

    return appVersion;

}
