/*
=========================================================
Film Scan Studio
Export Engine
Version 1.0
AppDIGI
=========================================================
*/


const ExportEngine = {


    canvas:null,



    init(){


        this.canvas =
            document.getElementById(
                "preview"
            );


        console.log(
            "Export Engine Ready"
        );


    },




    exportJPG(){


        if(!this.canvas){


            this.canvas =
                document.getElementById(
                    "preview"
                );


        }



        if(!this.canvas){


            console.error(
                "Preview canvas tidak ditemukan"
            );


            return;


        }



        const link =
            document.createElement(
                "a"
            );


        link.download =
            "film-scan-result.jpg";



        link.href =
            this.canvas.toDataURL(
                "image/jpeg",
                0.95
            );



        link.click();



        console.log(
            "Export JPG Finished"
        );


    }




};





window.ExportEngine =
    ExportEngine;



window.addEventListener(
"DOMContentLoaded",
()=>{


    ExportEngine.init();


});
