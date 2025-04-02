function showProfileSection() {
    document.getElementById('profileSection').style.display = 'flex';
    document.getElementById('projectsSection').style.display = 'none';
    document.querySelector('.toggle-sections-button').classList.remove('projects-active');
    document.querySelector('.toggle-sections-button').classList.add('profile-active');
    
    // Refresh animations when showing profile section
    if (window.appAnimations && typeof window.appAnimations.refreshAnimations === 'function') {
        setTimeout(() => window.appAnimations.refreshAnimations(), 100);
    }
}

function showProjectsSection() {
    document.getElementById('profileSection').style.display = 'none';
    document.getElementById('projectsSection').style.display = 'block';
    document.querySelector('.toggle-sections-button').classList.remove('profile-active');
    document.querySelector('.toggle-sections-button').classList.add('projects-active');
    
    // Refresh animations when showing projects section
    if (window.appAnimations && typeof window.appAnimations.refreshAnimations === 'function') {
        setTimeout(() => window.appAnimations.refreshAnimations(), 100);
    }
} 