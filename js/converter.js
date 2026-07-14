// =============================================
// FilmHD
// Converter Engine v2.0
// =============================================

function convertImage(imageData){

    const data=imageData.data;

    const settings={

        exposure:Number(exposure.value),

        contrast:Number(contrast.value),

        temperature:Number(temperature.value),

        saturation:Number(saturation.value),

        gamma:1.0

    };

    for(let i=0;i<data.length;i+=4){

        let r=data[i];
        let g=data[i+1];
        let b=data[i+2];

        //--------------------------------------------------
        // COLOR ENGINE
        //--------------------------------------------------

        [r,g,b]=processPixel(

            r,
            g,
            b,
            settings

        );

        //--------------------------------------------------
        // FILM ENGINE
        //--------------------------------------------------

        [r,g,b]=filmEngine(

            r,
            g,
            b

        );

        //--------------------------------------------------
        // SAVE
        //--------------------------------------------------

        data[i]=r;
        data[i+1]=g;
        data[i+2]=b;

    }

    return imageData;

}
