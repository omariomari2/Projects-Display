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
    
    // Initially expand only the About Me section
    sectionHeaders.forEach((header) => {
        const content = header.nextElementSibling;
        const section = header.closest('.section');
        
        // Make sure content width is properly set
        content.style.width = '100%';
        content.style.boxSizing = 'border-box';
        
        // Check if this is the About Me section
        if (section && section.id === 'about') {
            // Keep About Me section expanded
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            // Collapse all other sections
            header.classList.add('collapsed');
            content.classList.add('collapsed');
            content.style.maxHeight = '0px';
        }
    });
    
    // Add click event listeners
    sectionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isCollapsed = header.classList.contains('collapsed');
            
            // Toggle the clicked section
            header.classList.toggle('collapsed');
            content.classList.toggle('collapsed');
            
            if (isCollapsed) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0px';
            }
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

// Typewriter effect for role text
function initTypewriterEffect() {
    const roleText = document.getElementById('role-text');
    if (!roleText) return;
    
    // Default text for the role element
    const defaultText = 'SWE || Cloud Security';
    
    // If we've seen this before, don't animate
    if (localStorage.getItem('typewriterComplete') === 'true') {
        // Just set the text and disable CSS animations
        roleText.textContent = defaultText;
        roleText.style.animation = 'none';
        roleText.style.borderRight = 'none';
        return;
    }
    
    // Set flag to prevent animation on future visits
    localStorage.setItem('typewriterComplete', 'true');
    
    // Remove the CSS animation class that might be causing issues
    roleText.classList.remove('typewriter');
    
    // Set starting state
    roleText.style.whiteSpace = 'nowrap';
    roleText.style.overflow = 'hidden';
    roleText.textContent = defaultText;
    roleText.style.width = '0';
    roleText.style.borderRight = '0.15em solid #000';
    
    // Create and apply our custom animation
    let width = 0;
    const targetWidth = roleText.scrollWidth;
    
    function animateTyping() {
        if (width < targetWidth) {
            width += targetWidth / 20; // Increase by 5% of total width each step
            roleText.style.width = width + 'px';
            requestAnimationFrame(animateTyping);
        } else {
            // Animation complete - set final state
            roleText.style.width = '100%';
            
            // Add blinking cursor animation
            roleText.style.borderRight = '0.15em solid #000';
            setTimeout(() => {
                // After a delay, remove the cursor
                roleText.style.borderRight = 'none';
            }, 5000);
        }
    }
    
    // Start the animation after a short delay
    setTimeout(() => {
        requestAnimationFrame(animateTyping);
    }, 1000);
}

// Handle showcase vs all projects view
function handleAllProjectsView() {
    const viewToggle = document.getElementById('viewToggle');
    if (!viewToggle) return;
    
    // Set to showcase mode by default
    viewToggle.checked = true;
    
    // Trigger change event to update the view
    const changeEvent = new Event('change');
    viewToggle.dispatchEvent(changeEvent);
}

// Setup project navigation controls
function setupProjectNavigation() {
    // This function is handled in projects.js
    // Empty implementation here as it's called from DOM content loaded
}

// Call all initialization functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCollapsibleSections();
    setupProjectNavigation();
    handleAllProjectsView();
    adjustProfileSectionHeight();
    initTypewriterEffect();
    
    // Resize handler
    window.addEventListener('resize', function() {
        adjustProfileSectionHeight();
    });
}); 