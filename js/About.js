let showMore = document.getElementById("showMore");
let icons = document.getElementById("icons");

showMore.addEventListener("click",()=>{
    icons.classList.remove("hidden");
   
})



let carousel=document.getElementById("carousel")
carousel.addEventListener("wheel",(evt)=>{
    carousel.scrollLeft += evt.deltaX;
})