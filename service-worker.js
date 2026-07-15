const CACHE="film-scan-v1";

const FILES=[

"./",

"./index.html",

"./manifest.json",

"./css/style.css",

"./js/app.js",

"./js/ui.js",

"./js/image-engine.js",

"./js/preset-engine.js",

"./js/export.js",

"./assets/logo.png",

"./assets/icon-192.png",

"./assets/icon-512.png"

];

self.addEventListener("install",e=>{

e.waitUntil(

caches.open(CACHE)

.then(cache=>cache.addAll(FILES))

);

});

self.addEventListener("activate",e=>{

e.waitUntil(

self.clients.claim()

);

});

self.addEventListener("fetch",e=>{

e.respondWith(

caches.match(e.request)

.then(res=>{

return res || fetch(e.request);

})

);

});
