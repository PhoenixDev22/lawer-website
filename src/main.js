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
// Lazy Loading for images only one image "Hero image"
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

    pagination: {
        el: '.swiper-pagination',
        clickable: true, 
    },

    breakpoints: {
        0: { // Mobile screens (below 992px)
            slidesPerView: "auto",  
            centeredSlides: true, 
        },
        800: {
            slidesPerView: 2,
            centeredSlides: false,
        },
    },
});

// Initialize AOS
AOS.init();

// Validate the form 
const form = document.getElementById('contact_form');
const userNameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitFormBtn = document.getElementById('submitForm');
const regExpName = /^[a-zA-Z]+([ '][a-zA-Z]+)*$/;
const regExpEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Create Error Message 
const createErrorMessage = (input, text) => {
    const errorElement = document.createElement('p');

    errorElement.textContent = text;
    errorElement.classList.add('error_text');
    input.appendChild(errorElement)
}

// check empty entry
const checkEntries = (userName, email, message) => {
    const emptyEntry = 'This field is required';
    const noValidEntry = 'This field is invalid';

    const isNameValid = regExpName.test(userName);
    const isEmailValid = regExpEmail.test(email);
    const isMessageValid = message.trim().length != 0;

    const allInputs = [userNameInput, emailInput,  messageInput];
    allInputs.forEach(ele => {
        const id = ele.id;
        const input = ele.parentElement;

        switch (id) {
            case 'name': 
                if (userName.length === 0 ){
                    createErrorMessage(input, emptyEntry) 
                } else if (!isNameValid) {
                    createErrorMessage(input, noValidEntry) 
                }
            break;
            case 'email': 
            if (email.length === 0 ){
                createErrorMessage(input, emptyEntry) 
            } else if (!isEmailValid) {
                createErrorMessage(input, noValidEntry) 
            }
            break;
            case 'message': 
                if (!isMessageValid){
                    createErrorMessage(input, emptyEntry) 
                }            
            break;
        }
    })
}

const removeErrorMessage = () => {
    const allErrorMessage = [...document.querySelectorAll('.error_text')];
    allErrorMessage.forEach(error => error.remove()) 
}

submitFormBtn.addEventListener('click', (event) => {
    event.preventDefault();
    
    const userName = userNameInput.value;
    const userEmail = emailInput.value;
    const message = messageInput.value;

    removeErrorMessage();
    checkEntries(userName, userEmail,  message);
})

 //'Your inquiry is sent, Our team will get in touch with you soon.'