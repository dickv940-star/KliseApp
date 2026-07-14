// ==========================================
// FilmHD
// filmEngine.js
// Version 1.0
// ==========================================

// ==========================================
// Film Profile
// ==========================================

const FilmProfile = {

    KODAK:{

        red:1.04,
        green:1.00,
        blue:0.96,

        gamma:1.03,

        warmth:12

    },

    PORTRA:{

        red:1.02,
        green:1.01,
        blue:0.98,

        gamma:1.05,

        warmth:8

    },

    FUJI:{

        red:0.96,
        green:1.04,
        blue:1.06,

        gamma:1.02,

        warmth:-6

    },

    ILFORD:{

        red:1,
        green:1,
        blue:1,

        gamma:1,

        warmth:0

    }

};

// ==========================================
// Apply Film Profile
// ==========================================

function applyFilmProfile(r,g,b,profile){

    r*=profile.red;
    g*=profile.green;
    b*=profile.blue;

    [r,g,b]=applyGamma(
        r,g,b,
        profile.gamma
    );

    [r,g,b]=applyTemperature(
        r,g,b,
        profile.warmth
    );

    return [r,g,b];

}

// ==========================================
// Detect Film
// ==========================================

function detectFilm(){

    const preset=document
        .getElementById("preset")
        .value;

    switch(preset){

        case "kodak_gold":
        case "ultramax":
        return FilmProfile.KODAK;

        case "portra":
        return FilmProfile.PORTRA;

        case "fuji_c200":
        case "superia":
        case "pro400h":
        return FilmProfile.FUJI;

        case "hp5":
        return FilmProfile.ILFORD;

        default:
        return FilmProfile.KODAK;

    }

}

// ==========================================
// Tone Curve
// ==========================================

function toneCurve(value){

    value/=255;

    value=Math.pow(value,0.95);

    return value*255;

}

// ==========================================
// Apply Tone Curve
// ==========================================

function applyToneCurve(r,g,b){

    r=toneCurve(r);
    g=toneCurve(g);
    b=toneCurve(b);

    return [r,g,b];

}

// ==========================================
// Final Film Engine
// ==========================================

function filmEngine(r,g,b){

    const profile=
        detectFilm();

    [r,g,b]=
        applyFilmProfile(
            r,g,b,
            profile
        );

    [r,g,b]=
        applyToneCurve(
            r,g,b
        );

    return [r,g,b];

}
