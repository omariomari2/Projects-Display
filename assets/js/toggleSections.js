document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleSectionsButton');
    const sections = document.querySelectorAll('.section-content');
    const body = document.body;
    const mainContainer = document.querySelector('.main-container');
    const projectCards = document.querySelectorAll('.project-card');

    toggleButton.addEventListener('click', function() {
        sections.forEach(section => {
            if (section.style.display === 'none' || section.style.display === '') {
                section.style.display = 'block';
                body.style.overflowY = 'auto';
                mainContainer.style.overflowY = 'auto';
            } else {
                section.style.display = 'none';
                body.style.overflowY = 'auto';
                mainContainer.style.overflowY = 'auto';
            }
        });
    });

    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent click from triggering on child elements
            if (e.target === this || e.target.classList.contains('project-content')) {
                this.classList.toggle('show-content');
                
                // Hide content of other cards
                projectCards.forEach(otherCard => {
                    if (otherCard !== this && otherCard.classList.contains('show-content')) {
                        otherCard.classList.remove('show-content');
                    }
                });
            }
        });
    });
}); 