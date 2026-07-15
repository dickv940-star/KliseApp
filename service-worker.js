/*
=========================================================
Film Scan Studio
Service Worker
Version 1.1
AppDIGI
=========================================================
*/


const CACHE_NAME = "film-scan-v2";


const FILES_TO_CACHE = [

    "./",

    "./index.html",

    "./manifest.json",


    // CSS
    "./css/style.css",


    // CORE JS
    "./js/app.js",
    "./js/ui.js",
    "./js/image-engine.js",
    "./js/preset-engine.js",
    "./js/export.js",


    // ASSETS
    "./assets/logo.png",
    "./assets/icon-192.png",
    "./assets/icon-512.png"

];





// ================================
// INSTALL
// ================================

self.addEventListener(
"install",
event => {


    console.log(
        "Service Worker Installing..."
    );


    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(async cache => {


            for(
                const file of FILES_TO_CACHE
            ){


                try{


                    await cache.add(file);


                    console.log(
                        "Cached:",
                        file
                    );


                }
                catch(error){


                    console.warn(
                        "Skip missing file:",
                        file
                    );


                }


            }


        })


    );


    self.skipWaiting();


});







// ================================
// ACTIVATE
// ================================

self.addEventListener(
"activate",
event => {


    console.log(
        "Service Worker Activated"
    );


    event.waitUntil(

        caches.keys()

        .then(keys => {


            return Promise.all(

                keys.map(key=>{


                    if(
                        key !== CACHE_NAME
                    ){

                        console.log(
                            "Delete old cache:",
                            key
                        );


                        return caches.delete(key);

                    }


                })

            );


        })


    );


    self.clients.claim();


});







// ================================
// FETCH
// ================================

self.addEventListener(
"fetch",
event => {


    event.respondWith(


        caches.match(
            event.request
        )

        .then(response=>{


            return response ||

            fetch(event.request)

            .then(fetchResponse=>{


                return fetchResponse;


            });


        })

        .catch(()=>{


            return caches.match(
                "./index.html"
            );


        })


    );


});
