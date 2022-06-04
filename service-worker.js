//called when sw is installed
self.addEventListener('install',function(event){
    console.log('SW installed:',event)
    self.skipWaiting();
})


//called when sW activated
self.addEventListener('activate',function(event){
    console.log('SW Activated:0',event)
    event.waitUntil(clients.claim());
})

//every time something comes from the web
self.addEventListener('fetch',function(event){
    return;
});