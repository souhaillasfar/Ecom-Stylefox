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

async function fetchData() {
    const categoriesUrl = window.category;  
    const subcategoriesUrl = window.subcategory; 
    const productsUrl = window.products; 

    try {
     
        const [categoriesRes, subcategoriesRes, productsRes] = await Promise.all([
            fetch(categoriesUrl),
            fetch(subcategoriesUrl),
            fetch(productsUrl)
        ]);

        const categories = await categoriesRes.json();
        const subcategories = await subcategoriesRes.json();
        const products = await productsRes.json();

        
        displayCategories(categories, subcategories);
        displayProducts(products);
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}


function displayCategories(categories, subcategories) {
    const container = document.querySelector('#list');
    
    categories.forEach(category => {
        const categoryElement = document.createElement('div');
        
       
        const categoryTitle = document.createElement('h3');
        categoryTitle.innerHTML = `${category.name} <i class="ml-4 fa-solid fa-chevron-down" style="color: #808080;"></i>`;
        categoryTitle.classList.add('category-title');
        categoryElement.appendChild(categoryTitle);
        
        
        const ulElement = document.createElement('ul');
        ulElement.classList.add('ml-4');
        ulElement.id = `${category.name.toLowerCase()}list`;
        ulElement.style.display = 'none'; 
        
        subcategories.forEach(subcategory => {
            if (subcategory.category_id === category.id) {
                const liElement = document.createElement('li');
                liElement.classList.add('bg-slate-100', 'hover:bg-slate-600', 'w-40', 'border', 'border-black', 'border-x-0', 'border-t-0', 'pl-2');

                const checkboxInput = document.createElement('input');
                checkboxInput.type = 'checkbox';
                checkboxInput.classList.add('selectID');
                checkboxInput.value = subcategory.id;
                checkboxInput.onclick = () => filterProducts();

                liElement.appendChild(checkboxInput);
                liElement.appendChild(document.createTextNode(subcategory.name));
                ulElement.appendChild(liElement);
            }
        });

        
        categoryTitle.addEventListener('click', () => toggleCategory(category.name));
        
       
        categoryElement.appendChild(ulElement);
        container.appendChild(categoryElement);
    });
}


function toggleCategory(categoryName) {
    const subcategoryList = document.getElementById(`${categoryName.toLowerCase()}list`);
    const chevronIcon = subcategoryList.previousElementSibling.querySelector('i');
    
  
    if (subcategoryList.style.display === 'none' || subcategoryList.style.display === '') {
        subcategoryList.style.display = 'block';
        chevronIcon.style.transform = 'rotate(180deg)';  
    } else {
        subcategoryList.style.display = 'none';
        chevronIcon.style.transform = 'rotate(0deg)';  
    }
}


function displayProducts(products) {
    const container = document.getElementById('produit_container');
    container.innerHTML = ''; 

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.dataset.productId = product.id;
        productElement.dataset.subcategoryId = product.subcategory_id; 

        productElement.innerHTML = `
            <div class="sm:w-[100%] lg:w-[80%] md:w-[80%] bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img src="${product.variants[0].images[0]}" alt="Image produit" class="image">
                <div class="image flex gap-12 p-2">
                    <div class="">
                    <a target="_blank" href="/Detailles.html?id=${product.id}">
                        <h2 class="title font-poppins">${product.title}</h2></a>
                        <p class="text-gray-500 mt-10"> ${product.variants.length} color</p>
                    </div>
                    <span class="font-bold mt-6">$${product.variants[0].price}</span>
                    
                </div>
            </div>
        `;

        container.appendChild(productElement);
    });
}


function filterProducts() {
    const selectedSubcategories = Array.from(document.querySelectorAll('.selectID:checked'))
        .map(input => input.value);

    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productSubcategoryId = product.dataset.subcategoryId;

        if (selectedSubcategories.includes(productSubcategoryId)) {
            product.style.display = 'block'; 
        } else {
            product.style.display = 'none'; 
        }
    });
}


function filterBySize() {
    const selectedSizes = Array.from(document.querySelectorAll('.size-filter:checked'))
        .map(input => input.value);

    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productSize = product.dataset.size;

        if (selectedSizes.includes(productSize)) {
            product.style.display = 'block'; 
        } else {
            product.style.display = 'none'; 
        }
    });
}

//  la pagination
const productsPerPage = 12; 
let currentPage = 1; 
let totalPages = 1; 
let allProducts = []; 


async function fetchData() {
    const categoriesUrl = window.category;  
    const subcategoriesUrl = window.subcategory; 
    const productsUrl = window.products; 

    try {
        const [categoriesRes, subcategoriesRes, productsRes] = await Promise.all([
            fetch(categoriesUrl),
            fetch(subcategoriesUrl),
            fetch(productsUrl)
        ]);

        const categories = await categoriesRes.json();
        const subcategories = await subcategoriesRes.json();
        allProducts = await productsRes.json(); 
        
      
        totalPages = Math.ceil(allProducts.length / productsPerPage);

      
        displayCategories(categories, subcategories);
        displayProducts(allProducts);
        setupPagination(); 
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}


function displayProducts(products) {
    const container = document.getElementById('produit_container');
    container.innerHTML = ''; 

    
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    
    const productsToShow = products.slice(startIndex, endIndex);
    productsToShow.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.dataset.productId = product.id;
        productElement.dataset.subcategoryId = product.subcategory_id; 

        productElement.innerHTML = `
            <div class="sm:w-[100%] lg:w-[80%] md:w-[80%] bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img src="${product.variants[0].images[0]}" alt="Image produit" class="image">
                <div class="image flex gap-12 p-2">
                    <div class="">
                    <a target="_blank" href="/Detailles.html?id=${product.id}">
                        <h2 class="title font-poppins">${product.title}</h2></a>
                        <p class="text-gray-500 mt-10"> ${product.variants.length} color</p>
                    </div>
                    <span class="font-bold mt-6">$${product.variants[0].price}</span>
                    
                </div>
            </div>
        `;

        container.appendChild(productElement);
    });
}


function setupPagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; 

    
    const prevButton = document.createElement('li');
    prevButton.innerHTML = `
        <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
            <span class="sr-only">Previous</span>
            <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
        </a>
    `;
    prevButton.querySelector('a').onclick = () => changePage(currentPage - 1);
    paginationContainer.appendChild(prevButton);

    
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('li');
        pageButton.innerHTML = `
            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                ${i}
            </a>
        `;
        pageButton.querySelector('a').onclick = () => changePage(i);
        if (i === currentPage) {
            pageButton.querySelector('a').classList.add('bg-blue-500', 'text-white');
        }
        paginationContainer.appendChild(pageButton);
    }

    
    const nextButton = document.createElement('li');
    nextButton.innerHTML = `
        <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
            <span class="sr-only">Next</span>
            <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
        </a>
    `;
    nextButton.querySelector('a').onclick = () => changePage(currentPage + 1);
    paginationContainer.appendChild(nextButton);
}


function changePage(pageNumber) {
    
    if (pageNumber < 1 || pageNumber > totalPages) return;

    currentPage = pageNumber;
    displayProducts(allProducts); 
    setupPagination(); 
}

fetchData();

console.log()