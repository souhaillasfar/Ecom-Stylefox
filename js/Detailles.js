// verification de ID
function isexist() {
  const url = document.URL;
  console.log(url.split("id=")[1]);
}

function get_product() {
  const url = document.URL;
  const id = url.split("id=")[1];

  fetch("https://ahmedbenkrarayc.github.io/ecommercedata/products.json").then((replay) => { return replay.json() }).then((product) => {
    if (id === product.id) {
      const product_images = Document.getElementById('product_images');
      const info = document.getElementById('info');

      // l'image pricipale
      const main_image = document.createElement('div');
      main_image.id = "product_images";
      main_image.className = "space-y-4"
      main_image.innerHTML = `<img src="${product.images[0]}" class="w-full h-full object-cover" id="main-product-image">`;
      main_image.appendChild(product_images);
      // les miniature
      const thumbnailImage = document.createElement('div');
      thumbnailImage.id = "miniature";
      thumbnailImage.classList = "grid grid-cols-4 gap-4";
      for (let i = 0; i < product.images; i++) {
        thumbnailImage.innerHTML = `
                        <button class="product-thumbnail w-fit transition-transform duration-300 hover:scale-105"
                            onclick="${updateMainImage(this)}">
                            <img src="${product.images[i]}" class="w-20 h-20 object-cover rounded">
                        </button>`;
      }
      thumbnailImage.appendChild(product_images);
      // information de produit
      const information = document.createElement('div');
      information.innerHTML = `
                    <h1 id="titre" class="text-3xl font-bold mb-2">${product.title}</h1>
                    <div class="flex items-center space-x-2 mb-4">
                        <div class="text-yellow-400">★★★★☆</div>
                        <span class="text-gray-500">${product.ra}</span>
                        <a href="#reviews"
                            class="text-sm text-slate-600 hover:text-slate-800 transition-colors duration-300 underline ml-2">42
                            avis</a>
                    </div>
      `;
      information.appendChild(info);
      // Prix et réduction


    }
  });



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

// Image gallery management
function updateMainImage(thumbnailButton) {
  const mainImage = document.getElementById('main-product-image');
  const thumbnailImage = thumbnailButton.querySelector('img');
  mainImage.src = thumbnailImage.src;

  // Update active thumbnail state
  document.querySelectorAll('.product-thumbnail').forEach(thumb => {
    thumb.classList.remove('ring-2', 'ring-blue-500');
  });
  thumbnailButton.classList.add('ring-2', 'ring-blue-500');
}

function updatePrice() {
  const sizeSelect = document.getElementById("size");
  const taille = sizeSelect.value;
  const prixBase = 50.00;

  const taux = {
    'XS': 1.00,
    'S': 1.03,
    'M': 1.06,
    'L': 1.09,
    'XL': 1.12,
    'XXL': 1.15
  };

  // Calculer le nouveau prix
  const priceElement = document.getElementById("prix");

  if (taux[taille]) {
    const nouveauPrix = prixBase * taux[taille];
    priceElement.textContent = `${nouveauPrix.toFixed(2)} $`;
  }
}


function updateColorDisplay() {
  const colorSelect = document.getElementById("color");
  const selectedColor = colorSelect.options[colorSelect.selectedIndex];

  const color = {
    'blue': '#0000ff',
    'red': '#ff0000',
    'white': '#ffffff',
    'black': '#000000',
    'gray': '#808080'
  };


  for (let option of colorSelect.options) {
    option.style.backgroundColor = "transparent";
    option.style.color = "inherit";
  }

  // Appliquer la couleur sélectionnée à l'option
  const colorValue = selectedColor.value;
  if (color[colorValue]) {
    selectedColor.style.backgroundColor = color[colorValue];
    selectedColor.style.color = "white";
  } else {
    selectedColor.style.backgroundColor = "transparent";
    selectedColor.style.color = "inherit";
  }
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

});