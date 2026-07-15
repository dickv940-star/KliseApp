/*
=========================================
Film Scan Studio
App Controller
Version 2.0
AppDIGI
=========================================
*/

const App = {

    canvas: null,
    ctx: null,

    init() {

        console.log("Film Scan Studio Started");

        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d", {
            willReadFrequently: true
        });

        ImageEngine.init(this.canvas);

        this.bindUpload();

        this.bindExport();

    },

    bindUpload() {

        const upload = document.getElementById("upload");

        upload.addEventListener("change", async (e) => {

            const file = e.target.files[0];

            if (!file) return;

            await this.process(file);

        });

        const area = document.querySelector(".upload");

        area.addEventListener("dragover", (e) => {

            e.preventDefault();

            area.style.borderColor = "#00b894";

        });

        area.addEventListener("dragleave", () => {

            area.style.borderColor = "#555";

        });

        area.addEventListener("drop", async (e) => {

            e.preventDefault();

            area.style.borderColor = "#555";

            const file = e.dataTransfer.files[0];

            if (!file) return;

            await this.process(file);

        });

    },

    async process(file) {

        try {

            UI.showLoading("Loading Scan...");

            await ImageEngine.load(file);

            UI.progress(20);

            UI.showLoading("Generating Preset...");

            await new Promise(resolve => setTimeout(resolve, 100));

            PresetEngine.apply(
                ImageEngine.canvas,
                ImageEngine.ctx
            );

            UI.progress(100);

            UI.hideLoading();

            UI.toast("Preset berhasil diterapkan");

            UI.status("Ready");

        }

        catch (err) {

            console.error(err);

            UI.hideLoading();

            UI.toast("Gagal memproses gambar");

        }

    },

    bindExport() {

        const jpg = document.getElementById("export");

        if (jpg) {

            jpg.addEventListener("click", () => {

                ExportManager.jpg(ImageEngine.canvas);

            });

        }

        const png = document.getElementById("exportPNG");

        if (png) {

            png.addEventListener("click", () => {

                ExportManager.png(ImageEngine.canvas);

            });

        }

    }

};

window.addEventListener("DOMContentLoaded", () => {

    App.init();

});
