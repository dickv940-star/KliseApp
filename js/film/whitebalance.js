/*
=========================================================
Film Scan Studio
Auto White Balance
Version 1.0
AppDIGI
=========================================================
*/

const WhiteBalance = {

    apply(canvas, ctx) {

        console.log("Auto White Balance...");

        const width = canvas.width;
        const height = canvas.height;

        const imageData = ctx.getImageData(
            0,
            0,
            width,
            height
        );

        const data = imageData.data;

        //-------------------------------------------------
        // Hitung rata-rata RGB
        //-------------------------------------------------

        let totalR = 0;
        let totalG = 0;
        let totalB = 0;

        const pixels = data.length / 4;

        for (let i = 0; i < data.length; i += 4) {

            totalR += data[i];
            totalG += data[i + 1];
            totalB += data[i + 2];

        }

        const avgR = totalR / pixels;
        const avgG = totalG / pixels;
        const avgB = totalB / pixels;

        //-------------------------------------------------
        // Gray World Target
        //-------------------------------------------------

        const gray = (avgR + avgG + avgB) / 3;

        const gainR = gray / avgR;
        const gainG = gray / avgG;
        const gainB = gray / avgB;

        console.log("WB Gain");

        console.log(gainR, gainG, gainB);

        //-------------------------------------------------
        // Terapkan White Balance
        //-------------------------------------------------

        for (let i = 0; i < data.length; i += 4) {

            let r = data[i] * gainR;
            let g = data[i + 1] * gainG;
            let b = data[i + 2] * gainB;

            //---------------------------------------------

            if (r > 255) r = 255;
            if (g > 255) g = 255;
            if (b > 255) b = 255;

            if (r < 0) r = 0;
            if (g < 0) g = 0;
            if (b < 0) b = 0;

            //---------------------------------------------

            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;

        }

        ctx.putImageData(
            imageData,
            0,
            0
        );

        console.log("White Balance Finished");

    }

};
