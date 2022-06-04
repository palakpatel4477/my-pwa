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

//load data from the web

function getPosts(){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => renderPosts(json))
}



function renderPosts(posts){
    const output=document.getElementById('output');
    output.innerHTML =``;
    for(const post of posts){
        console.log(post);
        output.innerHTML +=`
        <div class="post-container">
            <h3>${post.title}</h3>
            <div>${post.body}</div>
        </div>
        `
    }
}

function renderOffline(){
    const output=document.getElementById('output');
        output.innerHTML +=`
        <div class="post-container">
           Please check your cnnection.
        </div>
        `
}


if(navigator.onLine){
    getPosts()
}
else{
   renderOffline()
}

window.addEventListener('online',function(){
    getPosts();
})
