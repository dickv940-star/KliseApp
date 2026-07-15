/*
=========================================================
Film Scan Studio
Main Film Engine
Version 2.0
AppDIGI

Pipeline Processor

=========================================================
*/

const FilmEngine = {

    version: "2.0",

    //--------------------------------------------

    modules: [

        "Detector",

        "OrangeMask",

        "Invert",

        "WhiteBalance",

        "Levels",

        "ToneCurve",

        "Dehaze",

        "Vibrance",

        "Saturation",

        "Bogell",

        "Noise",

        "Sharpen",

        "Grain"

    ],

    //--------------------------------------------

    async process(canvas){

        console.log("=================================");

        console.log("Film Engine Started");

        console.log("Version :",this.version);

        console.log("=================================");

        const ctx=

            canvas.getContext(
                "2d",
                {
                    willReadFrequently:true
                }
            );

        //----------------------------------------
        // Detector
        //----------------------------------------

        const analysis=

            NegativeDetector.analyze(
                canvas,
                ctx
            );

        //----------------------------------------
        // Bila bukan negatif
        //----------------------------------------

        if(!analysis.negative){

            console.warn(
                "Image is already positive."
            );

        }

        //----------------------------------------
        // Pipeline
        //----------------------------------------

        this.runStep(
            OrangeMask,
            canvas,
            ctx,
            analysis
        );

        this.runStep(
            Invert,
            canvas,
            ctx
        );

        this.runStep(
            WhiteBalance,
            canvas,
            ctx
        );

        this.runStep(
            Levels,
            canvas,
            ctx
        );

        this.runStep(
            ToneCurve,
            canvas,
            ctx
        );

        this.runStep(
            Dehaze,
            canvas,
            ctx
        );

        this.runStep(
            Vibrance,
            canvas,
            ctx
        );

        this.runStep(
            Saturation,
            canvas,
            ctx
        );

        this.runStep(
            Bogell,
            canvas,
            ctx
        );

        this.runStep(
            Noise,
            canvas,
            ctx
        );
        
if(window.DetailEnhance){

    this.runStep(
        window.DetailEnhance
    );

}
        this.runStep(
            Sharpen,
            canvas,
            ctx
        );

        this.runStep(
            Grain,
            canvas,
            ctx
        );

        //----------------------------------------

        console.log("=================================");

        console.log("Film Engine Finished");

        console.log("=================================");

        return canvas;

    },

    //--------------------------------------------

    runStep(module,...args){

        if(!module){

            console.warn(
                "Module Missing"
            );

            return;

        }

        if(typeof module.apply!=="function"){

            console.warn(
                "Invalid Module"
            );

            return;

        }

        console.log(
            "Running",
            module.constructor?.name ||
            module.name ||
            module
        );

        module.apply(...args);

    },

    //--------------------------------------------

    processImage(image){

        return new Promise((resolve)=>{

            const canvas=

                document.createElement(
                    "canvas"
                );

            canvas.width=image.width;

            canvas.height=image.height;

            const ctx=

                canvas.getContext(
                    "2d",
                    {
                        willReadFrequently:true
                    }
                );

            ctx.drawImage(
                image,
                0,
                0
            );

            this.process(
                canvas
            );

            resolve(
                canvas
            );

        });

    },

    //--------------------------------------------

    benchmark(canvas){

        const start=

            performance.now();

        this.process(canvas);

        const end=

            performance.now();

        console.log(

            "Process Time :",

            (end-start).toFixed(1),

            "ms"

        );

    }

};
