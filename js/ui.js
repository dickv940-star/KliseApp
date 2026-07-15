/*
=========================================================
Film Scan Studio
UI Controller
Version 2.0
AppDIGI
=========================================================
*/

const UI = {

    loadingElement: null,

    statusElement: null,

    progressElement: null,

    progressText: null,

    //------------------------------------------------

    init() {

        this.loadingElement =
            document.getElementById("loading");

        this.statusElement =
            document.getElementById("status");

        this.progressElement =
            document.getElementById("progress");

        this.progressText =
            document.getElementById("progressText");

        this.initDragDrop();

        console.log("UI Ready");

    },

    //------------------------------------------------

    status(text) {

        console.log(text);

        if (this.statusElement) {

            this.statusElement.textContent = text;

        }

    },

    //------------------------------------------------

    loading(show = true) {

        if (!this.loadingElement)
            return;

        this.loadingElement.style.display =
            show ? "flex" : "none";

    },

    //------------------------------------------------

    progress(percent = 0) {

        if (!this.progressElement)
            return;

        percent = Math.max(
            0,
            Math.min(
                100,
                percent
            )
        );

        this.progressElement.style.width =
            percent + "%";

        if (this.progressText) {

            this.progressText.textContent =
                Math.round(percent) + "%";

        }

    },

    //------------------------------------------------

    toast(message, time = 2500) {

        let toast =
            document.getElementById("toast");

        if (!toast) {

            toast =
                document.createElement("div");

            toast.id = "toast";

            toast.className = "toast";

            document.body.appendChild(toast);

        }

        toast.textContent = message;

        toast.classList.add("show");

        setTimeout(() => {

            toast.classList.remove("show");

        }, time);

    },

    //------------------------------------------------

    initDragDrop() {

        const dropArea =
            document.getElementById("dropArea");

        if (!dropArea)
            return;

        [
            "dragenter",
            "dragover"
        ].forEach(event => {

            dropArea.addEventListener(
                event,
                e => {

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
        ].forEach(event => {

            dropArea.addEventListener(
                event,
                e => {

                    e.preventDefault();

                    dropArea.classList.remove(
                        "drag"
                    );

                }
            );

        });

        dropArea.addEventListener(
            "drop",
            async e => {

                const files =
                    e.dataTransfer.files;

                if (
                    files &&
                    files.length
                ) {

                    await App.loadImage(
                        files[0]
                    );

                }

            }
        );

    },

    //------------------------------------------------

    enableGenerate(enable = true) {

        const btn =
            document.getElementById(
                "generate"
            );

        if (!btn)
            return;

        btn.disabled = !enable;

    },

    //------------------------------------------------

    enableExport(enable = true) {

        const btn =
            document.getElementById(
                "export"
            );

        if (!btn)
            return;

        btn.disabled = !enable;

    },

    //------------------------------------------------

    beforeAfter(showAfter = true) {

        const before =
            document.getElementById(
                "beforeCanvas"
            );

        const after =
            document.getElementById(
                "preview"
            );

        if (!before || !after)
            return;

        before.style.display =
            showAfter ? "none" : "block";

        after.style.display =
            showAfter ? "block" : "none";

    },

    //------------------------------------------------

    reset() {

        this.progress(0);

        this.status("Ready");

        this.enableGenerate(false);

        this.enableExport(false);

    }

};

window.addEventListener(
    "DOMContentLoaded",
    () => {

        UI.init();

    }
);
