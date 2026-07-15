/*
=========================================================
Film Scan Studio
Super Resolution Engine
Version 2.0
AppDIGI
=========================================================
*/


const SuperResolution = {


    async enhance(canvas){


        console.log(
            "Super Resolution Start..."
        );


        return new Promise(resolve=>{


            const output =
                document.createElement(
                    "canvas"
                );


            output.width =
                canvas.width * 2;


            output.height =
                canvas.height * 2;



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
                "Super Resolution:",
                output.width,
                "x",
                output.height
            );



            resolve(
                output
            );


        });


    }


};



window.SuperResolution =
    SuperResolution;



console.log(
    "Super Resolution Loaded"
);
