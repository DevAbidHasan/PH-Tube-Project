function loadCategories(){
    // 1- fetching data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // 2- coverting promise to json
    .then((res)=>res.json())
    // 3- send data to display category
    .then((data)=>displayCategories(data.categories))
}
function removeActiveClass () {
    const activeButtons=document.getElementsByClassName("active");
    for(let btn of activeButtons){
        btn.classList.remove("active");
    }
    console.log(activeButtons);
}

function displayCategories(categories) {
    //  get the container
    const categoryContainer=document.getElementById("category-container");

    //  Loop operation on Array of object
    for(let cat of categories) {
        //  create element
        const categoryDiv=document.createElement("div");
        categoryDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn text-black hover:bg-[#FF1F3D] hover:text-white btn-sm">${cat.category}</button>
        `
        //  append element
        categoryContainer.appendChild(categoryDiv);
    }
    
}

function loadVideos() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(response=> response.json())
    .then(data=>{
        removeActiveClass();
        document.getElementById("btn-all").classList.add("active");
        displayVideos(data.videos)
}
);
}

const displayVideos=(videos)=>{
    const videoContainer=document.getElementById("video-container");
    videoContainer.innerHTML="";
    if(videos.length==0) {
        videoContainer.innerHTML = `
        <div class="col-span-full py-15 flex flex-col justify-center items-center gap-y-8 text-center">
        <img class="w-[150px]" src="./Icon.png" alt="">
        <h2 class="font-bold text-3xl">
            Oops!! Sorry, There is no content here
        </h2>
      </div>
        
        `;
        return;
    }
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
                
                ${video.authors[0].verified == true ? `<img class="w-1/10" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="verified badge">` :``}
            </p>
            <p class="text-xs text-gray-600">
                ${video.others.views} Views
            </p>
          </div>
        </div>
        <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
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
    .then(data=>{
        removeActiveClass();
        const clickedButton=document.getElementById(`btn-${id}`);
        clickedButton.classList.add("active");
        // console.log(clickedButton);
        displayVideos(data.category)
    });
};
const loadVideoDetails=(videoId)=>{
    // console.log(videoId);
    const url=`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayVideoDetails(data.video));
}

const displayVideoDetails=(video)=>{
    console.log(video);
    document.getElementById("video_details").showModal();
    const detailsContainer=document.getElementById("details-container");
    detailsContainer.innerHTML=`
    <div class="card bg-base-600 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Video Modals" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p class="text-gray-300">
    ${video.description}
    </p>
    <div class="mt-10 flex gap-x-3">
    <img class="w-[37px] object-cover rounded-full" src="${video.authors[0].profile_picture}">
    <div>
    <p class="font-bold">
    ${video.authors[0].profile_name} 
    </p>
    <p class="text-xs mt-0.5">
    ${video.others.views} Views
    </p>
    </div>
    <div>
    ${video.authors[0].verified == true ? `<img class="w-1/5 mt-0.5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="verified badge">` :``}</div>
    </div>
    <div class="card-actions justify-end">
    
    </div>
  </div>
</div>
    `
}

loadCategories();