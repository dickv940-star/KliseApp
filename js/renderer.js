// ============================================
// FilmHD v2
// Renderer
// ============================================

// --------------------------------------------
// Canvas
// --------------------------------------------

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d",{

    willReadFrequently:true

});

// --------------------------------------------
// Render Queue
// --------------------------------------------

let renderPending=false;

// --------------------------------------------
// Request Render
// --------------------------------------------

function requestRender(){

    if(renderPending) return;

    renderPending=true;

    requestAnimationFrame(function(){

        renderPending=false;

        render();

    });

}

// --------------------------------------------
// Create Processed Canvas
// --------------------------------------------

function createProcessedCanvas(){

    if(!EditorState.image)
        return null;

    const temp=document.createElement("canvas");

    temp.width=
        EditorState.originalWidth;

    temp.height=
        EditorState.originalHeight;

    const tctx=temp.getContext("2d",{

        willReadFrequently:true

    });

    tctx.drawImage(

        EditorState.image,

        0,

        0

    );

    const imgData=tctx.getImageData(

        0,

        0,

        temp.width,

        temp.height

    );

    // ===========================
    // Converter Pipeline
    // ===========================

    if(typeof convertImage==="function"){

        convertImage(imgData);

    }

    tctx.putImageData(

        imgData,

        0,

        0

    );

    return temp;

}

// --------------------------------------------
// Draw Image
// --------------------------------------------

function drawProcessedImage(img){

    if(EditorState.crop){

        const c=EditorState.crop;

        ctx.drawImage(

            img,

            c.x,

            c.y,

            c.width,

            c.height,

            -c.width/2,

            -c.height/2,

            c.width,

            c.height

        );

        return;

    }

    ctx.drawImage(

        img,

        -img.width/2,

        -img.height/2

    );

}

// --------------------------------------------
// Draw Original
// --------------------------------------------

function drawOriginal(){

    ctx.drawImage(

        EditorState.image,

        -EditorState.originalWidth/2,

        -EditorState.originalHeight/2

    );

}

// --------------------------------------------
// Main Render
// --------------------------------------------

function render(){

    if(!EditorState.image)
        return;

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

        EditorState.flipX?-EditorState.zoom:EditorState.zoom,

        EditorState.flipY?-EditorState.zoom:EditorState.zoom

    );

    ctx.rotate(

        EditorState.rotation*

        Math.PI/180

    );

    if(EditorState.beforeAfter){

        drawOriginal();

    }else{

        const img=createProcessedCanvas();

        if(img){

            drawProcessedImage(img);

        }

    }

    ctx.restore();

    updateHistogram();

}

// --------------------------------------------
// Histogram
// --------------------------------------------

function updateHistogram(){

    if(typeof refreshHistogram==="function"){

        refreshHistogram();

    }

}

// --------------------------------------------
// Resize Canvas
// --------------------------------------------

function resizeCanvas(){

    if(!EditorState.image)
        return;

    canvas.width=

        EditorState.originalWidth;

    canvas.height=

        EditorState.originalHeight;

    requestRender();

}

window.addEventListener(

    "resize",

    resizeCanvas

);
