document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleSectionsButton');
    const sections = document.querySelectorAll('.section-content');

    toggleButton.addEventListener('click', function() {
        sections.forEach(section => {
            if (section.style.display === 'none' || section.style.display === '') {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });
}); 