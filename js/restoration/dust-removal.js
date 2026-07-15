/*
Dust Removal
*/


const DustRemoval = {


apply(imageData){


console.log(
"Removing Dust..."
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



let avg =
(r+g+b)/3;



// pixel terlalu gelap kecil
// dianggap debu


if(
avg < 8
){


data[i]=avg;
data[i+1]=avg;
data[i+2]=avg;


}



}



console.log(
"Dust Removed"
);



return imageData;


}


};



window.DustRemoval =
DustRemoval;
