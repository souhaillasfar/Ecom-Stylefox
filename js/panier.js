const closeShopping = document.querySelector('#closeShopping');
let Product = JSON.parse(localStorage.getItem("products"))||[]
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

const item1 ={

    "title": "tshirt",
    "picture": "hada",
    "price": 11,
    "quantity":23

   }
   const item2 ={

    "title": "tshirt",
    "picture": "hada",
    "price": 11,
    "quantity":23

   }
   const item3 ={

    "title": "tshirt",
    "picture": "hada",
    "price": 11,
    "quantity":23

   }

// if(Product.Length != 0){
//   console.log('hhhhh')
// }else{
        
  if (Product == 0) {
    Product.push(item1)

    Product.push(item2)
    
 
    Product.push(item3)
       
  
    
  }
  localStorage.setItem("products",JSON.stringify(Product))
  console.log(Product)
// }