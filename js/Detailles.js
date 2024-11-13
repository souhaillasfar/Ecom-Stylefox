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