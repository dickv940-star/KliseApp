const FaceDetail = {


apply(imageData){


console.log(
"Enhancing Face Detail..."
);



let data =
imageData.data;



for(
let i=0;
i<data.length;
i+=4
){


data[i]=Math.min(
255,
data[i]*1.03
);


data[i+1]=Math.min(
255,
data[i+1]*1.03
);


data[i+2]=Math.min(
255,
data[i+2]*1.03
);



}



console.log(
"Face Detail Enhanced"
);



return imageData;


}


};



window.FaceDetail =
FaceDetail;
