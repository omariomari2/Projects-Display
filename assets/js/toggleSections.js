document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleSectionsButton');
    const sections = document.querySelectorAll('.section-content');
    const body = document.body;
    const mainContainer = document.querySelector('.main-container');

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
}); 