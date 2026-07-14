// ==========================================
// FilmHD
// Frame Engine v1.0
// Auto Frame Detection
// ==========================================

function detectFrame(imageData){

    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;

    let left = width;
    let right = 0;
    let top = height;
    let bottom = 0;

    const threshold = 35;

    for(let y=0; y<height; y++){

        for(let x=0; x<width; x++){

            const i = (y * width + x) * 4;

            const gray =
                (data[i] +
                 data[i+1] +
                 data[i+2]) / 3;

            if(gray > threshold){

                if(x < left) left = x;
                if(x > right) right = x;
                if(y < top) top = y;
                if(y > bottom) bottom = y;

            }

        }

    }

    return{

        x:left,
        y:top,
        width:right-left,
        height:bottom-top

    };

}
