/*
=========================================================
Film Scan Studio
Real AI Super Resolution
Version 2.0
=========================================================
*/


const SuperResolution = {



async enhance(canvas){


    console.log(
        "Real AI Upscale Start"
    );



    const model =
        await AIModel.load();



    const tensor =
        tf.browser.fromPixels(
            canvas
        )
        .expandDims(0)
        .div(255);



    const result =
        await model.executeAsync(
            tensor
        );



    const output =
        result
        .squeeze();



    const outCanvas =
        document.createElement(
            "canvas"
        );



    await tf.browser.toPixels(
        output,
        outCanvas
    );



    tensor.dispose();


    output.dispose();



    console.log(
        "AI Upscale Finished"
    );



    return outCanvas;


}



};



window.SuperResolution =
SuperResolution;


console.log(
"Real AI Super Resolution Loaded"
);
