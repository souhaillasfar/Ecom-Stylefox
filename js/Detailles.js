// Fonctions pour la gestion des quantités
function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
}

function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    quantityInput.value = parseInt(quantityInput.value) + 1;
}

// Fonction pour mettre à jour l'image principale
function updateMainImage(thumbnailButton) {
    const mainImage = document.getElementById('main-product-image');
    const thumbnailImage = thumbnailButton.querySelector('img');
    mainImage.src = thumbnailImage.src;
}

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

    // Fermer le menu en cliquant en dehors
    document.addEventListener('click', function (event) {
        if (!mobileMenu.contains(event.target) && !hamburgerBtn.contains(event.target)) {
            mobileMenu.classList.remove('translate-x-0');
            mobileMenu.classList.add('translate-x-full');
        }
    });
});