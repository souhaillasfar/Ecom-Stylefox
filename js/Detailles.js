// Logique pour le menu hamburger
const hamburgerBtn = document.getElementById('hamburger-btn');
const hamburgerMenu = document.getElementById('mobile-menu');

hamburgerBtn.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('hidden');
});

