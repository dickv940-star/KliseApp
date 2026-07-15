/*
=========================================================
Film Scan Studio
AI Model Loader
Version 1.0
=========================================================
*/


const AIModel = {


    model:null,


    async load(){


        if(this.model){

            return this.model;

        }


        console.log(
            "Loading AI Model..."
        );


        this.model =
            await tf.loadGraphModel(
                "models/realesrgan/model.json"
            );


        console.log(
            "AI Model Loaded"
        );


        return this.model;


    }



};



window.AIModel =
AIModel;
