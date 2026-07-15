/*
=========================================
Film Scan Studio
Image Engine
Version 1.0
=========================================
*/

const ImageEngine = {

    canvas: null,
    ctx: null,

    image: null,

    scale: 1,

    rotation: 0,

    flipX: false,

    flipY: false,

    init(canvas) {

        this.canvas = canvas;

        this.ctx = canvas.getContext(
            "2d",
            {
                willReadFrequently: true
            }
        );

        console.log("Image Engine Ready");

    },

    load(file) {

        return new Promise((resolve, reject) => {

            if (!file) {

                reject("File kosong");

                return;

            }

            const reader = new FileReader();

            reader.onload = () => {

                const img = new Image();

                img.onload = () => {

                    this.image = img;

                    this.scale = 1;

                    this.rotation = 0;

                    this.flipX = false;

                    this.flipY = false;

                    this.fit();

                    resolve(img);

                };

                img.onerror = reject;

                img.src = reader.result;

            };

            reader.onerror = reject;

            reader.readAsDataURL(file);

        });

    },

    fit() {

        if (!this.image) return;

        this.canvas.width = this.image.width;

        this.canvas.height = this.image.height;

        this.render();

    },

    render() {

        if (!this.image) return;

        const w = this.canvas.width;

        const h = this.canvas.height;

        this.ctx.clearRect(0, 0, w, h);

        this.ctx.save();

        this.ctx.translate(w / 2, h / 2);

        this.ctx.rotate(this.rotation * Math.PI / 180);

        this.ctx.scale(

            this.flipX ? -this.scale : this.scale,

            this.flipY ? -this.scale : this.scale

        );

        this.ctx.drawImage(

            this.image,

            -this.image.width / 2,

            -this.image.height / 2

        );

        this.ctx.restore();

    },

    zoomIn() {

        this.scale += 0.10;

        this.render();

    },

    zoomOut() {

        this.scale -= 0.10;

        if (this.scale < 0.1) {

            this.scale = 0.1;

        }

        this.render();

    },

    rotateLeft() {

        this.rotation -= 90;

        this.render();

    },

    rotateRight() {

        this.rotation += 90;

        this.render();

    },

    flipHorizontal() {

        this.flipX = !this.flipX;

        this.render();

    },

    flipVertical() {

        this.flipY = !this.flipY;

        this.render();

    },

    reset() {

        this.scale = 1;

        this.rotation = 0;

        this.flipX = false;

        this.flipY = false;

        this.render();

    },

    resize(maxWidth = 4000) {

        if (!this.image) return;

        if (this.image.width <= maxWidth) return;

        const ratio = this.image.height / this.image.width;

        this.canvas.width = maxWidth;

        this.canvas.height = maxWidth * ratio;

        this.ctx.drawImage(

            this.image,

            0,

            0,

            this.canvas.width,

            this.canvas.height

        );

    },

    getImageData() {

        return this.ctx.getImageData(

            0,

            0,

            this.canvas.width,

            this.canvas.height

        );

    },

    putImageData(data) {

        this.ctx.putImageData(data, 0, 0);

    },

    getCanvas() {

        return this.canvas;

    },

    clear() {

        this.ctx.clearRect(

            0,

            0,

            this.canvas.width,

            this.canvas.height

        );

    }

};
