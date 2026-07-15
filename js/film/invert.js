/*
=========================================================
Film Scan Studio
Negative Invert Engine
Version 1.0
AppDIGI
=========================================================
*/

const Invert = {

    gamma: 1.08,

    apply(canvas, ctx) {

        console.log("Smart Negative Invert...");

        const width = canvas.width;
        const height = canvas.height;

        const imageData = ctx.getImageData(
            0,
            0,
            width,
            height
        );

        const data = imageData.data;

        const invGamma = 1 / this.gamma;

        for (let i = 0; i < data.length; i += 4) {

            //----------------------------------
            // Original
            //----------------------------------

            let r = data[i] / 255;
            let g = data[i + 1] / 255;
            let b = data[i + 2] / 255;

            //----------------------------------
            // Invert
            //----------------------------------

            r = 1 - r;
            g = 1 - g;
            b = 1 - b;

            //----------------------------------
            // Gamma Correction
            //----------------------------------

            r = Math.pow(r, invGamma);
            g = Math.pow(g, invGamma);
            b = Math.pow(b, invGamma);

            //----------------------------------
            // Back to RGB
            //----------------------------------

            r *= 255;
            g *= 255;
            b *= 255;

            //----------------------------------
            // Clamp
            //----------------------------------

            if (r < 0) r = 0;
            if (g < 0) g = 0;
            if (b < 0) b = 0;

            if (r > 255) r = 255;
            if (g > 255) g = 255;
            if (b > 255) b = 255;

            //----------------------------------

            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;

            // alpha tetap
        }

        ctx.putImageData(
            imageData,
            0,
            0
        );

        console.log("Invert Finished");

    }

};
