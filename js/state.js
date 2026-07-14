// =======================================
// FilmHD v2
// state.js
// =======================================

const EditorState = {

    image: null,

    originalWidth: 0,
    originalHeight: 0,

    zoom: 1,

    rotation: 0,

    offsetX: 0,
    offsetY: 0,

    crop: null,

    exposure: 0,

    contrast: 0,

    temperature: 0,

    saturation: 0,

    gamma: 1,

    preset: "auto",

    history: [],

    redo: []

};

function saveState(){

    EditorState.history.push(

        JSON.parse(
            JSON.stringify(EditorState)
        )

    );

    if(EditorState.history.length>30){

        EditorState.history.shift();

    }

}

function undo(){

    if(EditorState.history.length==0)
        return;

    EditorState.redo.push(

        JSON.parse(
            JSON.stringify(EditorState)
        )

    );

    const state=
        EditorState.history.pop();

    Object.assign(
        EditorState,
        state
    );

    render();

}

function redo(){

    if(EditorState.redo.length==0)
        return;

    saveState();

    const state=
        EditorState.redo.pop();

    Object.assign(
        EditorState,
        state
    );

    render();

}
