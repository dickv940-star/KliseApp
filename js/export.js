/*
=========================================
Film Scan Studio
Export Manager
Version 1.0
=========================================
*/

const ExportManager = {

    quality: 1.0,

    fileName(prefix = "FilmScan") {

        const now = new Date();

        const year = now.getFullYear();

        const month = String(
            now.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            now.getDate()
        ).padStart(2, "0");

        const hour = String(
            now.getHours()
        ).padStart(2, "0");

        const minute = String(
            now.getMinutes()
        ).padStart(2, "0");

        const second = String(
            now.getSeconds()
        ).padStart(2, "0");

        return `${prefix}_${year}${month}${day}_${hour}${minute}${second}`;

    },

    download(blob, filename) {

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;

        a.download = filename;

        document.body.appendChild(a);

        a.click();

        a.remove();

        setTimeout(() => {

            URL.revokeObjectURL(url);

        }, 1000);

    },

    jpg(canvas, quality = this.quality) {

        canvas.toBlob(

            (blob) => {

                this.download(

                    blob,

                    this.fileName() + ".jpg"

                );

                console.log("Export JPG");

            },

            "image/jpeg",

            quality

        );

    },

    png(canvas) {

        canvas.toBlob(

            (blob) => {

                this.download(

                    blob,

                    this.fileName() + ".png"

                );

                console.log("Export PNG");

            },

            "image/png"

        );

    },

    webp(canvas, quality = this.quality) {

        canvas.toBlob(

            (blob) => {

                this.download(

                    blob,

                    this.fileName() + ".webp"

                );

                console.log("Export WEBP");

            },

            "image/webp",

            quality

        );

    },

    async copyClipboard(canvas) {

        if (!navigator.clipboard) {

            console.warn("Clipboard tidak didukung.");

            return;

        }

        return new Promise((resolve) => {

            canvas.toBlob(async (blob) => {

                try {

                    await navigator.clipboard.write([

                        new ClipboardItem({

                            [blob.type]: blob

                        })

                    ]);

                    console.log("Gambar disalin ke clipboard");

                    resolve(true);

                } catch (e) {

                    console.error(e);

                    resolve(false);

                }

            });

        });

    },

    setQuality(value) {

        value = Number(value);

        if (isNaN(value)) return;

        if (value < 0.1) value = 0.1;

        if (value > 1) value = 1;

        this.quality = value;

    }

};
