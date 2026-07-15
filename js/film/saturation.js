/*
=========================================================
Film Scan Studio
Saturation Engine
Version 1.0
AppDIGI
=========================================================
*/

const Saturation = {

    // 1.0 = normal
    // 1.2 = +20%
    // 0.8 = -20%

    amount: 1.10,

    apply(canvas, ctx) {

        console.log("Applying Saturation...");

        const width = canvas.width;
        const height = canvas.height;

        const image = ctx.getImageData(
            0,
            0,
            width,
            height
        );

        const data = image.data;

        const amount = this.amount;

        for (let i = 0; i < data.length; i += 4) {

            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];

            //----------------------------------------
            // Preserve Luminance
            //----------------------------------------

            const gray =
                0.299 * r +
                0.587 * g +
                0.114 * b;

            r = gray + (r - gray) * amount;
            g = gray + (g - gray) * amount;
            b = gray + (b - gray) * amount;

            //----------------------------------------

            if (r < 0) r = 0;
            if (g < 0) g = 0;
            if (b < 0) b = 0;

            if (r > 255) r = 255;
            if (g > 255) g = 255;
            if (b > 255) b = 255;

            //----------------------------------------

            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;

        }

        ctx.putImageData(
            image,
            0,
            0
        );

        console.log("Saturation Finished");

    },

    setAmount(value) {

        this.amount = Math.max(
            0,
            value
        );

    }

};
