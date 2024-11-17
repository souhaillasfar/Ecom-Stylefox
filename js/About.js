let showMore = document.getElementById("showMore");
let icons = document.getElementById("icons");
let mysection=document.getElementById('mysection');
let test =document.getElementById('test1');
let showLess = document.getElementById("showLess");


// Gestion du menu mobile
document.addEventListener('DOMContentLoaded', function () {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu');

    // Ouvrir le menu
    hamburgerBtn.addEventListener('click', function () {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
    });

    // Fermer le menu
    closeMenuBtn.addEventListener('click', function () {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
    });
});


showMore.addEventListener('click',function(){
   icons.classList.remove('hidden')
    icons.classList.remove('md:hidden')
    showLess.classList.remove('hidden')
    showLess.classList.remove('md:hidden')
    showMore.classList.add('hidden')
    showMore.classList.add('hidden')
     

})

showLess.addEventListener('click',function(){


    icons.classList.add('hidden')
    icons.classList.add('md:hidden')
    showMore.classList.remove('hidden')
    showMore.classList.remove('md:hidden')
    showLess.classList.add('hidden')
    showLess.classList.add('md:hidden')

})

/////

let carousel=document.getElementById("carousel")
carousel.addEventListener("wheel",(evt)=>{
    carousel.scrollLeft += evt.deltaX;
})

// 
let solid = document.getElementById('solid');
let rendy=document.getElementById('rendy');
let select = document.getElementById('select');

let medal = document.getElementById('medal');
let superio = document.getElementById('superio');
let Material= document.getElementById('Material');

let user = document.getElementById('user');
let detail = document.getElementById('detail');
let an = document.getElementById('an');

let truck = document.getElementById('truck');
let flex = document.getElementById('flex');
let  provide = document.getElementById('provide');

let head = document.getElementById('head');
let live = document.getElementById('live');
let  instant = document.getElementById('instant');

let squar = document.getElementById('squar');
let social = document.getElementById('social');
let  enable = document.getElementById('enable');





fetch('../data/data.json')
.then(response=>response.json())
.then(data=>{


    data.forEach((item)=>{



        if(item.id==1){
            rendy.innerHTML=`${item.titre}`;
            select.innerHTML=`${item.short_description}`

        }
        else if(item.id==2){
            superio.innerHTML=`${item.titre}`;
            Material.innerHTML=`${item.short_description}`

        }
        else if(item.id==3){
            detail.innerHTML=`${item.titre}`;
            an.innerHTML=`${item.short_description}`

        }
        else if(item.id==4){
            flex.innerHTML=`${item.titre}`;
            provide.innerHTML=`${item.short_description}`

        }
        else if(item.id==5){
            live.innerHTML=`${item.titre}`;
            instant.innerHTML=`${item.short_description}`

        }
        else if(item.id==6){
            social.innerHTML=`${item.titre}`;
            enable.innerHTML=`${item.short_description}`

        }
        

       
    })
   
   


})

let flesh = document.querySelectorAll('.flesh')
let contenuOne = document.querySelector('.contenu1')
let contenuTwo = document.querySelector('.contenu2')
let contenuThree = document.querySelector('.contenu3')
let contenuFour = document.querySelector('.contenu4')



flesh.forEach((fleshElement, index) => {
    fleshElement.addEventListener('click', function() {
     
        if (index === 0) {
            contenuOne.classList.toggle('hidden');
            contenuOne.classList.toggle('md:hidden');


            
        } 
        else if (index === 1) {
            contenuTwo.classList.toggle('hidden');
            contenuTwo.classList.toggle('md:hidden');
        } else if (index === 2) {
            contenuThree.classList.toggle('hidden');
            contenuThree.classList.toggle('md:hidden');
        } else if (index === 3) {
            contenuFour.classList.toggle('hidden');
            contenuFour.classList.toggle('md:hidden');
        }

   
    });
});



fetch(window.products)

.then(result=>result.json())
.then(function(data){


    data.forEach(item => {
        let gray = 5 - parseInt(item.rate)
        
        const element = document.createElement('div')
        element.className = 'min-w-[18rem] ml-[10px] md:ml-[1rem] mt-10'
        element.innerHTML += `<img src="${item.variants[0].images[0]}" alt=""  class="md:h-[22rem] md:w-[23rem] w-[11rem] h-[10rem] " >`
        element.innerHTML += `<p class="text-[12px] font-bold  mt-[1rem] ">${item.title}</p>`
        element.innerHTML += `<p class="text-[12px] text-slate-800 mt-[10px] w-[13rem] md:min-w-[18rem]">${item.description}</p>`
        for(let i=0; i< parseInt(item.rate); i++){
            element.innerHTML += `<i class="fa-solid fa-star text-yellow-400"></i>`
        }

        for(let i=0; i < parseInt(gray); i++){
            element.innerHTML += `<i class="fa-solid fa-star text-gray-400"></i>`
        }

        carousel.appendChild(element)

        
    })
 
})


















