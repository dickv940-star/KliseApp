/*
=========================================================
Film Scan Studio
UI Controller
Version 2.1
AppDIGI
=========================================================
*/


const UI = {


    loadingElement: null,

    statusElement: null,

    progressElement: null,

    progressText: null,


    fileInput: null,

    uploadButton: null,



    //------------------------------------------------
    // INIT
    //------------------------------------------------

    init(){


        this.loadingElement =
            document.getElementById(
                "loading"
            );


        this.statusElement =
            document.getElementById(
                "status"
            );


        this.progressElement =
            document.getElementById(
                "progress"
            );


        this.progressText =
            document.getElementById(
                "progressText"
            );



        this.initUpload();


        this.initDragDrop();



        console.log(
            "UI Ready"
        );


    },




    //------------------------------------------------
    // STATUS
    //------------------------------------------------

    status(text){


        console.log(
            text
        );


        if(this.statusElement){

            this.statusElement.textContent =
                text;

        }


    },





    //------------------------------------------------
    // LOADING
    //------------------------------------------------

    loading(show=true){


        if(!this.loadingElement)
            return;



        this.loadingElement.style.display =
            show ? "flex" : "none";


    },






    //------------------------------------------------
    // PROGRESS
    //------------------------------------------------

    progress(percent=0){


        if(!this.progressElement)
            return;



        percent =
            Math.max(
                0,
                Math.min(
                    100,
                    percent
                )
            );



        this.progressElement.style.width =
            percent + "%";



        if(this.progressText){

            this.progressText.textContent =
                Math.round(percent)+"%";

        }


    },






    //------------------------------------------------
    // TOAST
    //------------------------------------------------

    toast(message,time=2500){



        let toast =
            document.getElementById(
                "toast"
            );



        if(!toast){


            toast =
                document.createElement(
                    "div"
                );


            toast.id =
                "toast";


            toast.className =
                "toast";


            document.body.appendChild(
                toast
            );


        }



        toast.textContent =
            message;



        toast.classList.add(
            "show"
        );



        setTimeout(()=>{


            toast.classList.remove(
                "show"
            );


        },time);



    },







    //------------------------------------------------
    // UPLOAD FOTO KLİSE
    //------------------------------------------------

    initUpload(){



        this.uploadButton =
            document.getElementById(
                "uploadBtn"
            );



        this.fileInput =
            document.getElementById(
                "filmInput"
            );




        if(
            !this.uploadButton ||
            !this.fileInput
        ){


            console.warn(
                "Upload element belum tersedia"
            );


            return;


        }





        this.uploadButton.addEventListener(
            "click",
            ()=>{


                console.log(
                    "Opening file picker"
                );


                this.fileInput.click();



            }
        );






        this.fileInput.addEventListener(
            "change",
            async e=>{


                const file =
                    e.target.files[0];



                if(!file)
                    return;




                console.log(
                    "Selected:",
                    file.name
                );



                this.status(
                    "Memuat foto..."
                );



                if(
                    window.App &&
                    typeof App.loadImage === "function"
                ){


                    await App.loadImage(
                        file
                    );



                    this.status(
                        "Foto berhasil dimuat"
                    );


                }
                else{


                    console.error(
                        "App.loadImage tidak tersedia"
                    );


                }



            }
        );



    },







    //------------------------------------------------
    // DRAG DROP
    //------------------------------------------------

    initDragDrop(){



        const dropArea =
            document.getElementById(
                "dropArea"
            );



        if(!dropArea)
            return;





        [
            "dragenter",
            "dragover"

        ].forEach(event=>{


            dropArea.addEventListener(
                event,
                e=>{


                    e.preventDefault();


                    dropArea.classList.add(
                        "drag"
                    );


                }
            );


        });







        [
            "dragleave",
            "drop"

        ].forEach(event=>{


            dropArea.addEventListener(
                event,
                e=>{


                    e.preventDefault();


                    dropArea.classList.remove(
                        "drag"
                    );


                }
            );


        });







        dropArea.addEventListener(
            "drop",
            async e=>{


                const files =
                    e.dataTransfer.files;



                if(
                    files &&
                    files.length
                ){


                    await App.loadImage(
                        files[0]
                    );


                }



            }
        );



    },








    //------------------------------------------------
    // BUTTON CONTROL
    //------------------------------------------------

    enableGenerate(enable=true){


        const btn =
            document.getElementById(
                "generate"
            );


        if(btn)
            btn.disabled =
                !enable;



    },




    enableExport(enable=true){


        const btn =
            document.getElementById(
                "export"
            );


        if(btn)
            btn.disabled =
                !enable;



    },






    //------------------------------------------------
    // BEFORE AFTER
    //------------------------------------------------

    beforeAfter(showAfter=true){



        const before =
            document.getElementById(
                "beforeCanvas"
            );



        const after =
            document.getElementById(
                "preview"
            );



        if(
            !before ||
            !after
        )
            return;



        before.style.display =
            showAfter ?
            "none":
            "block";



        after.style.display =
            showAfter ?
            "block":
            "none";


    },







    //------------------------------------------------
    // RESET
    //------------------------------------------------

    reset(){


        this.progress(
            0
        );


        this.status(
            "Ready"
        );


        this.enableGenerate(
            false
        );


        this.enableExport(
            false
        );


    }



};





window.UI = UI;





window.addEventListener(
"DOMContentLoaded",
()=>{


    UI.init();


});
