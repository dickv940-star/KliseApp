/*
=========================================================
Film Scan Studio
App Controller
Version 2.1
AppDIGI
=========================================================
*/

const App = {

    canvas: null,
    ctx: null,

    //--------------------------------------------------

    async init() {

        console.log("================================");
        console.log("Film Scan Studio Started");
        console.log("================================");

        this.canvas = document.getElementById("preview");

        if (!this.canvas) {

            console.error("Canvas #preview tidak ditemukan.");
            return;

        }

        this.ctx = this.canvas.getContext("2d", {
            willReadFrequently: true
        });

        UI.init();

        this.bindEvents();

        this.registerServiceWorker();

        UI.status("Ready");

        UI.enableGenerate(false);
        UI.enableExport(false);

    },

    //--------------------------------------------------

    bindEvents() {

        const upload =
            document.getElementById("upload");

        const generate =
            document.getElementById("generate");

        const reset =
            document.getElementById("reset");

        const exportBtn =
            document.getElementById("export");

        //--------------------------------------

        if (upload) {

            upload.addEventListener(
                "change",
                async (e) => {

                    if (!e.target.files.length)
                        return;

                    await this.loadImage(
                        e.target.files[0]
                    );

                }
            );

        }

        //--------------------------------------

        if (generate) {

            generate.addEventListener(
                "click",
                async () => {

                    await this.generate();

                }
            );

        }

        //--------------------------------------

        if (reset) {

            reset.addEventListener(
                "click",
                () => {

                    ImageEngine.reset();

                    UI.status("Image Reset");

                }
            );

        }

        //--------------------------------------

        if (exportBtn) {

            exportBtn.addEventListener(
                "click",
                () => {

                    ExportEngine.save(this.canvas);

                }
            );

        }

    },

    //--------------------------------------------------

    async loadImage(file) {

        try {

            UI.loading(true);

            UI.status("Loading Image...");

            UI.progress(5);

            await ImageEngine.load(
                file,
                this.canvas
            );

            UI.progress(30);

            UI.status("Image Loaded");

            UI.enableGenerate(true);

            //----------------------------------
            // Auto Apply Preset
            //----------------------------------

            await this.generate();

        }

        catch (err) {

            console.error(err);

            UI.toast("Failed loading image");

        }

        UI.loading(false);

    },

   //--------------------------------------------------

async generate() {

    try {

        UI.loading(true);

        UI.status(
            "Applying Film Preset..."
        );

        UI.progress(40);



        const start =
            performance.now();



        // ===============================
        // FILM PROCESSING
        // ===============================

        await FilmEngine.process(
            this.canvas
        );



        // ===============================
        // AI SUPER RESOLUTION
        // ===============================

        if(
            window.SuperResolution
        ){

            UI.status(
                "Enhancing HD Detail..."
            );


            UI.progress(80);



            const hd =
                await SuperResolution.enhance(
                    this.canvas
                );



            this.canvas.width =
                hd.width;



            this.canvas.height =
                hd.height;



            const ctx =
                this.canvas.getContext(
                    "2d"
                );


            ctx.drawImage(
                hd,
                0,
                0
            );



            console.log(
                "Super Resolution Applied:",
                hd.width,
                "x",
                hd.height
            );


        }





        const end =
            performance.now();



        console.log(

            "Finished",

            (end - start).toFixed(0),

            "ms"

        );



        UI.progress(
            100
        );


        UI.status(
            "Finished"
        );


        UI.toast(
            "HD Film Preset Applied"
        );


        UI.enableExport(
            true
        );



    }


    catch(err){


        console.error(
            err
        );


        UI.toast(
            "Generate Failed"
        );


    }



    UI.loading(
        false
    );


},
if(window.SuperResolution){


    const hd =
        await SuperResolution.enhance(
            this.canvas
        );


    this.canvas.width =
        hd.width;


    this.canvas.height =
        hd.height;


    this.canvas
        .getContext("2d")
        .drawImage(
            hd,
            0,
            0
        );


}
    //--------------------------------------------------

    registerServiceWorker() {

        if (!("serviceWorker" in navigator))
            return;

        navigator.serviceWorker
            .register("./service-worker.js")
            .then(() => {

                console.log(
                    "Service Worker Registered"
                );

            })
            .catch(err => {

                console.error(err);

            });

    }

};

//======================================================

window.addEventListener(

    "load",

    () => {

        App.init();

    }

);
