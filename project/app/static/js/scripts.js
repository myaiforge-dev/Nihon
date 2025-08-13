document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slides-container');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000;

    // Create dots for each slide
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
        resetInterval();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    // Event listeners
    if (prevButton) prevButton.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    if (nextButton) nextButton.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') resetInterval();
    });

    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', resetInterval);

    // Initialize slider
    updateSlider();
    resetInterval();

    console.log('DEBUG: Blogs count =', 3);

});
