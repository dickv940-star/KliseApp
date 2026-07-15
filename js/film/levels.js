/*
=========================================================
Film Scan Studio
Auto Levels Engine
Version 2.1
AppDIGI
=========================================================
*/


const Levels = {


    name:"Levels",



    apply(input){


        console.log(
            "Applying Auto Levels..."
        );



        if(!input){

            console.error(
                "Levels: input kosong"
            );

            return input;

        }



        let imageData;



        // jika langsung ImageData

        if(
            input.data &&
            input.data.length
        ){

            imageData = input;


        }

        // jika object memiliki imageData

        else if(
            input.imageData
        ){

            imageData =
                input.imageData;


        }

        // jika canvas

        else if(
            input.getContext
        ){


            const ctx =
                input.getContext("2d");


            imageData =
                ctx.getImageData(
                    0,
                    0,
                    input.width,
                    input.height
                );


        }



        if(
            !imageData ||
            !imageData.data
        ){

            console.error(
                "Levels: format tidak dikenali",
                input
            );


            return input;

        }



        const data =
            imageData.data;



        let min = 255;

        let max = 0;



        for(
            let i=0;
            i<data.length;
            i+=4
        ){

            const avg =
            (
                data[i] +
                data[i+1] +
                data[i+2]
            ) / 3;



            if(avg < min)
                min = avg;


            if(avg > max)
                max = avg;


        }



        const range =
            max-min;



        if(range === 0){

            return input;

        }




        for(
            let i=0;
            i<data.length;
            i+=4
        ){


            data[i] =
                ((data[i]-min)/range)*255;


            data[i+1] =
                ((data[i+1]-min)/range)*255;


            data[i+2] =
                ((data[i+2]-min)/range)*255;



        }



        console.log(
            "Levels Finished"
        );



        return imageData;


    }



};



window.Levels = Levels;


console.log(
"Levels Engine Loaded"
);
