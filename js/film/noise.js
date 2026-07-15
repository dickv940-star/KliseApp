/*
=========================================================
Film Scan Studio
Noise Reduction Engine
Version 1.0
AppDIGI
=========================================================
*/

const Noise = {

    strength: 18,

    apply(canvas, ctx) {

        console.log("Noise Reduction...");

        const width = canvas.width;
        const height = canvas.height;

        const src = ctx.getImageData(
            0,
            0,
            width,
            height
        );

        const dst = ctx.createImageData(
            width,
            height
        );

        const s = src.data;
        const d = dst.data;

        //----------------------------------------
        // Bilateral Lite Filter
        //----------------------------------------

        for (let y = 1; y < height - 1; y++) {

            for (let x = 1; x < width - 1; x++) {

                let sumR = 0;
                let sumG = 0;
                let sumB = 0;

                let total = 0;

                const center =
                    (y * width + x) * 4;

                const cr = s[center];
                const cg = s[center + 1];
                const cb = s[center + 2];

                for (let ky = -1; ky <= 1; ky++) {

                    for (let kx = -1; kx <= 1; kx++) {

                        const idx =
                            ((y + ky) * width + (x + kx)) * 4;

                        const r = s[idx];
                        const g = s[idx + 1];
                        const b = s[idx + 2];

                        //--------------------------------

                        const diff =

                            Math.abs(r - cr) +

                            Math.abs(g - cg) +

                            Math.abs(b - cb);

                        //--------------------------------

                        if (diff < this.strength) {

                            sumR += r;
                            sumG += g;
                            sumB += b;

                            total++;

                        }

                    }

                }

                //--------------------------------

                const out =
                    (y * width + x) * 4;

                if (total > 0) {

                    d[out] = sumR / total;
                    d[out + 1] = sumG / total;
                    d[out + 2] = sumB / total;

                } else {

                    d[out] = cr;
                    d[out + 1] = cg;
                    d[out + 2] = cb;

                }

                d[out + 3] = s[out + 3];

            }

        }

        //----------------------------------------
        // Copy Border
        //----------------------------------------

        for (let x = 0; x < width; x++) {

            const top = x * 4;
            const bottom =
                ((height - 1) * width + x) * 4;

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

            const left =
                (y * width) * 4;

            const right =
                (y * width + width - 1) * 4;

            d[left] = s[left];
            d[left + 1] = s[left + 1];
            d[left + 2] = s[left + 2];
            d[left + 3] = s[left + 3];

            d[right] = s[right];
            d[right + 1] = s[right + 1];
            d[right + 2] = s[right + 2];
            d[right + 3] = s[right + 3];

        }

        //----------------------------------------

        ctx.putImageData(
            dst,
            0,
            0
        );

        console.log("Noise Reduction Finished");

    }

};
