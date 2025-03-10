document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.project-slide');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const projectNumbers = document.querySelectorAll('.project-number');
    const viewToggle = document.getElementById('viewToggle');
    const projectShowcase = document.querySelector('.project-showcase');
    const allProjectsView = document.querySelector('.all-projects-view');
    const projectsSection = document.querySelector('.projects-section');
    
    let currentSlide = 0;
    let isAnimating = false;
    let slideInterval;

    // Initialize the view based on toggle state
    function initializeView() {
        // Default to all-projects view (toggle unchecked)
        if (!viewToggle.checked) {
            projectShowcase.classList.add('hidden');
            allProjectsView.classList.add('active');
            projectsSection.classList.add('all-view');
            clearInterval(slideInterval);
        } else {
            // If toggle is checked, show showcase view
            projectShowcase.classList.remove('hidden');
            allProjectsView.classList.remove('active');
            projectsSection.classList.remove('all-view');
            projectsSection.style.background = getComputedStyle(slides[currentSlide]).background;
            startSlideInterval();
        }
    }

    // Toggle between all-projects and showcase views
    function setupViewToggle() {
        if (viewToggle) {
            // Add change event listener
            viewToggle.addEventListener('change', function() {
                if (this.checked) {
                    // Show showcase view
                    projectShowcase.classList.remove('hidden');
                    allProjectsView.classList.remove('active');
                    projectsSection.classList.remove('all-view');
                    
                    // Reset the background of projects section
                    projectsSection.style.background = 
                        getComputedStyle(slides[currentSlide]).background;
                    
                    // Start auto-advance for showcase
                    startSlideInterval();
                } else {
                    // Show all-projects view
                    projectShowcase.classList.add('hidden');
                    allProjectsView.classList.add('active');
                    projectsSection.classList.add('all-view');
                    
                    // Reset the background of projects section for all-projects view
                    projectsSection.style.background = '';
                    
                    // Stop auto-advance when in all-projects view
                    clearInterval(slideInterval);
                }
            });
        }
    }

    function updateSlides(newIndex) {
        if (isAnimating || newIndex === currentSlide) return;
        isAnimating = true;

        // Remove active class from current slide and number
        slides[currentSlide].classList.remove('active');
        projectNumbers[currentSlide].classList.remove('active');
        
        // Update current slide index
        currentSlide = newIndex;
        
        // Add active class to new slide and number
        slides[currentSlide].classList.add('active');
        projectNumbers[currentSlide].classList.add('active');

        // Update the projects section background to match the current slide
        if (viewToggle.checked) {
            projectsSection.style.background = 
                getComputedStyle(slides[currentSlide]).background;
        }

        // Allow next animation after transition completes
        setTimeout(() => {
            isAnimating = false;
        }, 600); // Slightly longer than the CSS transition
    }

    function nextSlide() {
        const newIndex = (currentSlide + 1) % slides.length;
        updateSlides(newIndex);
    }

    function prevSlide() {
        const newIndex = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides(newIndex);
    }

    function startSlideInterval() {
        // Clear any existing interval first
        clearInterval(slideInterval);
        // Start a new interval
        slideInterval = setInterval(nextSlide, 8000);
    }

    // Pause auto-advance on hover
    projectShowcase.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    // Resume auto-advance when mouse leaves
    projectShowcase.addEventListener('mouseleave', () => {
        if (viewToggle.checked) {
            startSlideInterval();
        }
    });

    // Event listeners for navigation buttons
    nextButton.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        if (viewToggle.checked) {
            startSlideInterval();
        }
    });
    
    prevButton.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        if (viewToggle.checked) {
            startSlideInterval();
        }
    });

    // Event listeners for project numbers
    projectNumbers.forEach((number, index) => {
        number.addEventListener('click', () => {
            clearInterval(slideInterval);
            updateSlides(index);
            if (viewToggle.checked) {
                startSlideInterval();
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!viewToggle.checked) return; // Only enable keyboard navigation in showcase view
        
        if (e.key === 'ArrowRight') {
            clearInterval(slideInterval);
            nextSlide();
            startSlideInterval();
        } else if (e.key === 'ArrowLeft') {
            clearInterval(slideInterval);
            prevSlide();
            startSlideInterval();
        }
    });

    // Initialize the view toggle
    setupViewToggle();
    
    // Initialize the view based on toggle state
    initializeView();
}); 