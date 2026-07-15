/*
=========================================================
Film Scan Studio
App Controller
Version 2.0
AppDIGI
=========================================================
*/

const App = {

    canvas: null,

    ctx: null,

    originalImage: null,

    processed: false,

    //--------------------------------------------------

    async init() {

        console.log("================================");
        console.log("Film Scan Studio Started");
        console.log("================================");

        this.canvas = document.getElementById("preview");

        this.ctx = this.canvas.getContext("2d", {
            willReadFrequently: true
        });

        this.bindEvents();

        if ("serviceWorker" in navigator) {

            navigator.serviceWorker
                .register("./service-worker.js")
                .then(() => {

                    console.log(
                        "Service Worker Registered"
                    );

                });

        }

    },

    //--------------------------------------------------

    bindEvents() {

        //------------------------------------------
        // Upload
        //------------------------------------------

        const upload = document.getElementById("upload");

        upload.addEventListener(
            "change",
            (e) => {

                this.loadImage(
                    e.target.files[0]
                );

            }
        );

        //------------------------------------------
        // Generate
        //------------------------------------------

        document
            .getElementById("generate")
            .addEventListener(
                "click",
                () => {

                    this.generate();

                }
            );

        //------------------------------------------
        // Export
        //------------------------------------------

        document
            .getElementById("export")
            .addEventListener(
                "click",
                () => {

                    ExportEngine.save(
                        this.canvas
                    );

                }
            );

    },

    //--------------------------------------------------

    async loadImage(file) {

        if (!file)
            return;

        UI.loading(true);

        try {

            await ImageEngine.load(
                file,
                this.canvas
            );

            this.originalImage = file;

            UI.status(
                "Image Loaded"
            );

            //----------------------------------
            // Auto Generate
            //----------------------------------

            await this.generate();

        }

        catch (err) {

            console.error(err);

            UI.status(
                "Failed Loading Image"
            );

        }

        UI.loading(false);

    },

    //--------------------------------------------------

    async generate() {

        if (!this.canvas.width)
            return;

        UI.loading(true);

        UI.status(
            "Processing..."
        );

        try {

            const start =
                performance.now();

            //----------------------------------

            await FilmEngine.process(
                this.canvas
            );

            //----------------------------------

            const end =
                performance.now();

            console.log(

                "Finished",

                (end - start).toFixed(1),

                "ms"

            );

            this.processed = true;

            UI.status(
                "Preset Applied"
            );

        }

        catch (err) {

            console.error(err);

            UI.status(
                "Processing Error"
            );

        }

        UI.loading(false);

    },

    //--------------------------------------------------

    reset() {

        if (!this.originalImage)
            return;

        ImageEngine.load(
            this.originalImage,
            this.canvas
        );

        this.processed = false;

        UI.status(
            "Reset"
        );

    }

};

window.addEventListener(

    "DOMContentLoaded",

    () => {

        App.init();

    }

);
