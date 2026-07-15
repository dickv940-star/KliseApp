/*
=========================================
Film Scan Studio
UI Manager
Version 1.0
=========================================
*/

const UI = {

    loadingElement: null,

    toastElement: null,

    progressElement: null,

    statusElement: null,

    init() {

        console.log("UI Ready");

        this.createLoading();

        this.createToast();

        this.createProgress();

        this.createStatus();

        this.bindDragArea();

    },

    /* ===========================
       LOADING
    =========================== */

    createLoading() {

        this.loadingElement = document.createElement("div");

        this.loadingElement.id = "loading";

        this.loadingElement.innerHTML = `
            <div class="loader"></div>
            <p>Processing...</p>
        `;

        Object.assign(this.loadingElement.style,{

            position:"fixed",

            inset:"0",

            background:"rgba(0,0,0,.75)",

            display:"none",

            justifyContent:"center",

            alignItems:"center",

            flexDirection:"column",

            zIndex:"9999",

            color:"#fff"

        });

        document.body.appendChild(this.loadingElement);

    },

    showLoading(text="Processing..."){

        this.loadingElement.style.display="flex";

        this.loadingElement.querySelector("p").textContent=text;

    },

    hideLoading(){

        this.loadingElement.style.display="none";

    },



    /* ===========================
       TOAST
    =========================== */

    createToast(){

        this.toastElement=document.createElement("div");

        this.toastElement.className="toast";

        document.body.appendChild(this.toastElement);

    },

    toast(message,time=2500){

        this.toastElement.innerHTML=message;

        this.toastElement.style.display="block";

        clearTimeout(this.toastTimer);

        this.toastTimer=setTimeout(()=>{

            this.toastElement.style.display="none";

        },time);

    },



    /* ===========================
       PROGRESS
    =========================== */

    createProgress(){

        const wrap=document.createElement("div");

        wrap.className="progress";

        wrap.style.display="none";

        wrap.style.position="fixed";

        wrap.style.top="0";

        wrap.style.left="0";

        wrap.style.width="100%";

        wrap.style.zIndex="99999";

        const bar=document.createElement("div");

        wrap.appendChild(bar);

        document.body.appendChild(wrap);

        this.progressElement=wrap;

    },

    progress(value){

        this.progressElement.style.display="block";

        this.progressElement.firstElementChild.style.width=value+"%";

        if(value>=100){

            setTimeout(()=>{

                this.progressElement.style.display="none";

                this.progressElement.firstElementChild.style.width="0%";

            },500);

        }

    },



    /* ===========================
       STATUS BAR
    =========================== */

    createStatus(){

        this.statusElement=document.createElement("div");

        this.statusElement.style.textAlign="center";

        this.statusElement.style.padding="12px";

        this.statusElement.style.color="#999";

        this.statusElement.innerHTML="Ready";

        document.body.appendChild(this.statusElement);

    },

    status(text){

        this.statusElement.innerHTML=text;

    },



    /* ===========================
       BUTTON
    =========================== */

    disable(id){

        const el=document.getElementById(id);

        if(el){

            el.disabled=true;

        }

    },

    enable(id){

        const el=document.getElementById(id);

        if(el){

            el.disabled=false;

        }

    },



    /* ===========================
       DRAG DROP
    =========================== */

    bindDragArea(){

        const area=document.querySelector(".upload");

        if(!area) return;

        area.addEventListener("dragenter",()=>{

            area.style.borderColor="#00d084";

            area.style.background="#252525";

        });

        area.addEventListener("dragleave",()=>{

            area.style.borderColor="#555";

            area.style.background="#1a1a1a";

        });

        area.addEventListener("drop",()=>{

            area.style.borderColor="#555";

            area.style.background="#1a1a1a";

        });

    },



    /* ===========================
       BEFORE AFTER
    =========================== */

    beforeAfter(beforeCanvas,afterCanvas){

        console.log("Before After Mode");

        // disiapkan untuk slider comparison
    },



    /* ===========================
       ZOOM
    =========================== */

    zoomLabel(value){

        this.status("Zoom : "+value+"%");

    },



    /* ===========================
       RESET UI
    =========================== */

    reset(){

        this.status("Ready");

        this.progress(0);

        this.hideLoading();

    }

};



window.addEventListener("DOMContentLoaded",()=>{

    UI.init();

});
