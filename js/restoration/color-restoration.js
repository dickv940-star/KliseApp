const ColorRestoration = {


apply(imageData){


console.log(
"Restoring Color..."
);



let data =
imageData.data;



for(
let i=0;
i<data.length;
i+=4
){


data[i] *=1.04;
data[i+1]*=1.02;
data[i+2]*=1.06;



}



console.log(
"Color Restored"
);



return imageData;


}


};



window.ColorRestoration =
ColorRestoration;
