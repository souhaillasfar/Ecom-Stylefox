const closeShopping = document.querySelector('#closeShopping');

console.log(closeShopping)

// close the shopping cart

closeShopping.addEventListener("click",function(){
    
    shopping.classList.add("hidden");
})

const minus = document.querySelector('#minus')
const plus = document.querySelector('#plus')
const num = document.querySelector('#num')

let x = 1;

plus.addEventListener("click",()=>{
    x++;
    console.log("x");
    num.innerText = x;
});


minus.addEventListener("click",()=>{

    if(x>1){
        x--;
        num.innerText = x;

    }
    console.log("x");
   
});