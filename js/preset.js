// ======================================
// FilmHD
// preset.js
// Version : 0.3
// ======================================

const presetList = {

    auto: {
        exposure: 12,
        contrast: 18,
        temperature: 6,
        saturation: 14
    },

    kodak_gold: {
        exposure: 10,
        contrast: 20,
        temperature: 18,
        saturation: 22
    },

    portra: {
        exposure: 8,
        contrast: 10,
        temperature: 10,
        saturation: 8
    },

    ultramax: {
        exposure: 15,
        contrast: 25,
        temperature: 12,
        saturation: 20
    },

    fuji_c200: {
        exposure: 5,
        contrast: 12,
        temperature: -8,
        saturation: 12
    },

    superia: {
        exposure: 6,
        contrast: 15,
        temperature: -10,
        saturation: 16
    },

    pro400h: {
        exposure: 8,
        contrast: 8,
        temperature: -5,
        saturation: 6
    },

    hp5: {
        exposure: 10,
        contrast: 35,
        temperature: 0,
        saturation: -100
    }

};

// ======================================
// Terapkan preset berdasarkan nama
// ======================================

function applyPreset(name){

    const p = presetList[name];

    if(!p){
        console.warn("Preset tidak ditemukan:", name);
        return;
    }

    exposure.value = p.exposure;
    contrast.value = p.contrast;
    temperature.value = p.temperature;
    saturation.value = p.saturation;

    updateImage();

    if(typeof refreshHistogram === "function"){
        refreshHistogram();
    }

}

// ======================================
// Tombol AUTO PRESET
// ======================================

function applyAutoPreset(){

    applyPreset("auto");

}

// ======================================
// Saat dropdown preset berubah
// ======================================

const presetSelect = document.getElementById("preset");

if(presetSelect){

    presetSelect.addEventListener("change", function(){

        applyPreset(this.value);

    });

}

// ======================================
// Tambah preset baru saat runtime
// ======================================

function registerPreset(name, values){

    presetList[name] = values;

}

// ======================================
// Daftar preset
// ======================================

function getPresetList(){

    return Object.keys(presetList);

}
