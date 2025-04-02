// Add animation order to skill tags
function initializeSkillTags() {
    const skillTags = document.querySelectorAll('.skills-list .skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.setProperty('--animation-order', index);
    });
}

// Initialize collapsible sections
function initializeCollapsibleSections() {
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    // Initially expand the About Me section only
    sectionHeaders.forEach((header, index) => {
        const content = header.nextElementSibling;
        
        // Make sure content width is properly set
        content.style.width = '100%';
        content.style.boxSizing = 'border-box';
        
        if (index !== 0) { // Not the first section (About Me)
            header.classList.add('collapsed');
            content.classList.add('collapsed');
            content.style.maxHeight = '0px';
        } else {
            // Set max height for the opened section
            content.style.maxHeight = content.scrollHeight + 'px';
        }
        
        // Add click event to toggle section
        header.addEventListener('click', function() {
            this.classList.toggle('collapsed');
            content.classList.toggle('collapsed');
            
            if (content.classList.contains('collapsed')) {
                content.style.maxHeight = '0px';
            } else {
                // Force a reflow to ensure proper height calculation
                void content.offsetWidth;
                content.style.maxHeight = content.scrollHeight + 'px';
                
                // Scroll this section into view if it's not fully visible
                setTimeout(() => {
                    const headerRect = header.getBoundingClientRect();
                    const contentRect = content.getBoundingClientRect();
                    const isHeaderVisible = headerRect.top >= 0 && headerRect.bottom <= window.innerHeight;
                    const isContentVisible = contentRect.bottom <= window.innerHeight;
                    
                    if (!isContentVisible && isHeaderVisible) {
                        header.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 50);
            }
            
            // Ensure the profile section adjusts its height if needed
            adjustProfileSectionHeight();
        });
    });
    
    // Add window resize handler to update content heights
    window.addEventListener('resize', function() {
        // Update expanded section heights
        updateExpandedSectionHeights();
        
        // Adjust profile section height after resize
        adjustProfileSectionHeight();
    });
    
    // Initial adjustment of profile section height
    adjustProfileSectionHeight();
}

// Adjust profile section height to fit content
function adjustProfileSectionHeight() {
    const profileSection = document.getElementById('profileSection');
    
    if (profileSection) {
        // Make sure the profile section is scrollable if content is taller than the viewport
        // We keep fixed height and let overflow handle the scrolling
        profileSection.style.height = '100vh';
        profileSection.style.overflowY = 'auto';
        
        // Check if we're in mobile view (profile section is full width)
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        
        if (isMobile) {
            // In mobile, adjust height based on content
            const profileCard = profileSection.querySelector('.profile-card');
            if (profileCard) {
                const cardHeight = profileCard.offsetHeight;
                profileSection.style.minHeight = `${cardHeight}px`;
            }
        }
    }
}

// Update all expanded section content heights
function updateExpandedSectionHeights() {
    const openContents = document.querySelectorAll('.section-content:not(.collapsed)');
    openContents.forEach(content => {
        // Reset height temporarily to get proper scrollHeight
        content.style.maxHeight = 'none';
        
        // Force a reflow and set proper height
        void content.offsetWidth;
        content.style.maxHeight = content.scrollHeight + 'px';
    });
}

// Initialize animations when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code may be here ...
    
    // Initialize skill tag animations
    initializeSkillTags();
    
    // Initialize collapsible sections
    initializeCollapsibleSections();
}); 