// ======================================
// FilmHD
// Render Engine
// ======================================

const EditorState = {

    rotation:0,

    zoom:1,

    offsetX:0,

    offsetY:0,

    crop:null,

    preset:"auto"

};

function render(){

    if(!image.width) return;

    ctx.save();

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.translate(
        canvas.width/2+EditorState.offsetX,
        canvas.height/2+EditorState.offsetY
    );

    ctx.scale(
        EditorState.zoom,
        EditorState.zoom
    );

    ctx.rotate(
        EditorState.rotation*Math.PI/180
    );

    ctx.drawImage(

        image,

        -image.width/2,

        -image.height/2

    );

    ctx.restore();

}
