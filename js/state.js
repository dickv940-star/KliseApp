// ============================================
// FilmHD v2
// State Manager
// ============================================

const EditorState = {

    // Image
    image: null,

    originalWidth: 0,
    originalHeight: 0,

    // View
    zoom: 1,
    rotation: 0,

    offsetX: 0,
    offsetY: 0,

    flipX: false,
    flipY: false,

    crop: null,

    // Adjustment
    exposure: 0,
    contrast: 0,
    saturation: 0,
    temperature: 0,
    gamma: 1,

    // Film
    preset: "auto",

    // UI
    beforeAfter: false,

    // History
    history: [],
    redoStack: []

};

// ============================================
// Save State
// ============================================

function saveState(){

    const snapshot = {

        zoom: EditorState.zoom,
        rotation: EditorState.rotation,

        offsetX: EditorState.offsetX,
        offsetY: EditorState.offsetY,

        flipX: EditorState.flipX,
        flipY: EditorState.flipY,

        crop: EditorState.crop ?
            JSON.parse(JSON.stringify(EditorState.crop))
            : null,

        exposure: EditorState.exposure,
        contrast: EditorState.contrast,
        saturation: EditorState.saturation,
        temperature: EditorState.temperature,
        gamma: EditorState.gamma,

        preset: EditorState.preset

    };

    EditorState.history.push(snapshot);

    if(EditorState.history.length>50){

        EditorState.history.shift();

    }

    EditorState.redoStack=[];

}

// ============================================
// Undo
// ============================================

function undo(){

    if(EditorState.history.length===0)
        return;

    const current={

        zoom:EditorState.zoom,
        rotation:EditorState.rotation,

        offsetX:EditorState.offsetX,
        offsetY:EditorState.offsetY,

        flipX:EditorState.flipX,
        flipY:EditorState.flipY,

        crop:EditorState.crop ?
        JSON.parse(JSON.stringify(EditorState.crop))
        : null,

        exposure:EditorState.exposure,
        contrast:EditorState.contrast,
        saturation:EditorState.saturation,
        temperature:EditorState.temperature,
        gamma:EditorState.gamma,

        preset:EditorState.preset

    };

    EditorState.redoStack.push(current);

    const prev=EditorState.history.pop();

    Object.assign(EditorState,prev);

    if(typeof requestRender==="function"){

        requestRender();

    }

}

// ============================================
// Redo
// ============================================

function redo(){

    if(EditorState.redoStack.length===0)
        return;

    saveState();

    const next=EditorState.redoStack.pop();

    Object.assign(EditorState,next);

    if(typeof requestRender==="function"){

        requestRender();

    }

}

// ============================================
// Reset View
// ============================================

function resetView(){

    EditorState.zoom=1;

    EditorState.rotation=0;

    EditorState.offsetX=0;

    EditorState.offsetY=0;

    EditorState.flipX=false;

    EditorState.flipY=false;

    EditorState.crop=null;

}

// ============================================
// Reset Adjustment
// ============================================

function resetAdjustment(){

    EditorState.exposure=0;

    EditorState.contrast=0;

    EditorState.temperature=0;

    EditorState.saturation=0;

    EditorState.gamma=1;

    EditorState.preset="auto";

}

// ============================================
// Full Reset
// ============================================

function resetEditor(){

    resetView();

    resetAdjustment();

    if(typeof requestRender==="function"){

        requestRender();

    }

}
