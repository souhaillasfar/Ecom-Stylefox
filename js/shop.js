const closeShopping = document.querySelector('#closeShopping');
const shopping = document.querySelector('#shopping');
const cartItems = document.querySelector('#cartItems');
const subtotalAmount = document.querySelector('#subtotalAmount');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartDisplay() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center py-8">
                <h3 class="text-gray-500">Your cart is empty</h3>
            </div>
        `;
        subtotalAmount.textContent = '$0.00';
        return;
    }

    let total = 0;
    cartItems.innerHTML = cart.map((item, index) => {
        total += item.price * item.quantity;
        return `
            <div class="flex items-center gap-4 pb-6 border-b border-gray-200 mb-6">
                <img src="${item.image}" alt="${item.name}" class="h-40 w-25 object-cover rounded-md">
                <div class="flex-1">
                    <h3 class="text-base font-medium text-gray-900">${item.name}</h3>
                    <p class="text-gray-500">${item.size || ''}</p>
                    
                    <div class="flex items-center gap-4 mt-4">
                        <div class="flex items-center border rounded-full">
                            <button onclick="decreaseQuantity(${index})" class="px-3 py-1 hover:bg-gray-100 rounded-l-full">-</button>
                            <span class="px-4 py-1">${item.quantity}</span>
                            <button onclick="increaseQuantity(${index})" class="px-3 py-1 hover:bg-gray-100 rounded-r-full">+</button>
                        </div>
                        <span class="text-base font-medium">$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    
                    <button onclick="removeItem(${index})" class="text-sm text-red-500 mt-2">Remove</button>
                </div>
            </div>
        `;
    }).join('');

    subtotalAmount.textContent = `$${total.toFixed(2)}`;
}

// to add items to cart
function addToCart(item) {
    const existingItemIndex = cart.findIndex(i => i.name === item.name && i.size === item.size);
    
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity++;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// to add quantity
function increaseQuantity(index) {
    cart[index].quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// to decrease quantity
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// to remove an item
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// closing the shopping cart 
closeShopping.addEventListener('click', () => {
    shopping.classList.add('hidden');
});

// Initial cart render
updateCartDisplay();

window.addToCart = addToCart;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.removeItem = removeItem;

document.getElementById('devisButton').addEventListener('click', () => {
    generateInvoice(cart);
});
// fin panier.js