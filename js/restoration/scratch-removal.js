const ScratchRemoval = {


apply(imageData){


console.log(
"Removing Scratch..."
);



let data =
imageData.data;



for(
let i=0;
i<data.length;
i+=4
){


let r=data[i];
let g=data[i+1];
let b=data[i+2];



let bright =
(r+g+b)/3;



if(
bright > 245
){


data[i]*=.96;
data[i+1]*=.96;
data[i+2]*=.96;


}



}



console.log(
"Scratch Reduced"
);



return imageData;


}


};



window.ScratchRemoval =
ScratchRemoval;
