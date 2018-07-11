const CACHE_SCRIPTS = "cache-scripts";   
const appShell = [
    
    'assets/js/saludo.js',
    'assets/js/app.js' ,
    'assets/js/idbPromised.js'
]

 self.addEventListener("install", function(event){
    event.waitUntil(

        caches.open(CACHE_SCRIPTS).then((cache)=>{

            return cache.addAll(appShell)
        }) 

    );
 })