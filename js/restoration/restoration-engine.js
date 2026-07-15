/*
=========================================================
Film Scan Studio
Advanced Restoration Engine
Version 1.0
AppDIGI
=========================================================
*/


const RestorationEngine = {


    async process(canvas){


        console.log(
            "================================"
        );

        console.log(
            "Advanced Restoration Started"
        );


        let ctx =
        canvas.getContext(
            "2d",
            {
                willReadFrequently:true
            }
        );


        let imageData =
        ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        );



        //--------------------------------
        // Dust
        //--------------------------------

        if(window.DustRemoval){

            imageData =
            DustRemoval.apply(
                imageData
            );

        }



        //--------------------------------
        // Scratch
        //--------------------------------

        if(window.ScratchRemoval){

            imageData =
            ScratchRemoval.apply(
                imageData
            );

        }



        //--------------------------------
        // Color
        //--------------------------------

        if(window.ColorRestoration){

            imageData =
            ColorRestoration.apply(
                imageData
            );

        }



        //--------------------------------
        // Face Detail
        //--------------------------------

        if(window.FaceDetail){

            imageData =
            FaceDetail.apply(
                imageData
            );

        }




        ctx.putImageData(
            imageData,
            0,
            0
        );



        console.log(
            "Advanced Restoration Finished"
        );


        return canvas;


    }


};



window.RestorationEngine =
RestorationEngine;


console.log(
"Restoration Engine Loaded"
);
