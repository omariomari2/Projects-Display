document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-button');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionContent = this.nextElementSibling;
            if (sectionContent.style.display === 'none' || sectionContent.style.display === '') {
                sectionContent.style.display = 'block';
            } else {
                sectionContent.style.display = 'none';
            }
        });
    });
}); 