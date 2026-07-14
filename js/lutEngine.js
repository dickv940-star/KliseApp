// ===========================================
// FilmHD
// LUT Engine v1.0
// Support .cube LUT
// ===========================================

let LUT = {

    title:"",

    size:0,

    table:[]

};

// ===========================================
// Reset
// ===========================================

function resetLUT(){

    LUT.title="";

    LUT.size=0;

    LUT.table=[];

}

// ===========================================
// Load Cube Text
// ===========================================

function loadCube(text){

    resetLUT();

    const lines=text.split(/\r?\n/);

    for(let line of lines){

        line=line.trim();

        if(line==""||line.startsWith("#"))
            continue;

        if(line.startsWith("TITLE")){

            LUT.title=line
                .replace("TITLE","")
                .replace(/"/g,"")
                .trim();

            continue;

        }

        if(line.startsWith("LUT_3D_SIZE")){

            LUT.size=
                parseInt(
                    line.split(" ")[1]
                );

            continue;

        }

        const p=line.split(/\s+/);

        if(p.length===3){

            LUT.table.push({

                r:parseFloat(p[0]),

                g:parseFloat(p[1]),

                b:parseFloat(p[2])

            });

        }

    }

}

// ===========================================
// Index
// ===========================================

function cubeIndex(r,g,b){

    const size=LUT.size;

    const rr=Math.round(r*(size-1));

    const gg=Math.round(g*(size-1));

    const bb=Math.round(b*(size-1));

    return rr+
        gg*size+
        bb*size*size;

}

// ===========================================
// Apply LUT
// ===========================================

function applyLUT(r,g,b){

    if(LUT.size===0)
        return [r,g,b];

    const index=cubeIndex(

        r/255,

        g/255,

        b/255

    );

    const c=LUT.table[index];

    if(!c)
        return [r,g,b];

    return [

        clamp(c.r*255),

        clamp(c.g*255),

        clamp(c.b*255)

    ];

}

// ===========================================
// Default LUT
// ===========================================

function useNeutralLUT(){

    resetLUT();

}
