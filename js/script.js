if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/my-pwa/service-worker.js',{ scope:'/my-pwa/' })
    .then((registration) => {
        console.log('Success. Scope:', registration.scope);
    })
    .catch((error) => {
        console.log('Failed. Error:', error);
    });
}
else{
    console.log("Service worker is not found!!!")
}


