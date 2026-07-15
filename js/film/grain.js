/*
=========================================================
Film Scan Studio
Film Grain Engine
Version 2.0
AppDIGI
=========================================================
*/

const Grain = {

    enabled: true,

    amount: 8,

    size: 1,

    roughness: 0.45,

    monochrome: true,

    //---------------------------------------------

    apply(canvas, ctx){

        if(!this.enabled) return;

        console.log("Applying Film Grain...");

        const width = canvas.width;

        const height = canvas.height;

        const image = ctx.getImageData(
            0,
            0,
            width,
            height
        );

        const data = image.data;

        //---------------------------------------------

        for(let y=0;y<height;y++){

            for(let x=0;x<width;x++){

                const index =
                    (y*width+x)*4;

                let r=data[index];

                let g=data[index+1];

                let b=data[index+2];

                //---------------------------------
                // luminance
                //---------------------------------

                const lum =
                    0.299*r+
                    0.587*g+
                    0.114*b;

                //---------------------------------
                // shadow weight
                //---------------------------------

                const weight =
                    1-
                    (lum/255);

                //---------------------------------

                const noise =

                    (
                        Math.random()-0.5
                    )*

                    this.amount*

                    weight;

                //---------------------------------

                if(this.monochrome){

                    r+=noise;

                    g+=noise;

                    b+=noise;

                }else{

                    r+=noise*(0.9+Math.random()*0.2);

                    g+=noise*(0.9+Math.random()*0.2);

                    b+=noise*(0.9+Math.random()*0.2);

                }

                //---------------------------------

                data[index]=

                    Math.min(
                        255,
                        Math.max(
                            0,
                            r
                        )
                    );

                data[index+1]=

                    Math.min(
                        255,
                        Math.max(
                            0,
                            g
                        )
                    );

                data[index+2]=

                    Math.min(
                        255,
                        Math.max(
                            0,
                            b
                        )
                    );

            }

        }

        ctx.putImageData(
            image,
            0,
            0
        );

        console.log("Film Grain Finished");

    },

    //---------------------------------------------

    setAmount(value){

        this.amount=Math.max(
            0,
            value
        );

    },

    setSize(value){

        this.size=Math.max(
            1,
            value
        );

    },

    setRoughness(value){

        this.roughness=Math.max(
            0,
            Math.min(
                1,
                value
            )
        );

    }

};
