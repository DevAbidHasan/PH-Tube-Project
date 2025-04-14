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
        <button class="btn text-black hover:bg-[#FF1F3D] hover:text-white btn-sm">${cat.category}</button>
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

loadCategories();
loadVideos();

// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }