/*
=========================================================
Film Scan Studio
Image Engine
Version 2.1 HD
AppDIGI
=========================================================
*/


const ImageEngine = {


    canvas:null,

    ctx:null,

    image:null,



    //--------------------------------------------------
    init(canvas){


        this.canvas = canvas;


        this.ctx =
            canvas.getContext(
                "2d",
                {
                    alpha:false,
                    willReadFrequently:true
                }
            );


        this.ctx.imageSmoothingEnabled = true;


        this.ctx.imageSmoothingQuality =
            "high";


    },




    //--------------------------------------------------
    load(file,canvas){


        return new Promise(
        (resolve,reject)=>{


            if(!this.canvas){

                this.init(canvas);

            }



            const reader =
                new FileReader();



            reader.onload =
            e=>{


                const img =
                    new Image();



                img.onload =
                ()=>{


                    this.image =
                        img;


                    this.draw(
                        img
                    );


                    resolve(
                        img
                    );


                };



                img.onerror =
                    reject;



                img.src =
                    e.target.result;



            };



            reader.onerror =
                reject;



            reader.readAsDataURL(
                file
            );



        });


    },





    //--------------------------------------------------
    draw(img){


        let w =
            img.naturalWidth ||
            img.width;


        let h =
            img.naturalHeight ||
            img.height;



        /*
        Jangan resize kecuali terlalu besar
        */


        const MAX_SIZE =
            6000;



        if(
            w > MAX_SIZE ||
            h > MAX_SIZE
        ){


            const ratio =
                Math.min(
                    MAX_SIZE / w,
                    MAX_SIZE / h
                );


            w =
                Math.round(
                    w * ratio
                );


            h =
                Math.round(
                    h * ratio
                );


        }





        this.canvas.width =
            w;


        this.canvas.height =
            h;




        this.ctx.clearRect(
            0,
            0,
            w,
            h
        );




        this.ctx.drawImage(
            img,
            0,
            0,
            w,
            h
        );



        console.log(
            "HD Image Loaded",
            w,
            "x",
            h
        );



    },






    //--------------------------------------------------

    getCanvas(){

        return this.canvas;

    },




    getContext(){

        return this.ctx;

    },





    //--------------------------------------------------

    getImageData(){


        return this.ctx.getImageData(

            0,

            0,

            this.canvas.width,

            this.canvas.height

        );


    },






    putImageData(image){


        this.ctx.putImageData(

            image,

            0,

            0

        );


    },







    clone(){


        const image =
            this.getImageData();



        return new ImageData(

            new Uint8ClampedArray(
                image.data
            ),

            image.width,

            image.height

        );


    },







    //--------------------------------------------------

    reset(){


        if(this.image){

            this.draw(
                this.image
            );

        }


    },






    clear(){


        this.ctx.clearRect(

            0,

            0,

            this.canvas.width,

            this.canvas.height

        );


    },






    async process(){


        if(!this.canvas){

            console.warn(
                "Canvas belum tersedia"
            );

            return;

        }



        await FilmEngine.process(

            this.canvas

        );


    }



};




window.ImageEngine =
    ImageEngine;



console.log(
    "Image Engine HD Loaded"
);
