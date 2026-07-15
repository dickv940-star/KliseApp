/*
=========================================================
Film Scan Studio
Export Engine
Version 1.1
AppDIGI
=========================================================
*/


const ExportEngine = {


    save(canvas){


        if(!canvas){


            console.error(
                "Export gagal: canvas kosong"
            );


            return;


        }



        try{


            const link =
                document.createElement(
                    "a"
                );


            link.download =
                "film-scan-result.jpg";



            link.href =
                canvas.toDataURL(
                    "image/jpeg",
                    0.95
                );



            document.body.appendChild(
                link
            );


            link.click();


            document.body.removeChild(
                link
            );



            console.log(
                "Export JPG Finished"
            );



            if(window.UI){

                UI.toast(
                    "JPG berhasil disimpan"
                );

            }



        }
        catch(error){


            console.error(
                "Export Error:",
                error
            );


        }


    }


};





window.ExportEngine =
    ExportEngine;



console.log(
    "Export Engine Loaded"
);
