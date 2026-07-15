/*
=========================================================
Film Scan Studio
Auto Levels Engine
Version 1.0
AppDIGI
=========================================================
*/

const Levels = {


    /*
    Auto contrast / levels adjustment
    */

    apply(imageData){


        if(!imageData) return null;


        const data = imageData.data;


        let min = 255;
        let max = 0;


        // Cari range pixel

        for(let i = 0; i < data.length; i += 4){


            let r = data[i];
            let g = data[i+1];
            let b = data[i+2];


            let avg = (r + g + b) / 3;


            if(avg < min) min = avg;

            if(avg > max) max = avg;


        }



        let range = max - min;


        if(range === 0) return imageData;



        // Apply levels

        for(let i = 0; i < data.length; i += 4){


            data[i] =
                ((data[i] - min) / range) * 255;


            data[i+1] =
                ((data[i+1] - min) / range) * 255;


            data[i+2] =
                ((data[i+2] - min) / range) * 255;


        }


        return imageData;


    }



};



window.Levels = Levels;


console.log(
    "Levels Engine Loaded"
);
