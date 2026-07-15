/*
===========================================
Film Scan Studio
AppDIGI
app.js
===========================================
*/

const App = {

    canvas: null,
    ctx: null,

    image: null,

    currentFile: null,

    init() {

        console.log("Film Scan Studio Started");

        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.bindUpload();

        this.bindButtons();

        this.registerSW();

    },

    bindUpload() {

        const upload = document.getElementById("upload");

        upload.addEventListener("change", (e) => {

            const file = e.target.files[0];

            if (!file) return;

            this.loadImage(file);

        });

        const area = document.querySelector(".upload");

        area.addEventListener("dragover", (e) => {

            e.preventDefault();

            area.style.borderColor = "#00b894";

        });

        area.addEventListener("dragleave", () => {

            area.style.borderColor = "#555";

        });

        area.addEventListener("drop", (e) => {

            e.preventDefault();

            area.style.borderColor = "#555";

            const file = e.dataTransfer.files[0];

            if (!file) return;

            this.loadImage(file);

        });

    },

    loadImage(file) {

        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = () => {

            const img = new Image();

            img.onload = () => {

                this.image = img;

                this.draw(img);

                this.toast("Foto berhasil dimuat");

            };

            img.src = reader.result;

        };

        reader.readAsDataURL(file);

    },

    draw(img) {

        this.canvas.width = img.width;

        this.canvas.height = img.height;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.drawImage(

            img,

            0,

            0,

            this.canvas.width,

            this.canvas.height

        );

    },

    bindButtons() {

        const generate = document.getElementById("generate");

        const exportBtn = document.getElementById("export");

        generate.addEventListener("click", () => {

            if (!this.image) {

                this.toast("Upload foto terlebih dahulu");

                return;

            }

            this.loading(true);

            setTimeout(() => {

                if (window.PresetEngine) {

                    PresetEngine.apply(

                        this.canvas,

                        this.ctx

                    );

                }

                this.loading(false);

                this.toast("Preset berhasil diterapkan");

            }, 300);

        });

        exportBtn.addEventListener("click", () => {

            if (!this.image) {

                this.toast("Belum ada foto");

                return;

            }

            if (window.ExportManager) {

                ExportManager.jpg(this.canvas);

            }

        });

    },

    loading(show) {

        let loader = document.querySelector(".loader");

        if (!loader) {

            loader = document.createElement("div");

            loader.className = "loader";

            document.body.appendChild(loader);

        }

        loader.style.display = show ? "block" : "none";

    },

    toast(message) {

        let toast = document.querySelector(".toast");

        if (!toast) {

            toast = document.createElement("div");

            toast.className = "toast";

            document.body.appendChild(toast);

        }

        toast.innerText = message;

        toast.style.display = "block";

        clearTimeout(this.toastTimer);

        this.toastTimer = setTimeout(() => {

            toast.style.display = "none";

        }, 2500);

    },

    registerSW() {

        if ("serviceWorker" in navigator) {

            navigator.serviceWorker

                .register("service-worker.js")

                .then(() => {

                    console.log("Service Worker Registered");

                })

                .catch(console.error);

        }

    }

};

window.addEventListener(

    "DOMContentLoaded",

    () => App.init()

);
