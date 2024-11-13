let showMore = document.getElementById("showMore");
let icons = document.getElementById("icons");
let mysection=document.getElementById('mysection');

showMore.addEventListener('click',function(e){

    e.preventDefault();
    showMore
    let file=document.createElement('span');
     file.innerHTML=`
      <div class=" md:flex md:mt-[5rem] ">
            <div class="text-center  w-4/5 mx-auto mt-9 md:w-[20rem] border borde-black py-7 rounded-[10px] bg-gradient-to-br from-orange-600 to-blue-500 group-hover:from-orange-600 group-hover:to-blue-500 hover:text-white dark:text-white ">
                <i class=" text-[30px] " id="solid"></i>
                <p class="py-3" id="rendy"></p>
                <p class="" id="select"></p>
                   
               
            </div>
            <div class="text-center  w-4/5 mx-auto mt-9 md:w-[20rem] py-7 rounded-[10px] bg-gradient-to-br from-orange-600 to-blue-500 group-hover:from-orange-600 group-hover:to-blue-500 hover:text-white dark:text-white">
                <i class="fa-solid fa-medal text-[30px]" id="medal"></i>
                <p class="py-3" id="superio"></p>
                <p id="Material">
                </p>
            </div>
            <div class="text-center  w-4/5 mx-auto mt-9 md:w-[20rem] py-7 rounded-[10px] bg-gradient-to-br from-orange-600 to-blue-500 group-hover:from-orange-600 group-hover:to-blue-500 hover:text-white dark:text-white">
                <i class="fa-solid fa-users text-[30px]" id="user"></i>
                <p class="py-3" id="detail"></p>
                <p id="an"></p>
                    
              
            </div>
            
     `;
     mysection.appendChild(file);

})


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
            solid.innerHTML=`${item.icons}`;
            rendy.innerHTML=`${item.titre}`;
            select.innerHTML=`${item.short_description}`

        }
        else if(item.id==2){
            medal.innerHTML=`${item.icons}`;
            superio.innerHTML=`${item.titre}`;
            Material.innerHTML=`${item.short_description}`

        }
        else if(item.id==3){
            user.innerHTML=`${item.icons}`;
            detail.innerHTML=`${item.titre}`;
            an.innerHTML=`${item.short_description}`

        }
        else if(item.id==4){
            truck.innerHTML=`${item.icons}`;
            flex.innerHTML=`${item.titre}`;
            provide.innerHTML=`${item.short_description}`

        }
        else if(item.id==5){
            head.innerHTML=`${item.icons}`;
            live.innerHTML=`${item.titre}`;
            instant.innerHTML=`${item.short_description}`

        }
        else if(item.id==6){
            squar.innerHTML=`${item.icons}`;
            social.innerHTML=`${item.titre}`;
            enable.innerHTML=`${item.short_description}`

        }
        

       
    })
   
   


})


