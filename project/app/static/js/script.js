document.addEventListener('DOMContentLoaded', function () {
    console.log("Slider JS Loaded ✅");

    const slides = document.querySelectorAll('.hero-banner-slider .slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevButton = document.querySelector('.slider-button.prev');
    const nextButton = document.querySelector('.slider-button.next');
    let currentSlide = 0;
    let slideInterval;

    // Create navigation dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateSliderControls() {
        // Update slides position
        document.querySelector('.slides-container').style.transform = 
            `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSliderControls();
    }

    // Add click handlers for prev/next buttons
    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSliderControls();
    });

    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSliderControls();
    });

    function startSlideshow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSliderControls();
        }, 5000); // Change slide every 5 seconds
    }

    // Start the slideshow
    startSlideshow();

    // Pause slideshow on hover
    const sliderContainer = document.querySelector('.hero-banner-slider');
    sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
    sliderContainer.addEventListener('mouseleave', startSlideshow);

    // Initial update
    updateSliderControls();
});
});
