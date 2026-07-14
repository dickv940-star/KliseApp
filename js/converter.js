// ============================================
// FilmHD v2
// toolbar.js
// Toolbar Controller
// ============================================

"use strict";

// ============================================
// DOM
// ============================================

const btnUndo = document.getElementById("btnUndo");
const btnRedo = document.getElementById("btnRedo");

const btnReset = document.getElementById("btnReset");

const btnZoomIn = document.getElementById("zoomIn");
const btnZoomOut = document.getElementById("zoomOut");
const btnZoomFit = document.getElementById("zoomFit");

const btnRotateLeft = document.getElementById("btnRotateLeft");
const btnRotateRight = document.getElementById("btnRotateRight");

const btnFlipH = document.getElementById("btnFlipH");
const btnFlipV = document.getElementById("btnFlipV");

const btnCrop = document.getElementById("btnCrop");

const btnAutoRotate = document.getElementById("btnAutoRotate");

const btnAutoPreset = document.getElementById("btnAutoPreset");

const btnBefore = document.getElementById("btnBefore");

const btnFullscreen = document.getElementById("btnFullscreen");

const btnSave = document.getElementById("btnSave");

const btnSavePNG = document.getElementById("btnSavePNG");

// ============================================
// Init
// ============================================

document.addEventListener(

    "DOMContentLoaded",

    initToolbar

);

function initToolbar(){

    bindUndo();

    bindRedo();

    bindReset();

    bindZoom();

    bindRotate();

    bindFlip();

    bindCrop();

    bindAutoRotate();

    bindPreset();

    bindBefore();

    bindFullscreen();

    bindExport();

}

// ============================================
// Undo
// ============================================

function bindUndo(){

    if(!btnUndo) return;

    btnUndo.onclick=undo;

}

// ============================================
// Redo
// ============================================

function bindRedo(){

    if(!btnRedo) return;

    btnRedo.onclick=redo;

}

// ============================================
// Reset
// ============================================

function bindReset(){

    if(!btnReset) return;

    btnReset.onclick=function(){

        saveState();

        resetEditor();

    };

}

// ============================================
// Zoom
// ============================================

function bindZoom(){

    btnZoomIn?.addEventListener(

        "click",

        zoomIn

    );

    btnZoomOut?.addEventListener(

        "click",

        zoomOut

    );

    btnZoomFit?.addEventListener(

        "click",

        fitImage

    );

}

// ============================================
// Rotate
// ============================================

function bindRotate(){

    btnRotateLeft?.addEventListener(

        "click",

        rotateLeft

    );

    btnRotateRight?.addEventListener(

        "click",

        rotateRight

    );

}

// ============================================
// Flip
// ============================================

function bindFlip(){

    btnFlipH?.addEventListener(

        "click",

        flipHorizontal

    );

    btnFlipV?.addEventListener(

        "click",

        flipVertical

    );

}

// ============================================
// Crop
// ============================================

function bindCrop(){

    if(!btnCrop) return;

    btnCrop.onclick=function(){

        if(typeof autoCrop==="function"){

            autoCrop();

        }

    };

}

// ============================================
// Auto Rotate
// ============================================

function bindAutoRotate(){

    if(!btnAutoRotate) return;

    btnAutoRotate.onclick=function(){

        if(typeof autoRotate==="function"){

            autoRotate();

        }

    };

}

// ============================================
// Auto Preset
// ============================================

function bindPreset(){

    if(!btnAutoPreset) return;

    btnAutoPreset.onclick=function(){

        if(typeof autoPreset==="function"){

            autoPreset();

        }

    };

}

// ============================================
// Before / After
// ============================================

function bindBefore(){

    if(!btnBefore) return;

    btnBefore.onclick=function(){

        EditorState.beforeAfter=

        !EditorState.beforeAfter;

        requestRender();

    };

}

// ============================================
// Fullscreen
// ============================================

function bindFullscreen(){

    if(!btnFullscreen) return;

    btnFullscreen.onclick=function(){

        if(!document.fullscreenElement){

            document.documentElement
            .requestFullscreen();

        }else{

            document.exitFullscreen();

        }

    };

}

// ============================================
// Export
// ============================================

function bindExport(){

    btnSave?.addEventListener(

        "click",

        function(){

            if(typeof saveJPEG==="function"){

                saveJPEG();

            }

        }

    );

    btnSavePNG?.addEventListener(

        "click",

        function(){

            if(typeof savePNG==="function"){

                savePNG();

            }

        }

    );

}
// ============================================
// Clamp
// ============================================

function clamp(v){

    if(v<0) return 0;

    if(v>255) return 255;

    return v;

}
// ============================================
// Pixel Loop
// ============================================

function eachPixel(data,callback){

    for(let i=0;i<data.length;i+=4){

        callback(i);

    }

}
// ============================================
// RGB
// ============================================

function getRGB(data,index){

    return{

        r:data[index],

        g:data[index+1],

        b:data[index+2]

    };

}

function setRGB(data,index,r,g,b){

    data[index]=clamp(r);

    data[index+1]=clamp(g);

    data[index+2]=clamp(b);

}
// ============================================
// Detect Negative
// ============================================

function detectNegative(data,width,height){

    // sementara kosong

}
// ============================================
// Orange Mask
// ============================================

function removeOrangeMask(data,width,height){

    // sementara kosong

}
// ============================================
// White Balance
// ============================================

function whiteBalance(data,width,height){

    // sementara kosong

}
// ============================================
// Invert
// ============================================

function invertNegative(data){

    eachPixel(data,function(i){

        data[i]=255-data[i];

        data[i+1]=255-data[i+1];

        data[i+2]=255-data[i+2];

    });

}
// ============================================
// Exposure
// ============================================

function applyExposure(data,s){

    if(s.exposure===0) return;

    const value=s.exposure*2.55;

    eachPixel(data,function(i){

        data[i]+=value;

        data[i+1]+=value;

        data[i+2]+=value;

    });

}
// ============================================
// Contrast
// ============================================

function applyContrast(data,s){

    if(s.contrast===0) return;

    const factor=

    (259*(s.contrast+255))/

    (255*(259-s.contrast));

    eachPixel(data,function(i){

        data[i]=

        clamp(

            factor*

            (data[i]-128)+128

        );

        data[i+1]=

        clamp(

            factor*

            (data[i+1]-128)+128

        );

        data[i+2]=

        clamp(

            factor*

            (data[i+2]-128)+128

        );

    });

}
function applySaturation(data,s){

    // berikutnya

}
function applyTemperature(data,s){

    // berikutnya

}
function applyGamma(data,s){

    // berikutnya

}
function toneCurve(data){

    // berikutnya

}
function applyLUT(data){

    // berikutnya

}
