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
            // Only handle redirects on mobile
            if (window.innerWidth <= 768) {
                // Find all links in the card
                const siteLink = card.querySelector('a[href*="site"]');
                const demoLink = card.querySelector('a[href*="demo"]');
                const codeLink = card.querySelector('a[href*="github"]');

                // Determine which link to use
                let redirectLink;
                if (siteLink) {
                    redirectLink = siteLink.href;
                } else if (demoLink) {
                    redirectLink = demoLink.href;
                } else if (codeLink) {
                    redirectLink = codeLink.href;
                }

                // Redirect if a link was found
                if (redirectLink) {
                    window.location.href = redirectLink;
                }
            }
        });
    });
}); 