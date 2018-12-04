const CACHE_SCRIPTS = "cache-scripts";   
const appShell = [
     "/" 
]
 



 self.addEventListener("install", function(event){
    event.waitUntil(

        caches.open(CACHE_SCRIPTS).then((cache)=>{

            return cache.addAll(appShell)
        }) 

    );
 })


//  self.addEventListener("fetch", function(event){
//     // console.log("sacata", event.request)

//     var requestUrl = new URL(event.request.url);

//   if (requestUrl.origin === location.origin) {
//     if (requestUrl.pathname === '/hola') {
//             // console.log(requestUrl, "hola")
//         event.respondWith(
//               new Response("hola index!!")
//         )   
//     }   
//   }
    
//     event.respondWith(
//         caches.match(event.request)
//         .then(function(response){
//             if(response){
//                 // console.log(response)
//                return response; 
//             }    
//             return fetch(event.request)
        

//             const fetchRequest = event.request.clone();

//             return fetchRequest
//             .then(function(response){
//                 if(!response){
//                     return response;
//                 }

//                 const responseToCache = response.clone();

//                 caches.open("CACHE2").then(function(cache){
//                     cache.put(event.request, responseToCache)

//                 });

//               return response;  

//          });   

//         })
//     );
//  });