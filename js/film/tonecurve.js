/*
=========================================================
Film Scan Studio
Tone Curve Engine
Version 1.0
AppDIGI
=========================================================
*/

const ToneCurve = {

    lut: null,

    init() {

        this.lut = new Uint8Array(256);

        for (let i = 0; i < 256; i++) {

            const x = i / 255;

            // Soft S-Curve
            let y;

            if (x < 0.5) {

                y = 2 * x * x;

            } else {

                y = 1 - (2 * (1 - x) * (1 - x));

            }

            // Gamma ringan agar lebih natural
            y = Math.pow(y, 0.95);

            let value = Math.round(y * 255);

            if (value < 0) value = 0;
            if (value > 255) value = 255;

            this.lut[i] = value;

        }

    },

    apply(canvas, ctx) {

        if (!this.lut) {

            this.init();

        }

        console.log("Applying Tone Curve...");

        const width = canvas.width;
        const height = canvas.height;

        const image = ctx.getImageData(
            0,
            0,
            width,
            height
        );

        const data = image.data;

        for (let i = 0; i < data.length; i += 4) {

            data[i]     = this.lut[data[i]];
            data[i + 1] = this.lut[data[i + 1]];
            data[i + 2] = this.lut[data[i + 2]];

        }

        ctx.putImageData(image, 0, 0);

        console.log("Tone Curve Finished");

    },

    // Memungkinkan mengganti LUT dari modul lain
    setLUT(lut) {

        if (!(lut instanceof Uint8Array) || lut.length !== 256) {
            throw new Error("ToneCurve: LUT harus Uint8Array dengan panjang 256.");
        }

        this.lut = lut;

    }

};
