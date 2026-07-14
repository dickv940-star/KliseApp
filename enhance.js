// ======================================
// FilmHD
// enhance.js
// ======================================

const histogramCanvas = document.getElementById("histogramCanvas");
const histogramCtx = histogramCanvas.getContext("2d");

// ======================================
// Histogram
// ======================================

function drawHistogram(imageData){

    if(!histogramCanvas) return;

    histogramCanvas.width = 256;
    histogramCanvas.height = 120;

    histogramCtx.clearRect(
        0,
        0,
        histogramCanvas.width,
        histogramCanvas.height
    );

    const hist = new Array(256).fill(0);

    const data = imageData.data;

    for(let i=0;i<data.length;i+=4){

        const gray =
            Math.round(
                (data[i]+data[i+1]+data[i+2])/3
            );

        hist[gray]++;

    }

    const max = Math.max(...hist);

    histogramCtx.beginPath();

    for(let i=0;i<256;i++){

        const h =
            (hist[i]/max)*120;

        histogramCtx.moveTo(i,120);
        histogramCtx.lineTo(i,120-h);

    }

    histogramCtx.strokeStyle="#FFC107";
    histogramCtx.lineWidth=1;
    histogramCtx.stroke();

}

// ======================================
// Auto Exposure
// ======================================

function autoExposure(imageData){

    const data=imageData.data;

    let total=0;
    let count=0;

    for(let i=0;i<data.length;i+=4){

        total +=
            (data[i]+data[i+1]+data[i+2])/3;

        count++;

    }

    const avg=total/count;

    const target=128;

    exposure.value=
        Math.round(
            (target-avg)/1.8
        );

}

// ======================================
// Auto White Balance
// Gray World Algorithm
// ======================================

function autoWhiteBalance(imageData){

    const data=imageData.data;

    let r=0;
    let g=0;
    let b=0;

    let count=0;

    for(let i=0;i<data.length;i+=4){

        r+=data[i];
        g+=data[i+1];
        b+=data[i+2];

        count++;

    }

    r/=count;
    g/=count;
    b/=count;

    const diff=(r-b)/2;

    temperature.value=
        Math.round(-diff/2);

}

// ======================================
// Auto Contrast
// ======================================

function autoContrast(imageData){

    const data=imageData.data;

    let min=255;
    let max=0;

    for(let i=0;i<data.length;i+=4){

        const gray=
            (data[i]+data[i+1]+data[i+2])/3;

        if(gray<min) min=gray;
        if(gray>max) max=gray;

    }

    const range=max-min;

    contrast.value=
        Math.round(
            (255-range)/2
        );

}

// ======================================
// AUTO ENHANCE
// ======================================

function autoEnhance(){

    const img=getOriginalImageData();

    if(!img) return;

    autoExposure(img);

    autoWhiteBalance(img);

    autoContrast(img);

    updateImage();

    drawHistogram(img);

}

// ======================================
// Refresh Histogram
// ======================================

function refreshHistogram(){

    const img=getOriginalImageData();

    if(!img) return;

    drawHistogram(img);

}
