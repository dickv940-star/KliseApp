/*
=========================================================
Film Scan Studio
HD Detail Enhance Engine
Version 1.0
AppDIGI
=========================================================
*/


window.DetailEnhance = {


    name:"HD Detail Enhance",


    apply(imageData){

        console.log(
            "Applying HD Detail Enhance..."
        );


        const data =
            imageData.data;


        const strength = 1.15;


        for(
            let i=0;
            i<data.length;
            i+=4
        ){

            let r=data[i];
            let g=data[i+1];
            let b=data[i+2];


            r =
            128 +
            (r-128) *
            strength;


            g =
            128 +
            (g-128) *
            strength;


            b =
            128 +
            (b-128) *
            strength;



            data[i] =
            Math.max(
                0,
                Math.min(
                    255,
                    r
                )
            );


            data[i+1] =
            Math.max(
                0,
                Math.min(
                    255,
                    g
                )
            );


            data[i+2] =
            Math.max(
                0,
                Math.min(
                    255,
                    b
                )
            );


        }


        console.log(
            "HD Detail Enhance Finished"
        );


        return imageData;

    }


};


console.log(
"Detail Enhance Engine Loaded"
);
