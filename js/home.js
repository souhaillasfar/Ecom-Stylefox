let subcategories = []
let products = []
let from = 0, to = 8
const subcategoryContainer = document.getElementById('subcategory-container')

const fetchSubcategories = async () => {
    try{
        const response = await fetch(window.subcategory)
        const data = await response.json()
        subcategories = [...data]
        displayCategories()
    }catch(e){
        console.error(e)
    }
}

const displayCategories = () => {
    subcategoryContainer.innerHTML = ''
    subcategories.slice(from, to).forEach(item => {
        subcategoryContainer.innerHTML += `
            <div class="relative">
                <img class="w-full h-[250px] object-cover" src="https://img.ltwebstatic.com/images3_pi/2024/01/17/23/17054640503d536567bfe67f5797f3a85fc76221cd_wk_shein.webp" alt="category image">
                <a href="#" class="bg-white block absolute bottom-4 left-0 right-0 mx-auto w-[80%] px-4 py-2 text-xs font-medium rounded-md">${item.name}</a>
            </div>
        `
    })
}

const nextPageSubcategory = () => {
    from += 8
    to += 8
    if(from <= subcategories.length-1){
        displayCategories()
    }else{
        from -= 8
        to -= 8
    }
}

const previousPageSubcategory = () => {
    if(from > 0){
        from -= 8
        to -= 8
        displayCategories()
    }
}

const fetchProducts = async () => {
    try{
        const response = await fetch(window.products)
        const data = await response.json()
        products = [...data]
        displayTopProducts()
    }catch(e){
        console.error(e)
    }
}

const displayTopProducts = () => {
    const topProductsContainer = document.getElementById('topcontainer')
    products.slice(0, 10).forEach(item => {
        topProductsContainer.innerHTML += `
            <div class="topcard sm:min-w-[200px] md:min-w-[250px] cursor-pointer">
                <img class="w-full sm:h-[220px] md:h-[300px]" src="${item.variants[0].images[0]}" alt="product image">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="mt-2 text-sm font-medium">${item.title.length > 14 ? item.title.slice(0, 14)+'...' : item.title }</p>
                        <span class="font-semibold mt-2">${item.variants[0].price}$</span>
                    </div>
                    <div productid="${item.id}" class="addtocart bg-primary rounded-md px-2 py-2 flex items-center justify-center cursor-pointer">
                        <img productid="${item.id}" class="addtocart size-4" src="./assets/icon/whitecart.svg" alt="cart icon">
                    </div>
                </div>
            </div>
        `
    })
}


function scrollCarousel(direction) {
    const container = document.getElementById('topcontainer')
    const cardWidth = document.querySelector('.topcard').offsetWidth
    const gap = parseInt(getComputedStyle(container).gap) || 0
    const scrollAmount = cardWidth + gap
    container.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
    })
}

document.getElementById('previousTopProducts').addEventListener('click', () => scrollCarousel('previous'))
document.getElementById('nextTopProducts').addEventListener('click', () => scrollCarousel('next'))

const addToCart = (e) => {
    const product = products.find(item => item.id == e)
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const found = cart.findIndex(item => item.name == product.title)
    if(found == -1){
        console.log(found)
        cart.push({
            image: product.variants[0].images[0],
            name: product.title,
            size: product.variants[0].sizes[0],
            quantity: 1,
            price: product.variants[0].price
        })
        localStorage.setItem('cart', JSON.stringify(cart))
    }
} 

document.addEventListener('click', (e) => {
    if(e.target && e.target.classList.contains('addtocart')){
        addToCart(e.target.getAttribute('productid'))
    }
})


//function calls
fetchSubcategories()
fetchProducts()