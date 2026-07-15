/*
=========================================================
Film Scan Studio
AI Super Resolution Engine
Version 1.0
AppDIGI
=========================================================
*/


const SuperResolution = {


    scale:2,


    async enhance(canvas){


        console.log(
            "AI Super Resolution Started..."
        );



        const width =
            canvas.width;



        const height =
            canvas.height;



        const output =
            document.createElement(
                "canvas"
            );


        output.width =
            width * this.scale;


        output.height =
            height * this.scale;



        const ctx =
            output.getContext(
                "2d"
            );



        ctx.imageSmoothingEnabled =
            true;


        ctx.imageSmoothingQuality =
            "high";



        ctx.drawImage(
            canvas,
            0,
            0,
            output.width,
            output.height
        );



        console.log(
            "Upscale:",
            width,
            "x",
            height,
            "→",
            output.width,
            "x",
            output.height
        );



        return output;


    }



};



window.SuperResolution =
    SuperResolution;



console.log(
"AI Super Resolution Loaded"
);
