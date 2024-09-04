// Togggle the menu and noScroll when the menu is open
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle_btn');
    const navMenu = document.getElementById('nav-menu');
    toggleBtn.addEventListener('click', () => {
        const isExpanded = toggleBtn.getAttribute('aria-expanded')  === 'true';

        toggleBtn.setAttribute('aria-expanded', !isExpanded);
        toggleBtn.classList.toggle('toggle');
        navMenu.classList.toggle('toggle');
        isExpanded ? navMenu.setAttribute('hidden', true): navMenu.removeAttribute('hidden');
        document.body.classList.toggle('no-scroll');
    })
});
document.addEventListener("DOMContentLoaded", function () {
    const lazyBackgrounds = document.querySelectorAll(".lazy-bg");

    const lazyLoadBackground = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        let lazyBg = entry.target;
        lazyBg.style.backgroundImage = `url(${lazyBg.dataset.background})`;
        observer.unobserve(lazyBg); // Stop observing once the image is loaded
        }
    });
    };

    const observer = new IntersectionObserver(lazyLoadBackground, {
    rootMargin: "0px 0px 200px 0px"  // Load the background slightly before it comes into view
    });

    lazyBackgrounds.forEach(bg => {
    observer.observe(bg);
    });
});
// Initialize Swiper
const swiper = new Swiper('.swiper', {
    grabCursor: true,
    slidesPerView:'auto',
    spaceBetween: 80,
    centeredSlides: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true, 
    },
    breakpoints: {
        0: { // Mobile screens (below 992px)
        slidesPerView: "auto",  // Show 1 slide per view
        centeredSlides: true, // Center the slide
        },
        800: {
            slidesPerView: 2,
            centeredSlides: false,
        },
    },
});