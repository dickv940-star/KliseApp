// ==========================================
// FilmHD
// curveEngine.js
// RGB Tone Curve Engine
// ==========================================

// Curve LUT (256 nilai)
let rgbCurve = new Array(256);
let redCurve = new Array(256);
let greenCurve = new Array(256);
let blueCurve = new Array(256);

// ==========================================
// Linear Curve
// ==========================================

function resetCurves(){

    for(let i=0;i<256;i++){

        rgbCurve[i]=i;
        redCurve[i]=i;
        greenCurve[i]=i;
        blueCurve[i]=i;

    }

}

// ==========================================
// Gamma Curve
// ==========================================

function generateGammaCurve(gamma){

    gamma=Math.max(0.1,gamma);

    for(let i=0;i<256;i++){

        rgbCurve[i]=
        Math.round(
            255*Math.pow(i/255,1/gamma)
        );

    }

}

// ==========================================
// S Curve
// ==========================================

function generateSCurve(strength=0.2){

    for(let i=0;i<256;i++){

        let x=i/255;

        x=x+(strength*(x-0.5));

        x=Math.max(0,Math.min(1,x));

        rgbCurve[i]=Math.round(x*255);

    }

}

// ==========================================
// Highlight Compression
// ==========================================

function compressHighlight(){

    for(let i=180;i<256;i++){

        rgbCurve[i]=
            180+
            (i-180)*0.7;

    }

}

// ==========================================
// Shadow Lift
// ==========================================

function liftShadow(){

    for(let i=0;i<70;i++){

        rgbCurve[i]=
            i*0.85+10;

    }

}

// ==========================================
// RGB Curve
// ==========================================

function applyCurve(r,g,b){

    r=redCurve[
        rgbCurve[Math.round(r)]
    ];

    g=greenCurve[
        rgbCurve[Math.round(g)]
    ];

    b=blueCurve[
        rgbCurve[Math.round(b)]
    ];

    return [

        clamp(r),

        clamp(g),

        clamp(b)

    ];

}

// ==========================================
// Warm Curve
// ==========================================

function warmCurve(){

    for(let i=0;i<256;i++){

        redCurve[i]=
            clamp(i+6);

        greenCurve[i]=
            i;

        blueCurve[i]=
            clamp(i-4);

    }

}

// ==========================================
// Cool Curve
// ==========================================

function coolCurve(){

    for(let i=0;i<256;i++){

        redCurve[i]=
            clamp(i-5);

        greenCurve[i]=
            i;

        blueCurve[i]=
            clamp(i+7);

    }

}

// ==========================================
// Neutral Curve
// ==========================================

resetCurves();
