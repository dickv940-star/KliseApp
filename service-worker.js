const CACHE = "FilmHD-v1";

const FILES = [

"./",

"./index.html",

"./manifest.json",

"./css/style.css",

"./js/app.js"

];

self.addEventListener("install", event => {

event.waitUntil(

caches.open(CACHE)

.then(cache => cache.addAll(FILES))

);

});

self.addEventListener("activate", event => {

event.waitUntil(

caches.keys()

.then(keys =>

Promise.all(

keys.map(key => {

if(key !== CACHE){

return caches.delete(key);

}

})

)

)

);

});

self.addEventListener("fetch", event => {

event.respondWith(

caches.match(event.request)

.then(response => {

return response || fetch(event.request);

})

);

});