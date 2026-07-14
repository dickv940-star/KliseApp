// ==========================================
// FilmHD
// hslEngine.js
// Version 1.0
// ==========================================

// =============================
// Default HSL Settings
// =============================

const HSL = {

    red:{h:0,s:0,l:0},
    orange:{h:0,s:0,l:0},
    yellow:{h:0,s:0,l:0},
    green:{h:0,s:0,l:0},
    aqua:{h:0,s:0,l:0},
    blue:{h:0,s:0,l:0},
    purple:{h:0,s:0,l:0},
    magenta:{h:0,s:0,l:0}

};

// =============================
// RGB -> HSV
// =============================

function rgbToHsv(r,g,b){

    r/=255;
    g/=255;
    b/=255;

    const max=Math.max(r,g,b);
    const min=Math.min(r,g,b);

    let h,s,v=max;

    const d=max-min;

    s=max===0?0:d/max;

    if(max===min){

        h=0;

    }else{

        switch(max){

            case r:
                h=(g-b)/d+(g<b?6:0);
                break;

            case g:
                h=(b-r)/d+2;
                break;

            case b:
                h=(r-g)/d+4;
                break;

        }

        h/=6;

    }

    return{

        h:h*360,
        s:s,
        v:v

    };

}

// =============================
// HSV -> RGB
// =============================

function hsvToRgb(h,s,v){

    let r,g,b;

    let i=Math.floor(h/60);

    let f=h/60-i;

    let p=v*(1-s);

    let q=v*(1-f*s);

    let t=v*(1-(1-f)*s);

    switch(i%6){

        case 0:r=v;g=t;b=p;break;
        case 1:r=q;g=v;b=p;break;
        case 2:r=p;g=v;b=t;break;
        case 3:r=p;g=q;b=v;break;
        case 4:r=t;g=p;b=v;break;
        case 5:r=v;g=p;b=q;break;

    }

    return[
        Math.round(r*255),
        Math.round(g*255),
        Math.round(b*255)
    ];

}

// =============================
// Hue Group
// =============================

function getGroup(h){

    if(h<20) return HSL.red;
    if(h<45) return HSL.orange;
    if(h<70) return HSL.yellow;
    if(h<150) return HSL.green;
    if(h<200) return HSL.aqua;
    if(h<260) return HSL.blue;
    if(h<310) return HSL.purple;

    return HSL.magenta;

}

// =============================
// Apply HSL
// =============================

function applyHSL(r,g,b){

    let hsv=rgbToHsv(r,g,b);

    const group=getGroup(hsv.h);

    hsv.h+=group.h;

    hsv.s+=group.s/100;

    hsv.v+=group.l/100;

    hsv.h=(hsv.h+360)%360;

    hsv.s=Math.max(0,Math.min(1,hsv.s));

    hsv.v=Math.max(0,Math.min(1,hsv.v));

    return hsvToRgb(

        hsv.h,

        hsv.s,

        hsv.v

    );

}

// =============================
// Reset
// =============================

function resetHSL(){

    for(let key in HSL){

        HSL[key].h=0;
        HSL[key].s=0;
        HSL[key].l=0;

    }

}
