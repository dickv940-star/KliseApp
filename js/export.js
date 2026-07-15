/*
=========================================================
Film Scan Studio
Export Engine
Version 2.0 HD
AppDIGI
=========================================================
*/


const ExportEngine = {


    //--------------------------------------------------
    // SAVE IMAGE
    //--------------------------------------------------

    save(canvas){


        if(!canvas){


            console.error(
                "Export gagal: canvas kosong"
            );


            return;


        }



        console.log(
            "Exporting:",
            canvas.width,
            "x",
            canvas.height
        );



        canvas.toBlob(

            blob=>{


                if(!blob){

                    console.error(
                        "Blob export gagal"
                    );

                    return;

                }



                const url =
                    URL.createObjectURL(
                        blob
                    );



                const link =
                    document.createElement(
                        "a"
                    );


                link.href =
                    url;


                link.download =
                    "film-scan-hd.jpg";



                document.body.appendChild(
                    link
                );


                link.click();



                document.body.removeChild(
                    link
                );



                URL.revokeObjectURL(
                    url
                );



                console.log(
                    "Export Finished"
                );



                if(window.UI){

                    UI.toast(
                        "Foto HD berhasil disimpan"
                    );

                }



            },


            "image/jpeg",


            1.0


        );


    }



};




window.ExportEngine =
    ExportEngine;



console.log(
    "Export Engine Loaded"
);
