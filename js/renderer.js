// =======================================
// FilmHD Renderer
// =======================================

const canvas =
document.getElementById("canvas");

const ctx =
canvas.getContext("2d");

function render(){

    if(!EditorState.image)
        return;

    canvas.width=
        EditorState.originalWidth;

    canvas.height=
        EditorState.originalHeight;

    ctx.clearRect(

        0,
        0,
        canvas.width,
        canvas.height

    );

    ctx.save();

    ctx.translate(

        canvas.width/2+
        EditorState.offsetX,

        canvas.height/2+
        EditorState.offsetY

    );

    ctx.scale(

        EditorState.zoom,

        EditorState.zoom

    );

    ctx.rotate(

        EditorState.rotation*
        Math.PI/180

    );

    ctx.drawImage(

        EditorState.image,

        -EditorState.originalWidth/2,

        -EditorState.originalHeight/2

    );

    ctx.restore();

}
