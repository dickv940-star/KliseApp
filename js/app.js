/*
=========================================================
Film Scan Studio
App Controller
Version 2.3 Multi Pass
AppDIGI
=========================================================
*/


const App = {


    canvas:null,

    ctx:null,

    generateCount:0,



    //--------------------------------------------------

    async init(){


        console.log(
            "================================"
        );

        console.log(
            "Film Scan Studio Started"
        );

        console.log(
            "================================"
        );



        this.canvas =
        document.getElementById(
            "preview"
        );



        if(!this.canvas){

            console.error(
                "Canvas preview tidak ditemukan"
            );

            return;

        }



        this.ctx =
        this.canvas.getContext(
            "2d",
            {
                willReadFrequently:true
            }
        );



        UI.init();


        this.bindEvents();


        this.registerServiceWorker();



        UI.status(
            "Ready"
        );


        UI.enableGenerate(
            false
        );


        UI.enableExport(
            false
        );


    },





    //--------------------------------------------------

    bindEvents(){


        const upload =
        document.getElementById(
            "upload"
        );


        const generate =
        document.getElementById(
            "generate"
        );


        const reset =
        document.getElementById(
            "reset"
        );


        const exportBtn =
        document.getElementById(
            "export"
        );





        if(upload){


            upload.addEventListener(
                "change",
                async e=>{


                    if(!e.target.files.length)
                        return;



                    await this.loadImage(
                        e.target.files[0]
                    );


                }
            );


        }





        if(generate){


            generate.addEventListener(
                "click",
                async()=>{


                    await this.generate();


                }
            );


        }





        if(reset){


            reset.addEventListener(
                "click",
                ()=>{


                    ImageEngine.reset();


                    this.generateCount = 0;


                    UI.status(
                        "Reset"
                    );


                }
            );


        }






        if(exportBtn){


            exportBtn.addEventListener(
                "click",
                ()=>{


                    ExportEngine.save(
                        this.canvas
                    );


                }
            );


        }


    },







    //--------------------------------------------------

    async loadImage(file){


        try{


            UI.loading(true);


            UI.status(
                "Loading Image..."
            );



            this.generateCount = 0;



            await ImageEngine.load(
                file,
                this.canvas
            );



            UI.status(
                "Image Loaded"
            );



            UI.enableGenerate(
                true
            );



            // otomatis generate pertama

            await this.generate();



        }


        catch(err){


            console.error(err);


            UI.toast(
                "Failed Loading Image"
            );


        }



        UI.loading(false);


    },








    //--------------------------------------------------

    async generate(){


        try{


            this.generateCount++;



            console.log(
                "Generate Pass:",
                this.generateCount
            );



            UI.loading(true);



            const start =
            performance.now();





            //================================================
            // PASS 1
            // FILM RESTORATION
            //================================================


            if(this.generateCount === 1){



                UI.status(
                    "Applying Film Preset..."
                );


                UI.progress(
                    40
                );



                await FilmEngine.process(
                    this.canvas
                );



            }





            //================================================
            // PASS 2
            // HD RESTORATION
            //================================================


            else{


                console.log(
                    "Running HD Enhancement Pass"
                );



                UI.status(
                    "AI Restoring Detail..."
                );



                UI.progress(
                    60
                );





                if(window.DetailEnhance){



                    let image =
                    ImageEngine.getImageData();



                    image =
                    DetailEnhance.apply(
                        image
                    );



                    if(image){


                        ImageEngine.putImageData(
                            image
                        );


                    }


                }






                if(window.SuperResolution){



                    UI.status(
                        "AI Upscaling..."
                    );



                    UI.progress(
                        80
                    );



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

                        "HD Result:",
                        hd.width,
                        "x",
                        hd.height

                    );


                }



            }







            const end =
            performance.now();



            console.log(

                "Finished",
                (end-start).toFixed(0),
                "ms"

            );



            UI.progress(
                100
            );


            UI.status(
                "Finished"
            );



            UI.toast(
                "Preset Finished"
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



        UI.loading(false);


    },







    //--------------------------------------------------

    registerServiceWorker(){


        if(
            !("serviceWorker" in navigator)
        )
        return;



        navigator.serviceWorker
        .register(
            "./service-worker.js"
        )

        .then(()=>{


            console.log(
                "Service Worker Registered"
            );


        })


        .catch(err=>{


            console.error(
                err
            );


        });



    }


};





window.App =
App;





window.addEventListener(
"load",
()=>{

    App.init();

}
);
