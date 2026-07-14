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

    let r=0;
    let g=0;
    let b=0;

    const pixels=data.length/4;

    eachPixel(data,function(i){

        r+=data[i];
        g+=data[i+1];
        b+=data[i+2];

    });

    r/=pixels;
    g/=pixels;
    b/=pixels;

    // Jika merah lebih dominan kemungkinan negatif film

    if(r>g && r>b){

        EditorState.isNegative=true;

    }else{

        EditorState.isNegative=false;

    }

}
// ============================================
// Orange Mask Removal
// ============================================

function removeOrangeMask(data,width,height){

    if(!EditorState.isNegative)
        return;

    let r=0;
    let g=0;
    let b=0;

    const sample=5000;

    let count=0;

    for(let i=0;i<data.length;i+=4){

        r+=data[i];
        g+=data[i+1];
        b+=data[i+2];

        count++;

        if(count>=sample)
            break;

    }

    r/=count;
    g/=count;
    b/=count;

    const dr=r-g;
    const db=b-g;

    eachPixel(data,function(i){

        data[i]-=dr;

        data[i+2]-=db;

    });

}
// ============================================
// Gray World White Balance
// ============================================

function whiteBalance(data){

    let r=0;
    let g=0;
    let b=0;

    const pixels=data.length/4;

    eachPixel(data,function(i){

        r+=data[i];
        g+=data[i+1];
        b+=data[i+2];

    });

    r/=pixels;
    g/=pixels;
    b/=pixels;

    const gray=(r+g+b)/3;

    const rg=gray/r;
    const gg=gray/g;
    const bg=gray/b;

    eachPixel(data,function(i){

        data[i]*=rg;

        data[i+1]*=gg;

        data[i+2]*=bg;

    });

}
// ============================================
// Histogram
// ============================================

function calculateHistogram(data){

    const hist=new Array(256).fill(0);

    eachPixel(data,function(i){

        const y=Math.round(

            0.299*data[i]+

            0.587*data[i+1]+

            0.114*data[i+2]

        );

        hist[y]++;

    });

    return hist;

}
// ============================================
// Auto Exposure
// ============================================

function autoExposure(data){

    const hist=

    calculateHistogram(data);

    let sum=0;

    let total=0;

    for(let i=0;i<256;i++){

        sum+=hist[i]*i;

        total+=hist[i];

    }

    const mean=sum/total;

    const shift=128-mean;

    eachPixel(data,function(i){

        data[i]+=shift;

        data[i+1]+=shift;

        data[i+2]+=shift;

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
// ============================================
// RGB -> HSL
// ============================================

function rgbToHsl(r,g,b){

    r/=255;
    g/=255;
    b/=255;

    const max=Math.max(r,g,b);
    const min=Math.min(r,g,b);

    let h,s,l;

    l=(max+min)/2;

    if(max===min){

        h=0;
        s=0;

    }else{

        const d=max-min;

        s=l>0.5
            ? d/(2-max-min)
            : d/(max+min);

        switch(max){

            case r:

                h=(g-b)/d+(g<b?6:0);
                break;

            case g:

                h=(b-r)/d+2;
                break;

            default:

                h=(r-g)/d+4;

        }

        h/=6;

    }

    return{

        h,
        s,
        l

    };

}
// ============================================
// HSL -> RGB
// ============================================

function hslToRgb(h,s,l){

    let r,g,b;

    if(s===0){

        r=l;
        g=l;
        b=l;

    }else{

        function hue2rgb(p,q,t){

            if(t<0) t+=1;
            if(t>1) t-=1;

            if(t<1/6)
                return p+(q-p)*6*t;

            if(t<1/2)
                return q;

            if(t<2/3)
                return p+(q-p)*(2/3-t)*6;

            return p;

        }

        const q=l<0.5
            ? l*(1+s)
            : l+s-l*s;

        const p=2*l-q;

        r=hue2rgb(p,q,h+1/3);
        g=hue2rgb(p,q,h);
        b=hue2rgb(p,q,h-1/3);

    }

    return{

        r:Math.round(r*255),

        g:Math.round(g*255),

        b:Math.round(b*255)

    };

}
// ============================================
// Saturation
// ============================================

function applySaturation(data,s){

    if(s.saturation===0)
        return;

    const factor=

        s.saturation/100;

    eachPixel(data,function(i){

        let hsl=

        rgbToHsl(

            data[i],

            data[i+1],

            data[i+2]

        );

        hsl.s+=factor;

        if(hsl.s<0)
            hsl.s=0;

        if(hsl.s>1)
            hsl.s=1;

        const rgb=

        hslToRgb(

            hsl.h,

            hsl.s,

            hsl.l

        );

        setRGB(

            data,

            i,

            rgb.r,

            rgb.g,

            rgb.b

        );

    });

}
// ============================================
// Temperature
// ============================================

function applyTemperature(data,s){

    if(s.temperature===0)
        return;

    const t=

    s.temperature*0.8;

    eachPixel(data,function(i){

        data[i]+=t;

        data[i+2]-=t;

    });

}
// ============================================
// Gamma
// ============================================

function applyGamma(data,s){

    if(s.gamma===1)
        return;

    const inv=

    1/s.gamma;

    eachPixel(data,function(i){

        data[i]=

        clamp(

            255*

            Math.pow(

                data[i]/255,

                inv

            )

        );

        data[i+1]=

        clamp(

            255*

            Math.pow(

                data[i+1]/255,

                inv

            )

        );

        data[i+2]=

        clamp(

            255*

            Math.pow(

                data[i+2]/255,

                inv

            )

        );

    });

}
// ============================================
// Tone Curve
// ============================================

function toneCurve(data){

    eachPixel(data,function(i){

        data[i]=

        clamp(

            Math.pow(

                data[i]/255,

                0.95

            )*255

        );

        data[i+1]=

        clamp(

            Math.pow(

                data[i+1]/255,

                0.95

            )*255

        );

        data[i+2]=

        clamp(

            Math.pow(

                data[i+2]/255,

                0.95

            )*255

        );

    });

}
// ============================================
// LUT
// ============================================

function applyLUT(data){

    // sementara kosong
    // nanti preset.js akan mengisi

}
