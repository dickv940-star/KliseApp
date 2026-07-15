/*
=========================================
Film Scan Studio
Preset Engine
Bogell Project v1.0
=========================================
*/

const PresetEngine = {

    apply(canvas, ctx) {

        console.log("Applying Bogell Project Preset...");

        const width = canvas.width;
        const height = canvas.height;

        const imageData = ctx.getImageData(
            0,
            0,
            width,
            height
        );

        const d = imageData.data;

        for (let i = 0; i < d.length; i += 4) {

            let r = d[i];
            let g = d[i + 1];
            let b = d[i + 2];

            //------------------------------------------------
            // Exposure (+0.30)
            //------------------------------------------------

            r *= 1.08;
            g *= 1.08;
            b *= 1.08;

            //------------------------------------------------
            // Contrast (-10)
            //------------------------------------------------

            r = (r - 128) * 0.95 + 128;
            g = (g - 128) * 0.95 + 128;
            b = (b - 128) * 0.95 + 128;

            //------------------------------------------------
            // Blacks (-64)
            //------------------------------------------------

            const lum =
                (r + g + b) / 3;

            if (lum < 80) {

                r *= 0.70;
                g *= 0.70;
                b *= 0.70;

            }

            //------------------------------------------------
            // Whites (+17)
            //------------------------------------------------

            if (lum > 180) {

                r *= 1.05;
                g *= 1.05;
                b *= 1.05;

            }

            //------------------------------------------------
            // Highlights (+26)
            //------------------------------------------------

            if (lum > 160) {

                r += 8;
                g += 8;
                b += 8;

            }

            //------------------------------------------------
            // Shadows (+18)
            //------------------------------------------------

            if (lum < 100) {

                r += 6;
                g += 6;
                b += 6;

            }

            //------------------------------------------------
            // Dehaze (+45)
            //------------------------------------------------

            const avg =
                (r + g + b) / 3;

            r += (r - avg) * 0.18;
            g += (g - avg) * 0.18;
            b += (b - avg) * 0.18;

            //------------------------------------------------
            // Shadow Color Grading
            //------------------------------------------------

            if (lum < 120) {

                r += 4;
                g += 1;
                b -= 2;

            }

            //------------------------------------------------
            // Clamp
            //------------------------------------------------

            d[i] = Math.max(0, Math.min(255, r));
            d[i + 1] = Math.max(0, Math.min(255, g));
            d[i + 2] = Math.max(0, Math.min(255, b));

        }

        ctx.putImageData(
            imageData,
            0,
            0
        );

        //----------------------------------------------------
        // Sharpen
        //----------------------------------------------------

        this.sharpen(canvas, ctx);

        console.log("Preset Applied");

    },

    sharpen(canvas, ctx) {

        const w = canvas.width;
        const h = canvas.height;

        const src = ctx.getImageData(
            0,
            0,
            w,
            h
        );

        const dst = ctx.createImageData(w, h);

        const s = src.data;
        const d = dst.data;

        const kernel = [

             0,-1, 0,

            -1, 5,-1,

             0,-1, 0

        ];

        for(let y=1;y<h-1;y++){

            for(let x=1;x<w-1;x++){

                for(let c=0;c<3;c++){

                    let i=(y*w+x)*4+c;

                    let value=0;

                    let k=0;

                    for(let ky=-1;ky<=1;ky++){

                        for(let kx=-1;kx<=1;kx++){

                            let ii=((y+ky)*w+(x+kx))*4+c;

                            value+=s[ii]*kernel[k++];

                        }

                    }

                    d[i]=Math.max(
                        0,
                        Math.min(255,value)
                    );

                }

                d[(y*w+x)*4+3]=255;

            }

        }

        ctx.putImageData(dst,0,0);

    }

};
