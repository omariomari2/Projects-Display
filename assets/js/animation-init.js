/**
 * Simple Animation Initialization
 */

document.addEventListener('DOMContentLoaded', function() {
    // Do nothing special, let CSS handle the animations
    console.log("Animation initialization complete");
});

// Empty refreshAnimations function to avoid errors if it's called
window.appAnimations = {
    refreshAnimations: function() {
        console.log("Animations refreshed");
    }
}; 