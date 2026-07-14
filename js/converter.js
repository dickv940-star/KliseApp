// ======================================
// FilmHD
// converter.js
// Version : 0.3
// ======================================

const originalCanvas = document.createElement("canvas");
const originalCtx = originalCanvas.getContext("2d");

// ======================================
// Ambil ImageData Asli
// ======================================

function getOriginalImageData() {

    if (!image || !image.width) return null;

    originalCanvas.width = image.width;
    originalCanvas.height = image.height;

    originalCtx.clearRect(
        0,
        0,
        image.width,
        image.height
    );

    originalCtx.drawImage(image,0,0);

    return originalCtx.getImageData(
        0,
        0,
        image.width,
        image.height
    );

}

// ======================================
// Update Image
// Dipanggil setiap slider berubah
// ======================================

function updateImage(){

    const imgData = getOriginalImageData();

    if(!imgData) return;

    processImage(imgData);

    ctx.putImageData(
        imgData,
        0,
        0
    );

}

// ======================================
// Mesin Konversi
// ======================================

function processImage(imageData){

    const data = imageData.data;

    const exp =
        Number(exposure.value);

    const con =
        Number(contrast.value);

    const temp =
        Number(temperature.value);

    const sat =
        Number(saturation.value);

    //------------------------------------
    // Loop Pixel
    //------------------------------------

    for(let i=0;i<data.length;i+=4){

        let r=data[i];
        let g=data[i+1];
        let b=data[i+2];

        // ===============================
        // 1. Negative -> Positive
        // ===============================

        r=255-r;
        g=255-g;
        b=255-b;

        // ===============================
        // 2. Exposure
        // ===============================

        const exposureFactor =
            exp*1.8;

        r+=exposureFactor;
        g+=exposureFactor;
        b+=exposureFactor;

        // ===============================
        // 3. White Balance
        // ===============================

        r+=temp*0.7;
        b-=temp*0.7;

        // ===============================
        // 4. Contrast
        // ===============================

        const factor =
            (259*(con+255))/
            (255*(259-con));

        r=factor*(r-128)+128;
        g=factor*(g-128)+128;
        b=factor*(b-128)+128;

        // ===============================
        // 5. Saturation
        // ===============================

        const gray=
            0.299*r+
            0.587*g+
            0.114*b;

        const satFactor=
            1+(sat/100);

        r=gray+(r-gray)*satFactor;
        g=gray+(g-gray)*satFactor;
        b=gray+(b-gray)*satFactor;

        // ===============================
        // Clamp
        // ===============================

        data[i]=Math.max(0,Math.min(255,r));
        data[i+1]=Math.max(0,Math.min(255,g));
        data[i+2]=Math.max(0,Math.min(255,b));

    }

}

// ======================================
// Reset Converter
// ======================================

function resetConverter(){

    exposure.value=0;
    contrast.value=0;
    temperature.value=0;
    saturation.value=0;

    updateImage();

}
