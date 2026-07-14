// =====================================
// FilmHD
// colorEngine.js
// Version 1.0
// =====================================

// ------------------------------
// Clamp
// ------------------------------

function clamp(v){

    return Math.max(0,Math.min(255,v));

}

// ------------------------------
// Gamma
// ------------------------------

function applyGamma(r,g,b,gamma){

    gamma = Math.max(0.1,gamma);

    r = 255*Math.pow(r/255,1/gamma);
    g = 255*Math.pow(g/255,1/gamma);
    b = 255*Math.pow(b/255,1/gamma);

    return [r,g,b];

}

// ------------------------------
// Exposure
// ------------------------------

function applyExposure(r,g,b,exp){

    r += exp;
    g += exp;
    b += exp;

    return [r,g,b];

}

// ------------------------------
// Contrast
// ------------------------------

function applyContrast(r,g,b,value){

    const factor =
        (259*(value+255))/
        (255*(259-value));

    r = factor*(r-128)+128;
    g = factor*(g-128)+128;
    b = factor*(b-128)+128;

    return [r,g,b];

}

// ------------------------------
// White Balance
// ------------------------------

function applyTemperature(r,g,b,temp){

    r += temp;

    b -= temp;

    return [r,g,b];

}

// ------------------------------
// Saturation
// ------------------------------

function applySaturation(r,g,b,sat){

    const gray =
        0.299*r+
        0.587*g+
        0.114*b;

    const factor =
        1 + sat/100;

    r = gray+(r-gray)*factor;
    g = gray+(g-gray)*factor;
    b = gray+(b-gray)*factor;

    return [r,g,b];

}

// ------------------------------
// Orange Mask Removal
// ------------------------------

function removeOrangeMask(r,g,b){

    // Koreksi dasar.
    // Nantinya akan diganti dengan profil film.

    r *= 0.93;
    g *= 1.02;
    b *= 1.18;

    return [r,g,b];

}

// ------------------------------
// Invert Negative
// ------------------------------

function invertNegative(r,g,b){

    return [

        255-r,

        255-g,

        255-b

    ];

}

// ------------------------------
// Pipeline
// ------------------------------

function processPixel(r,g,b,settings){

    // Negative

    [r,g,b] =
        invertNegative(r,g,b);

    // Orange Mask

    [r,g,b] =
        removeOrangeMask(r,g,b);

    // Exposure

    [r,g,b] =
        applyExposure(
            r,
            g,
            b,
            settings.exposure
        );

    // Contrast

    [r,g,b] =
        applyContrast(
            r,
            g,
            b,
            settings.contrast
        );

    // White Balance

    [r,g,b] =
        applyTemperature(
            r,
            g,
            b,
            settings.temperature
        );

    // Saturation

    [r,g,b] =
        applySaturation(
            r,
            g,
            b,
            settings.saturation
        );

    // Gamma

    [r,g,b] =
        applyGamma(
            r,
            g,
            b,
            settings.gamma
        );

    return [

        clamp(r),

        clamp(g),

        clamp(b)

    ];

}
