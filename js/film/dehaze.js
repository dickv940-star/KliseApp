/*
=========================================================
Film Scan Studio
Dehaze Engine
Version 2.0
AppDIGI

Dark Channel Prior (Browser Optimized)

=========================================================
*/

const Dehaze = {

    omega: 0.92,

    t0: 0.15,

    patch: 7,

    apply(canvas, ctx) {

        console.log("Applying Dehaze...");

        const width = canvas.width;
        const height = canvas.height;

        const src = ctx.getImageData(
            0,
            0,
            width,
            height
        );

        const data = src.data;

        //------------------------------------
        // STEP 1
        // Dark Channel
        //------------------------------------

        const dark =
            this.darkChannel(
                data,
                width,
                height
            );

        //------------------------------------
        // STEP 2
        // Atmospheric Light
        //------------------------------------

        const A =
            this.atmosphere(
                data,
                dark,
                width,
                height
            );

        //------------------------------------
        // STEP 3
        // Transmission
        //------------------------------------

        const T =
            this.transmission(
                dark,
                A
            );

        //------------------------------------
        // STEP 4
        // Recover Image
        //------------------------------------

        for(let i=0;i<data.length;i+=4){

            const id=i/4;

            const t=Math.max(
                T[id],
                this.t0
            );

            data[i]=
                ((data[i]-A.r)/t)+A.r;

            data[i+1]=
                ((data[i+1]-A.g)/t)+A.g;

            data[i+2]=
                ((data[i+2]-A.b)/t)+A.b;

            //--------------------------------

            data[i]=
                Math.min(
                    255,
                    Math.max(
                        0,
                        data[i]
                    )
                );

            data[i+1]=
                Math.min(
                    255,
                    Math.max(
                        0,
                        data[i+1]
                    )
                );

            data[i+2]=
                Math.min(
                    255,
                    Math.max(
                        0,
                        data[i+2]
                    )
                );

        }

        ctx.putImageData(
            src,
            0,
            0
        );

        console.log("Dehaze Finished");

    },

    //-------------------------------------------------

    darkChannel(data,width,height){

        const dark=
            new Float32Array(
                width*height
            );

        const p=this.patch;

        for(let y=0;y<height;y++){

            for(let x=0;x<width;x++){

                let min=255;

                for(let py=-p;py<=p;py++){

                    const yy=y+py;

                    if(
                        yy<0||
                        yy>=height
                    ) continue;

                    for(let px=-p;px<=p;px++){

                        const xx=x+px;

                        if(
                            xx<0||
                            xx>=width
                        ) continue;

                        const idx=
                            (yy*width+xx)*4;

                        const r=data[idx];

                        const g=data[idx+1];

                        const b=data[idx+2];

                        const m=
                            Math.min(
                                r,
                                g,
                                b
                            );

                        if(m<min)
                            min=m;

                    }

                }

                dark[
                    y*width+x
                ]=min;

            }

        }

        return dark;

    },

    //-------------------------------------------------

    atmosphere(data,dark,width,height){

        let max=-1;

        let index=0;

        for(let i=0;i<dark.length;i++){

            if(dark[i]>max){

                max=dark[i];

                index=i;

            }

        }

        index*=4;

        return{

            r:data[index],

            g:data[index+1],

            b:data[index+2]

        };

    },

    //-------------------------------------------------

    transmission(dark,A){

        const t=
            new Float32Array(
                dark.length
            );

        const maxA=
            Math.max(
                A.r,
                A.g,
                A.b,
                1
            );

        for(let i=0;i<dark.length;i++){

            t[i]=
                1-
                this.omega*
                (dark[i]/maxA);

        }

        return t;

    }

};
