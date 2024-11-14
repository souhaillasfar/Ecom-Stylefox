let showMore = document.getElementById("showMore");
let icons = document.getElementById("icons");
let mysection=document.getElementById('mysection');
let test =document.getElementById('test1');
let showLess = document.getElementById("showLess");





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
            solid.innerHTML=`${item.icons.url}`;
            rendy.innerHTML=`${item.titre}`;
            select.innerHTML=`${item.short_description}`

        }
        else if(item.id==2){
            medal.innerHTML=`${item.icons.url}`;
            superio.innerHTML=`${item.titre}`;
            Material.innerHTML=`${item.short_description}`

        }
        else if(item.id==3){
            user.innerHTML=`${item.icons.url}`;
            detail.innerHTML=`${item.titre}`;
            an.innerHTML=`${item.short_description}`

        }
        else if(item.id==4){
            truck.innerHTML=`${item.icons.url}`;
            flex.innerHTML=`${item.titre}`;
            provide.innerHTML=`${item.short_description}`

        }
        else if(item.id==5){
            head.innerHTML=`${item.icons.url}`;
            live.innerHTML=`${item.titre}`;
            instant.innerHTML=`${item.short_description}`

        }
        else if(item.id==6){
            squar.innerHTML=`${item.icons.url}`;
            social.innerHTML=`${item.titre}`;
            enable.innerHTML=`${item.short_description}`

        }
        

       
    })
   
   


})

let flesh = document.querySelectorAll('.flesh')
let contenu = document.querySelectorAll('.contenu')


// flesh.forEach(flesh => {
//     flesh.addEventListener('click' , () => {
//     contenu.classList.remove('hidden')
//     })
// })

flesh.forEach((fleshItem, index) => {
    fleshItem.addEventListener('click', () => {
        if (contenu[0]) {
            contenu[0].classList.remove('hidden');
        }
    });
});





