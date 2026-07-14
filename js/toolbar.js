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
