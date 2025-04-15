function loadCategories(){
    // 1- fetching data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // 2- coverting promise to json
    .then((res)=>res.json())
    // 3- send data to display category
    .then((data)=>displayCategories(data.categories))
}

function displayCategories(categories) {
    //  get the container
    const categoryContainer=document.getElementById("category-container");

    //  Loop operation on Array of object
    for(let cat of categories) {
        //  create element
        const categoryDiv=document.createElement("div");
        categoryDiv.innerHTML = `
        <button onclick="loadCategoryVideos(${cat.category_id})" class="btn text-black hover:bg-[#FF1F3D] hover:text-white btn-sm">${cat.category}</button>
        `
        //  append element
        categoryContainer.appendChild(categoryDiv);
    }
    
}

function loadVideos() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(response=> response.json())
    .then(data=>displayVideos(data.videos));
}

const displayVideos=(videos)=>{
    const videoContainer=document.getElementById("video-container");
    videoContainer.innerHTML="";
    videos.forEach(video=>{
        // creating element
        const videoCard=document.createElement("div");
        videoCard.innerHTML = `
        <div class="card bg-base-100">
        <figure class="relative">
          <img class="w-full h-[160px] object-cover" src="${video.thumbnail}" />
          <span class="absolute bottom-2 right-2 text-xs text-white bg-black p-1 rounded-sm">
            3hrs 56 min ago
          </span>
        </figure>
        <div class=" py-6 flex flex-row gap-5 px-2">
          <div class="profile">
            <div class="avatar">
                <div class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                  <img src="${video.authors[0].profile_picture}" />
                </div>
              </div>
          </div>
          <div class="intro space-y-1">
            <h2 class="text-md font-semibold">${video.title}</h2>
            <p class="text-xs flex gap-x-1 text-gray-600">${video.authors[0].profile_name}
                <img class="w-1/10" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="verified badge">
            </p>
            <p class="text-xs text-gray-600">
                ${video.others.views} Views
            </p>
          </div>
        </div>
      </div>
        
        `
        videoContainer.appendChild(videoCard);
    })
}

const loadCategoryVideos=(id)=>{
    
    const url =`
    https://openapi.programming-hero.com/api/phero-tube/category/${id}
    `;
    // console.log(url);
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayVideos(data.category));
};

loadCategories();