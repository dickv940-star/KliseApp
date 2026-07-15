/*
=========================================================
Film Scan Studio
Bogell Inspired Color Profile
Version 1.0
AppDIGI
=========================================================
*/

const Bogell = {

    settings: {

        exposure: 1.03,

        contrast: 1.08,

        saturation: 1.06,

        vibrance: 1.12,

        warmth: 8,

        shadowLift: 4,

        highlightRollOff: 0.96

    },

    apply(canvas, ctx) {

        console.log("Applying Bogell Inspired Profile...");

        const width = canvas.width;
        const height = canvas.height;

        const image = ctx.getImageData(
            0,
            0,
            width,
            height
        );

        const data = image.data;

        const s = this.settings;

        for (let i = 0; i < data.length; i += 4) {

            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];

            //---------------------------------
            // Exposure
            //---------------------------------

            r *= s.exposure;
            g *= s.exposure;
            b *= s.exposure;

            //---------------------------------
            // Warm Tone
            //---------------------------------

            r += s.warmth;
            b -= s.warmth * 0.35;

            //---------------------------------
            // Contrast
            //---------------------------------

            r = ((r - 128) * s.contrast) + 128;
            g = ((g - 128) * s.contrast) + 128;
            b = ((b - 128) * s.contrast) + 128;

            //---------------------------------
            // Highlight Roll Off
            //---------------------------------

            if (r > 200)
                r = 200 + ((r - 200) * s.highlightRollOff);

            if (g > 200)
                g = 200 + ((g - 200) * s.highlightRollOff);

            if (b > 200)
                b = 200 + ((b - 200) * s.highlightRollOff);

            //---------------------------------
            // Shadow Lift
            //---------------------------------

            if (r < 40)
                r += s.shadowLift;

            if (g < 40)
                g += s.shadowLift;

            if (b < 40)
                b += s.shadowLift;

            //---------------------------------
            // Vibrance
            //---------------------------------

            const avg = (r + g + b) / 3;

            r += (r - avg) * (s.vibrance - 1);
            g += (g - avg) * (s.vibrance - 1);
            b += (b - avg) * (s.vibrance - 1);

            //---------------------------------
            // Saturation
            //---------------------------------

            const gray = 0.299 * r + 0.587 * g + 0.114 * b;

            r = gray + (r - gray) * s.saturation;
            g = gray + (g - gray) * s.saturation;
            b = gray + (b - gray) * s.saturation;

            //---------------------------------
            // Clamp
            //---------------------------------

            if (r < 0) r = 0;
            if (g < 0) g = 0;
            if (b < 0) b = 0;

            if (r > 255) r = 255;
            if (g > 255) g = 255;
            if (b > 255) b = 255;

            //---------------------------------

            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;

        }

        ctx.putImageData(image, 0, 0);

        console.log("Bogell Inspired Profile Finished");

    }

};
