/*
=========================================================
Film Scan Studio
App Controller
Version 3.0
AppDIGI
=========================================================
*/


const App = {


    canvas:null,

    ctx:null,

    processing:false,

deferredPrompt:null,


//--------------------------------------------------

async init(){


console.log("================================");
console.log("Film Scan Studio Started");
console.log("================================");



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


UI.enableGenerate(false);

UI.enableExport(false);



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



const restoreBtn =
document.getElementById(
"applyRestore"
);





if(upload){


upload.addEventListener(
"change",
async(e)=>{


if(
!e.target.files.length
)
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
()=>{

this.generate();

}
);


}





if(reset){


reset.addEventListener(
"click",
()=>{


ImageEngine.reset();


UI.status(
"Image Reset"
);



}
);


}




if(exportBtn){


exportBtn.addEventListener(
"click",
()=>{


if(window.ExportEngine){

ExportEngine.save(
this.canvas
);

}


}
);


}




// NEW RESTORATION BUTTON

if(restoreBtn){


restoreBtn.addEventListener(
"click",
()=>{


this.restore();


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



await ImageEngine.load(
file,
this.canvas
);



UI.status(
"Image Loaded"
);



UI.enableGenerate(true);



await this.generate();



}



catch(err){


console.error(err);


UI.toast(
"Load Image Failed"
);



}



UI.loading(false);



},





//--------------------------------------------------

async generate(){



if(this.processing)
return;



try{


this.processing=true;


UI.loading(true);


UI.status(
"Applying Film Preset..."
);



UI.progress(
40
);



const start =
performance.now();





await FilmEngine.process(
this.canvas
);





// Detail Enhance

if(
window.DetailEnhance
){


UI.status(
"Enhancing Detail..."
);


await this.applyDetail();


}





// Super Resolution

if(
window.SuperResolution
){


UI.status(
"AI Upscaling..."
);



const hd =
await SuperResolution.enhance(
this.canvas
);



this.canvas.width =
hd.width;


this.canvas.height =
hd.height;



this.ctx.drawImage(
hd,
0,
0
);



console.log(
"Super Resolution:",
hd.width,
hd.height
);



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
"HD Film Preset Applied"
);



UI.enableExport(
true
);



}



catch(err){


console.error(err);


UI.toast(
"Generate Failed"
);



}



this.processing=false;


UI.loading(false);



},





//--------------------------------------------------

async applyDetail(){



if(
!window.DetailEnhance
)
return;



let ctx =
this.canvas.getContext(
"2d"
);



let data =
ctx.getImageData(
0,
0,
this.canvas.width,
this.canvas.height
);



data =
DetailEnhance.apply(
data
);



ctx.putImageData(
data,
0,
0
);



},






//--------------------------------------------------
// ADVANCED RESTORATION
//--------------------------------------------------

async restore(){



try{


if(
!window.RestorationEngine
){


throw new Error(
"Restoration Engine belum tersedia"
);


}




UI.loading(true);



UI.status(
"Advanced Restoration..."
);



UI.progress(
30
);




await RestorationEngine.process(
this.canvas
);




UI.progress(
100
);



UI.status(
"Restoration Finished"
);



UI.toast(
"Restoration Complete"
);



}



catch(err){


console.error(err);


UI.toast(
"Restoration Failed"
);



}



UI.loading(false);



},




//--------------------------------------------------
// Install PWA
//--------------------------------------------------

initInstall(){

    const installBtn =
        document.getElementById("installApp");

    if(!installBtn) return;

    installBtn.hidden = true;

    window.addEventListener(
        "beforeinstallprompt",
        (e)=>{

            e.preventDefault();

            this.deferredPrompt = e;

            installBtn.hidden = false;

            console.log("Install Prompt Ready");

        }
    );

    installBtn.addEventListener(
        "click",
        async()=>{

            if(!this.deferredPrompt){

                alert(
                    "Install belum tersedia."
                );

                return;

            }

            this.deferredPrompt.prompt();

            const result =
                await this.deferredPrompt.userChoice;

            console.log(result.outcome);

            this.deferredPrompt = null;

            installBtn.hidden = true;

        }
    );

}

//--------------------------------------------------

registerServiceWorker(){



if(
!"serviceWorker" in navigator
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

window.addEventListener(
"load",
()=>{


UI.init();

this.bindEvents();

this.initInstall();

this.registerServiceWorker();

UI.status("Ready");

UI.enableGenerate(false);
UI.enableExport(false);
});
