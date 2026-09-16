const navButton = document.querySelectorI('#ham-btn');
const navBar = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
    const isOpen = navButton.classList.toggle("show");
    navBar.classList.toggle('show');
    navButton.setAttribute("aria-expanded", isopen);
    navButton.setAttribute("aria-label", isopen ? "Close navigation menu" : "Open navigation menu");
    
});