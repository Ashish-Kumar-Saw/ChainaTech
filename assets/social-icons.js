// Social Icons Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all social icon links
    const socialIcons = document.querySelectorAll('.social-icons a');
    
    // Add click effect to social icons
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            // Prevent default behavior
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            // Set position
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            // Remove after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});