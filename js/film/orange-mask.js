/*
==================================================
Film Scan Studio
Orange Mask Removal
Version 1.0
==================================================
*/

const OrangeMask = {

    apply(canvas, ctx, analysis) {

        console.log("Removing Orange Mask...");

        const width = canvas.width;
        const height = canvas.height;

        const image = ctx.getImageData(0, 0, width, height);
        const data = image.data;

        //----------------------------------------
        // ambil rata-rata RGB hasil detector
        //----------------------------------------

        const avgR = analysis.average.r;
        const avgG = analysis.average.g;
        const avgB = analysis.average.b;

        //----------------------------------------
        // target warna netral
        //----------------------------------------

        const neutral =
            (avgR + avgG + avgB) / 3;

        //----------------------------------------
        // hitung faktor koreksi
        //----------------------------------------

        const gainR = neutral / avgR;
        const gainG = neutral / avgG;
        const gainB = neutral / avgB;

        //----------------------------------------
        // terapkan gain
        //----------------------------------------

        for (let i = 0; i < data.length; i += 4) {

            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];

            r *= gainR;
            g *= gainG;
            b *= gainB;

            //--------------------------------

            r = Math.max(0, Math.min(255, r));
            g = Math.max(0, Math.min(255, g));
            b = Math.max(0, Math.min(255, b));

            //--------------------------------

            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;

        }

        ctx.putImageData(image, 0, 0);

        console.log("Orange Mask Removed");

    }

};
