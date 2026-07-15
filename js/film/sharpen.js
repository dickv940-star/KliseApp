/*
=========================================================
Film Scan Studio
Sharpen Engine
Version 1.0
AppDIGI
=========================================================
*/

const Sharpen = {

    radius: 1,

    amount: 0.65,

    threshold: 3,

    apply(canvas, ctx) {

        console.log("Applying Sharpen...");

        const width = canvas.width;
        const height = canvas.height;

        const src = ctx.getImageData(
            0,
            0,
            width,
            height
        );

        const dst = ctx.createImageData(width, height);

        const s = src.data;
        const d = dst.data;

        //--------------------------------------
        // Kernel Sharpen
        //--------------------------------------

        const kernel = [

             0,-1, 0,
            -1, 5,-1,
             0,-1, 0

        ];

        for (let y = 1; y < height - 1; y++) {

            for (let x = 1; x < width - 1; x++) {

                let rr = 0;
                let gg = 0;
                let bb = 0;

                let k = 0;

                for (let ky = -1; ky <= 1; ky++) {

                    for (let kx = -1; kx <= 1; kx++) {

                        const idx =

                            ((y + ky) * width + (x + kx)) * 4;

                        const weight = kernel[k++];

                        rr += s[idx] * weight;
                        gg += s[idx + 1] * weight;
                        bb += s[idx + 2] * weight;

                    }

                }

                //--------------------------------

                const out = (y * width + x) * 4;

                //--------------------------------
                // Blend dengan gambar asli
                //--------------------------------

                const or = s[out];
                const og = s[out + 1];
                const ob = s[out + 2];

                rr = or + ((rr - or) * this.amount);
                gg = og + ((gg - og) * this.amount);
                bb = ob + ((bb - ob) * this.amount);

                //--------------------------------

                rr = Math.min(255, Math.max(0, rr));
                gg = Math.min(255, Math.max(0, gg));
                bb = Math.min(255, Math.max(0, bb));

                //--------------------------------

                d[out] = rr;
                d[out + 1] = gg;
                d[out + 2] = bb;
                d[out + 3] = s[out + 3];

            }

        }

        //--------------------------------------
        // Copy Border
        //--------------------------------------

        for (let x = 0; x < width; x++) {

            let top = x * 4;
            let bottom = ((height - 1) * width + x) * 4;

            d[top] = s[top];
            d[top + 1] = s[top + 1];
            d[top + 2] = s[top + 2];
            d[top + 3] = s[top + 3];

            d[bottom] = s[bottom];
            d[bottom + 1] = s[bottom + 1];
            d[bottom + 2] = s[bottom + 2];
            d[bottom + 3] = s[bottom + 3];

        }

        for (let y = 0; y < height; y++) {

            let left = (y * width) * 4;
            let right = (y * width + (width - 1)) * 4;

            d[left] = s[left];
            d[left + 1] = s[left + 1];
            d[left + 2] = s[left + 2];
            d[left + 3] = s[left + 3];

            d[right] = s[right];
            d[right + 1] = s[right + 1];
            d[right + 2] = s[right + 2];
            d[right + 3] = s[right + 3];

        }

        ctx.putImageData(
            dst,
            0,
            0
        );

        console.log("Sharpen Finished");

    }

};
