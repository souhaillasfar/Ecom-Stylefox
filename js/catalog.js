const mybtn = document.getElementById('btn');
const mylist = document.getElementById('list');

mybtn.addEventListener("click",function () {
    const element = document.getElementById('mybtn');
    console.log(mylist);
    if(mylist.style.display == "none"){
        mylist.style.display="block";
    }
    else  {
    mylist.style.display="none";}
})




















fetch("https://ahmedbenkrarayc.github.io/ecommercedata/products.json")
    .then(response => response.json())
    .then(products => {
        products.forEach(product => {
            console.log(product.variants[0].images[0]);
            
            const card = document.createElement('div');
            card.className = "product";
            card.innerHTML = ` 
            <div class="sm:w-[100%] lg:w-[80%] md:w-[80%] bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img src="${product.variants[0].images[0]}" alt="Image produit" class="image">
            <div class="image flex gap-12 p-2 ">
                <div class="">
                <h2 class="title font-poppins">${product.title}</h2>
                <p class="text-gray-500 mt-10">color: ${product.variants.length}</p>
                </div>
                 <span class="font-bold mt-6">$${product.price}</span>
            </div>
            </div> `;
            
            
            
            document.querySelector("#produit_container").appendChild(card); 
           

        });
                       
    })