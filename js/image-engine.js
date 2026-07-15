/*
=========================================================
Film Scan Studio
Image Engine
Version 2.0
AppDIGI
=========================================================
*/

const ImageEngine = {

    canvas: null,

    ctx: null,

    image: null,

    //--------------------------------------------------

    init(canvas){

        this.canvas = canvas;

        this.ctx = canvas.getContext(
            "2d",
            {
                willReadFrequently:true
            }
        );

    },

    //--------------------------------------------------

    load(file,canvas){

        return new Promise((resolve,reject)=>{

            if(!this.canvas){

                this.init(canvas);

            }

            const reader=new FileReader();

            reader.onload=(e)=>{

                const img=new Image();

                img.onload=()=>{

                    this.image=img;

                    this.draw(img);

                    resolve(img);

                };

                img.onerror=reject;

                img.src=e.target.result;

            };

            reader.onerror=reject;

            reader.readAsDataURL(file);

        });

    },

    //--------------------------------------------------

    draw(img){

        const maxWidth=2500;

        const maxHeight=2500;

        let w=img.width;

        let h=img.height;

        //--------------------------------------
        // Resize jika terlalu besar
        //--------------------------------------

        if(w>maxWidth){

            h*=maxWidth/w;

            w=maxWidth;

        }

        if(h>maxHeight){

            w*=maxHeight/h;

            h=maxHeight;

        }

        this.canvas.width=w;

        this.canvas.height=h;

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

            "Image Loaded",

            w,

            "x",

            h

        );

    },

    //--------------------------------------------------

    getCanvas(){

        return this.canvas;

    },

    //--------------------------------------------------

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

    //--------------------------------------------------

    putImageData(image){

        this.ctx.putImageData(

            image,

            0,

            0

        );

    },

    //--------------------------------------------------

    clone(){

        const image=

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

            this.draw(this.image);

        }

    },

    //--------------------------------------------------

    clear(){

        this.ctx.clearRect(

            0,

            0,

            this.canvas.width,

            this.canvas.height

        );

    },

    //--------------------------------------------------

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
