/*
=========================================================
Film Scan Studio
Vibrance Engine
Version 1.0
AppDIGI
=========================================================
*/

const Vibrance = {

    // 1 = normal
    // 1.20 = +20%
    amount: 1.18,

    apply(canvas, ctx) {

        console.log("Applying Vibrance...");

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

            //----------------------------------
            // Max Min
            //----------------------------------

            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);

            const saturation = max === 0
                ? 0
                : (max - min) / max;

            //----------------------------------
            // Vibrance hanya bekerja pada
            // warna yang belum jenuh
            //----------------------------------

            const factor =
                1 +
                (1 - saturation) *
                (amount - 1);

            //----------------------------------

            const gray =
                0.299 * r +
                0.587 * g +
                0.114 * b;

            r = gray + (r - gray) * factor;
            g = gray + (g - gray) * factor;
            b = gray + (b - gray) * factor;

            //----------------------------------
            // Skin Tone Protection
            //----------------------------------

            if (
                r > g &&
                g > b &&
                r > 90 &&
                g > 60
            ) {

                r = gray + (r - gray) * 1.04;
                g = gray + (g - gray) * 1.04;
                b = gray + (b - gray) * 1.04;

            }

            //----------------------------------

            data[i] = Math.min(255, Math.max(0, r));
            data[i + 1] = Math.min(255, Math.max(0, g));
            data[i + 2] = Math.min(255, Math.max(0, b));

        }

        ctx.putImageData(
            image,
            0,
            0
        );

        console.log("Vibrance Finished");

    },

    setAmount(value) {

        this.amount = Math.max(
            0,
            value
        );

    }

};
