// =========================================
// FilmHD
// Rotate Engine v1.0
// =========================================

// Sudut saat ini
let currentRotation = 0;

// =========================================
// Rotate Canvas
// =========================================

function rotateCanvas(angle){

    currentRotation += angle;

    const temp = document.createElement("canvas");

    const tctx = temp.getContext("2d");

    const rad = currentRotation * Math.PI / 180;

    const w = canvas.width;
    const h = canvas.height;

    const size = Math.ceil(
        Math.sqrt(w*w + h*h)
    );

    temp.width = size;
    temp.height = size;

    tctx.translate(size/2,size/2);

    tctx.rotate(rad);

    tctx.drawImage(
        canvas,
        -w/2,
        -h/2
    );

    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0,0,size,size);

    ctx.drawImage(temp,0,0);

}

// =========================================
// Edge Score
// =========================================

function edgeScore(imageData){

    const data=imageData.data;

    let score=0;

    for(let i=0;i<data.length-4;i+=4){

        score+=Math.abs(data[i]-data[i+4]);

    }

    return score;

}

// =========================================
// Auto Rotate
// =========================================

function autoRotate(){

    let bestAngle=0;

    let bestScore=-1;

    for(let a=-5;a<=5;a+=0.5){

        rotateCanvas(a);

        const img=ctx.getImageData(

            0,
            0,
            canvas.width,
            canvas.height

        );

        const score=edgeScore(img);

        if(score>bestScore){

            bestScore=score;

            bestAngle=a;

        }

        rotateCanvas(-a);

    }

    rotateCanvas(bestAngle);

}
