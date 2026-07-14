// ============================================
// FilmHD v2
// viewer.js
// Zoom • Pan • Touch • Gesture
// ============================================

"use strict";

// ============================================
// Runtime
// ============================================

let dragging = false;

let lastX = 0;
let lastY = 0;

let pinchDistance = 0;

const MIN_ZOOM = 0.1;
const MAX_ZOOM = 20;

// ============================================
// Init
// ============================================

document.addEventListener(

    "DOMContentLoaded",

    initViewer

);

function initViewer(){

    initMouse();

    initWheel();

    initTouch();

}

// ============================================
// Mouse
// ============================================

function initMouse(){

    canvas.addEventListener(

        "mousedown",

        mouseDown

    );

    window.addEventListener(

        "mousemove",

        mouseMove

    );

    window.addEventListener(

        "mouseup",

        mouseUp

    );

    canvas.addEventListener(

        "dblclick",

        fitImage

    );

}

// ============================================
// Mouse Down
// ============================================

function mouseDown(e){

    dragging = true;

    lastX = e.clientX;

    lastY = e.clientY;

}

// ============================================
// Mouse Move
// ============================================

function mouseMove(e){

    if(!dragging)
        return;

    const dx =
        e.clientX - lastX;

    const dy =
        e.clientY - lastY;

    lastX = e.clientX;

    lastY = e.clientY;

    EditorState.offsetX += dx;

    EditorState.offsetY += dy;

    requestRender();

}

// ============================================
// Mouse Up
// ============================================

function mouseUp(){

    dragging = false;

}

// ============================================
// Mouse Wheel Zoom
// ============================================

function initWheel(){

    canvas.addEventListener(

        "wheel",

        mouseWheel,

        {passive:false}

    );

}

function mouseWheel(e){

    e.preventDefault();

    if(e.deltaY < 0){

        zoomIn();

    }else{

        zoomOut();

    }

}

// ============================================
// Touch
// ============================================

function initTouch(){

    canvas.addEventListener(

        "touchstart",

        touchStart,

        {passive:false}

    );

    canvas.addEventListener(

        "touchmove",

        touchMove,

        {passive:false}

    );

    canvas.addEventListener(

        "touchend",

        touchEnd

    );

}

// ============================================
// Touch Start
// ============================================

function touchStart(e){

    if(e.touches.length==1){

        dragging=true;

        lastX=e.touches[0].clientX;

        lastY=e.touches[0].clientY;

    }

    if(e.touches.length==2){

        pinchDistance=

        distance(

            e.touches[0],

            e.touches[1]

        );

    }

}

// ============================================
// Touch Move
// ============================================

function touchMove(e){

    e.preventDefault();

    if(e.touches.length==1){

        const dx=

        e.touches[0].clientX-lastX;

        const dy=

        e.touches[0].clientY-lastY;

        lastX=e.touches[0].clientX;

        lastY=e.touches[0].clientY;

        EditorState.offsetX+=dx;

        EditorState.offsetY+=dy;

        requestRender();

    }

    if(e.touches.length==2){

        const d=

        distance(

            e.touches[0],

            e.touches[1]

        );

        const ratio=

        d/pinchDistance;

        EditorState.zoom*=ratio;

        clampZoom();

        pinchDistance=d;

        requestRender();

    }

}

// ============================================
// Touch End
// ============================================

function touchEnd(){

    dragging=false;

    pinchDistance=0;

}

// ============================================
// Distance
// ============================================

function distance(a,b){

    const dx=

    a.clientX-b.clientX;

    const dy=

    a.clientY-b.clientY;

    return Math.sqrt(

        dx*dx+

        dy*dy

    );

}

// ============================================
// Zoom
// ============================================

function zoomIn(){

    EditorState.zoom*=1.1;

    clampZoom();

    requestRender();

}

function zoomOut(){

    EditorState.zoom/=1.1;

    clampZoom();

    requestRender();

}

function setZoom(value){

    EditorState.zoom=value;

    clampZoom();

    requestRender();

}

function clampZoom(){

    if(EditorState.zoom<MIN_ZOOM)

        EditorState.zoom=MIN_ZOOM;

    if(EditorState.zoom>MAX_ZOOM)

        EditorState.zoom=MAX_ZOOM;

}

// ============================================
// Fit Image
// ============================================

function fitImage(){

    if(!EditorState.image)
        return;

    const sx=

    canvas.width/

    EditorState.originalWidth;

    const sy=

    canvas.height/

    EditorState.originalHeight;

    EditorState.zoom=

    Math.min(sx,sy);

    EditorState.offsetX=0;

    EditorState.offsetY=0;

    requestRender();

}

// ============================================
// Rotate
// ============================================

function rotateLeft(){

    EditorState.rotation-=90;

    requestRender();

}

function rotateRight(){

    EditorState.rotation+=90;

    requestRender();

}

// ============================================
// Flip
// ============================================

function flipHorizontal(){

    EditorState.flipX=

    !EditorState.flipX;

    requestRender();

}

function flipVertical(){

    EditorState.flipY=

    !EditorState.flipY;

    requestRender();

}

// ============================================
// Reset View
// ============================================

function resetViewer(){

    resetView();

    fitImage();

}
