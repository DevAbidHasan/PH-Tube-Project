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
loadCategories();