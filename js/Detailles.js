// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

// Global variables
let products = [];
let currentProduct = null;
let cartCounter = 0;

// Fetch and initialize data
async function initializeProduct() {
    try {
        const response = await fetch('https://ahmedbenkrarayc.github.io/ecommercedata/products.json');
        products = await response.json();
        currentProduct = products.find(p => p.id === productId);
        
        if (currentProduct) {
            displayProductInfo(currentProduct);
            displaySimilarProducts();
            initializeSelectors();
            updateCartCounter();
        }
    } catch (error) {
        console.error('Error loading product data:', error);
    }
}

// Display product information
function displayProductInfo(product) {
    // Set title and description
    document.getElementById('product_title').textContent = product.title;
    document.getElementById('product_description').textContent = product.description;
    
    // Set rating
    const rating = product.rate;
    const ratingStars = document.getElementById('product_rating');
    ratingStars.innerHTML = generateStarRating(rating);
    document.getElementById('product_rate').textContent = `(${rating})`;
    
    // Set initial price (first variant)
    document.getElementById('product_price').textContent = `$${product.variants[0].price}`;
    
    // Set main image and thumbnails
    const mainImage = document.getElementById('main-product-image');
    mainImage.src = product.variants[0].images[0];
    mainImage.alt = product.title;
    
    // Display thumbnails
    displayThumbnails(product.variants[0].images);
    
    // Initialize color and size selectors
    initializeColorSelector(product.variants);
    initializeSizeSelector(product.variants[0].sizes);
}

// Generate star rating HTML
function generateStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Display thumbnails
function displayThumbnails(images) {
    const container = document.getElementById('thumbnail-container');
    container.innerHTML = '';
    
    images.forEach((img, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'aspect-square bg-white rounded-lg overflow-hidden cursor-pointer';
        thumbnail.innerHTML = `<img src="${img}" alt="Thumbnail ${index + 1}" class="w-full h-full object-cover">`;
        
        thumbnail.addEventListener('click', () => {
            document.getElementById('main-product-image').src = img;
        });
        
        container.appendChild(thumbnail);
    });
}

// Initialize color selector
function initializeColorSelector(variants) {
    const colorSelect = document.getElementById('color');
    colorSelect.innerHTML = '';
    
    variants.forEach(variant => {
        const option = document.createElement('option');
        option.value = variant.color;
        option.textContent = variant.color;
        colorSelect.appendChild(option);
    });
}

// Initialize size selector
function initializeSizeSelector(sizes) {
    const sizeSelect = document.getElementById('size');
    sizeSelect.innerHTML = '';
    
    sizes.forEach(size => {
        const option = document.createElement('option');
        option.value = size;
        option.textContent = size;
        sizeSelect.appendChild(option);
    });
}

// Calculate price based on size
function calculatePriceBySize(basePrice, size) {
    const sizeMultipliers = {
        'S': 1,
        'M': 1.1,
        'L': 1.2,
        'XL': 1.3,
        '30': 1,
        '32': 1.1,
        '34': 1.2,
        '36': 1.3
    };
    
    return Math.round(basePrice * (sizeMultipliers[size] || 1));
}

// Display similar products
function displaySimilarProducts() {
    const similarContainer = document.querySelector('.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-3.xl\\:grid-cols-4');
    const similarProducts = products
        .filter(p => p.subcategory_id === currentProduct.subcategory_id && p.id !== currentProduct.id)
        .slice(0, 3);
    
    similarContainer.innerHTML = similarProducts.map(product => `
        <div class="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer" onclick="loadProduct(${product.id})">
            <div class="aspect-square">
                <img src="${product.variants[0].images[0]}" alt="${product.title}" class="w-full h-full object-cover">
            </div>
            <div class="p-4">
                <h3 class="font-semibold text-lg mb-2">${product.title}</h3>
                <div class="flex justify-between items-center">
                    <span class="text-green-600 font-bold">$${product.variants[0].price}</span>
                    <div class="text-yellow-400">${generateStarRating(product.rate)}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// Load new product when clicking similar product
function loadProduct(id) {
    window.history.pushState({}, '', `?id=${id}`);
    currentProduct = products.find(p => p.id === id);
    displayProductInfo(currentProduct);
    displaySimilarProducts();
}

// Initialize event listeners
function initializeSelectors() {
    const colorSelect = document.getElementById('color');
    const sizeSelect = document.getElementById('size');
    
    colorSelect.addEventListener('change', (e) => {
        const selectedVariant = currentProduct.variants.find(v => v.color === e.target.value);
        initializeSizeSelector(selectedVariant.sizes);
        displayThumbnails(selectedVariant.images);
        document.getElementById('main-product-image').src = selectedVariant.images[0];
        updatePrice();
    });
    
    sizeSelect.addEventListener('change', updatePrice);
}

// Update price based on current selections
function updatePrice() {
    const selectedColor = document.getElementById('color').value;
    const selectedSize = document.getElementById('size').value;
    const variant = currentProduct.variants.find(v => v.color === selectedColor);
    const basePrice = variant.price;
    const adjustedPrice = calculatePriceBySize(basePrice, selectedSize);
    document.getElementById('product_price').textContent = `$${adjustedPrice}`;
}

// Cart management
function updateCartCounter() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartCounter = cartItems.length;
    // Update cart icon if it exists
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCounter;
    }
}

// Add to cart functionality
document.querySelector('button.bg-green-600').addEventListener('click', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const selectedColor = document.getElementById('color').value;
    const selectedSize = document.getElementById('size').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    
    const cartItem = {
        productId: currentProduct.id,
        color: selectedColor,
        size: selectedSize,
        quantity: quantity,
        timestamp: Date.now()
    };
    
    cartItems.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCounter();
    
    // Optional: Show confirmation message
    alert('Produit ajouté au panier!');
});

// Initialize the page
document.addEventListener('DOMContentLoaded', initializeProduct);