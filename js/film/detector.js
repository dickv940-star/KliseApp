/*
==================================================
Film Scan Studio
Negative Detector
Version 1.0
==================================================
*/

const NegativeDetector = {

    analyze(canvas, ctx) {

        const width = canvas.width;
        const height = canvas.height;

        const img = ctx.getImageData(0, 0, width, height);

        const data = img.data;

        const histR = new Uint32Array(256);
        const histG = new Uint32Array(256);
        const histB = new Uint32Array(256);

        let totalR = 0;
        let totalG = 0;
        let totalB = 0;
        let totalLum = 0;

        const pixels = data.length / 4;

        for (let i = 0; i < data.length; i += 4) {

            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            histR[r]++;
            histG[g]++;
            histB[b]++;

            totalR += r;
            totalG += g;
            totalB += b;

            totalLum += (0.299 * r + 0.587 * g + 0.114 * b);

        }

        const avgR = totalR / pixels;
        const avgG = totalG / pixels;
        const avgB = totalB / pixels;

        const avgLum = totalLum / pixels;

        //-----------------------------------
        // Negative Detection
        //-----------------------------------

        let score = 0;

        // Orange mask

        if (avgR > avgG + 15)
            score++;

        if (avgG > avgB + 10)
            score++;

        // Bright negative scan

        if (avgLum > 120)
            score++;

        // Blue very low

        if (avgB < avgR * 0.75)
            score++;

        const negative = score >= 3;

        console.log("======== FILM ANALYSIS ========");

        console.log("Average RGB");

        console.log(avgR, avgG, avgB);

        console.log("Average Luminance");

        console.log(avgLum);

        console.log("Negative :", negative);

        return {

            negative,

            width,

            height,

            average: {

                r: avgR,

                g: avgG,

                b: avgB,

                luminance: avgLum

            },

            histogram: {

                red: histR,

                green: histG,

                blue: histB

            }

        };

    }

};
