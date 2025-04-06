document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.innerWidth <= 768;
    const projectShowcase = document.querySelector('.project-showcase');
    const projectsSection = document.querySelector('.projects-section');
    const viewToggle = document.getElementById('viewToggle');
    const navButtons = document.querySelector('.nav-buttons');
    const projectNumbers = document.querySelector('.project-numbers');
    const toggleContainer = document.querySelector('.view-toggle');
    
    // Function to handle navigation elements visibility
    function updateNavigationVisibility() {
        if (viewToggle.checked) {
            // Showcase view - show navigation
            if (navButtons) navButtons.style.display = 'flex';
            if (projectNumbers) projectNumbers.style.display = 'flex';
        } else {
            // All projects view - hide navigation
            if (navButtons) navButtons.style.display = 'none';
            if (projectNumbers) projectNumbers.style.display = 'none';
        }
    }
    
    // Function to fix toggle position
    function fixTogglePosition() {
        if (!toggleContainer) return;
        
        // Hide toggle on mobile
        if (window.innerWidth <= 768) {
            toggleContainer.style.display = 'none';
        } else {
            // Ensure toggle is positioned within the project section
            toggleContainer.style.display = 'block';
            toggleContainer.style.position = 'absolute';
            toggleContainer.style.top = '10px';
            toggleContainer.style.right = '10px';
            
            // Enforce toggle in projects section
            if (projectsSection) {
                projectsSection.appendChild(toggleContainer);
            }
        }
    }
    
    // Function to resize project content to fit viewport
    function resizeProjectContent() {
        if (!isMobile) return;
        
        const vh = window.innerHeight;
        const slides = document.querySelectorAll('.project-slide');
        const projectContents = document.querySelectorAll('.project-content');
        
        // Set showcase height
        if (projectShowcase) {
            projectShowcase.style.height = `${vh}px`;
        }
        
        // Set slide heights
        slides.forEach(slide => {
            slide.style.height = `${vh}px`;
            slide.style.minHeight = 'auto';
        });
        
        // Adjust content heights to fit within viewport
        projectContents.forEach(content => {
            // Calculate appropriate max height
            // Leave space for navigation (70px) and some padding
            const maxHeight = vh - 100;
            content.style.maxHeight = `${maxHeight}px`;
            
            // Adjust font size based on available height
            if (vh < 600) {
                content.style.fontSize = '0.85rem';
                const heading = content.querySelector('h3');
                if (heading) heading.style.fontSize = '1rem';
            }
        });
    }
    
    // Initialize visibility
    updateNavigationVisibility();
    
    // Fix toggle position
    fixTogglePosition();
    
    // Initial resize
    resizeProjectContent();
    
    if (isMobile) {
        // Mobile-specific project card enhancements
        const projectCards = document.querySelectorAll('.project-card');
        
        // Add touch event handlers for better mobile interaction
        projectCards.forEach(card => {
            let isTouching = false;
            let touchStartY = 0;
            let touchEndY = 0;
            
            card.addEventListener('touchstart', function(e) {
                isTouching = true;
                touchStartY = e.touches[0].clientY;
                
                // Add active state visual feedback
                this.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            card.addEventListener('touchmove', function(e) {
                touchEndY = e.touches[0].clientY;
                
                // Calculate swipe direction
                const swipeDistance = touchStartY - touchEndY;
                
                // If swiping up or down, adjust card position
                if (Math.abs(swipeDistance) > 5) {
                    this.style.transform = `translateY(${swipeDistance}px) scale(0.98)`;
                }
            }, { passive: true });
            
            card.addEventListener('touchend', function(e) {
                if (isTouching) {
                    // Reset the transform but keep a small delay for visual feedback
                    setTimeout(() => {
                        this.style.transform = '';
                        isTouching = false;
                    }, 100);
                }
            }, { passive: true });
        });

        // Add smooth scrolling for stacked cards
        document.addEventListener('scroll', function() {
            const cards = document.querySelectorAll('.project-card');
            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const distanceFromTop = rect.top;
                
                // Adjust card position based on scroll position
                if (distanceFromTop > 0 && distanceFromTop < window.innerHeight) {
                    const scale = 1 + (distanceFromTop / window.innerHeight) * 0.1;
                    card.style.transform = `scale(${scale})`;
                }
            });
        }, { passive: true });

        // Listen for view toggle changes
        if (viewToggle) {
            viewToggle.addEventListener('change', function() {
                updateNavigationVisibility();
                
                if (this.checked) {
                    // Show showcase view
                    setTimeout(() => {
                        window.scrollTo(0, 0); // Scroll to top
                        resizeProjectContent(); // Resize content after view change
                    }, 100);
                }
            });
        }
        
        // Fix for project content scrolling
        const projectContents = document.querySelectorAll('.project-content');
        projectContents.forEach(content => {
            content.addEventListener('touchstart', (e) => {
                // Check if we're starting to scroll the content
                const touchY = e.touches[0].clientY;
                const contentRect = content.getBoundingClientRect();
                const scrollPos = content.scrollTop;
                const scrollHeight = content.scrollHeight;
                const visibleHeight = content.offsetHeight;
                
                // If we're at the top and trying to scroll up, or at the bottom and trying to scroll down,
                // prevent the event from propagating to let the page scroll instead
                if ((scrollPos <= 0 && touchY >= contentRect.top + 20) || 
                    (scrollPos + visibleHeight >= scrollHeight - 5 && touchY <= contentRect.bottom - 20)) {
                    // Allow page scroll to take over
                    e.stopPropagation();
                }
            }, { passive: true });
        });
        
        // Fix for mobile scrolling and swipe interference
        let lastScrollTop = 0;
        let scrollDirection = 'none';
        
        window.addEventListener('scroll', () => {
            if (!viewToggle.checked) return; // Only apply in showcase mode
            
            const st = window.pageYOffset || document.documentElement.scrollTop;
            scrollDirection = st > lastScrollTop ? 'down' : 'up';
            lastScrollTop = st <= 0 ? 0 : st;
        }, { passive: true });
        
        // Prevent accidental swipes when scrolling
        projectShowcase.addEventListener('touchstart', (e) => {
            if (scrollDirection !== 'none' && Math.abs(lastScrollTop) > 10) {
                // If user was scrolling, don't allow swipe to register
                e.stopPropagation();
            }
        }, { passive: true });
        
        // Fix orientation change issues
        window.addEventListener('orientationchange', () => {
            // Wait for orientation change to complete
            setTimeout(() => {
                // Resize everything to fit the new orientation
                resizeProjectContent();
                
                // Force background update
                if (viewToggle.checked) {
                    const currentSlide = document.querySelector('.project-slide.active');
                    if (currentSlide) {
                        projectsSection.style.background = getComputedStyle(currentSlide).background;
                    }
                }
                
                // Scroll to top
                window.scrollTo(0, 0);
            }, 200);
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            resizeProjectContent();
        }, { passive: true });
    }
}); 