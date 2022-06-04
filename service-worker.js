const cacheName='v2';


//called when sw is installed
self.addEventListener('install',function(event){
    // console.log('SW installed:',event)
    self.skipWaiting();

    // console.log('cache from sw',caches);

    event.waitUntil(
    caches.open(cacheName)
        .then(function(cache){
            cache.addAll([
                '/my-pwa/',
                '/my-pwa/index.html',
                '/my-pwa/pic2.png',
                '/my-pwa/css/style.css',
                // '/my-pwa/manifest.json',
                '/my-pwa/js/script.js',
                '/my-pwa/icons/favicon-32x32.png',
                '/my-pwa/icons2/android-chrome-144x144.png'
            ]);
        })
    );
});


//called when sW activated
self.addEventListener('activate',function(event){
    console.log('SW Activated:0',event)
    event.waitUntil(clients.claim());

    //delete old caches
    event.waitUntil(
        caches.keys()
        .then(function(cacheNames){
            console.log(cacheNames)
            for(const item of cacheNames){
                if(item!==cacheName){
                caches.delete(item)
            }
            }
        })
    )
})

//every time something comes from the web
self.addEventListener('fetch',function(event){

    //----cache only
    // event.respondWith(
    //     caches.match(event.request)
    //     .then(function(response){
    //         return response;
    // })
    // )

    //----cache with network fallback.
    //  event.respondWith(
    //     caches.match(event.request)
    //     .then(function(response){
    //         if(response){
    //             return response;
    //         }
    //         else{
    //             return fetch(event.request);
    //         }      
    //     })
    // )

    //--network with cache fallback
    // event.respondWith(
    //     fetch(event.request)
    //         .then(function(response){
    //             return response;
    //         })
    //         .catch(function(){
    //              return caches.match(event.request);
    //         }) 
    // )


    //--stale caching
    event.respondWith(
        caches.open(cacheName)
        .then(function(cache){
            return cache.match(event.request)
            .then(function(cachedResponse){
                const fetchedResponse=fetch(event.request)
                .then(function(networkResponse){
                    cache.put(
                        event.request,
                        networkResponse
                    )
                    return networkResponse;
                })
                return cachedResponse || fetchedResponse;
            })
        })
    ) 
});