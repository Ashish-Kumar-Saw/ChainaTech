// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to links that start with #
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80, // Offset for header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Active link highlighting based on scroll position
    window.addEventListener('scroll', highlightActiveLink);
    
    function highlightActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100; // Offset for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding link
                const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Initial call to highlight the active link
    highlightActiveLink();
});

// Portfolio item hover effect
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Mobile menu toggle (for smaller screens)
function createMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    // Insert button before nav links
    navbar.insertBefore(mobileMenuBtn, navLinks);
    
    // Toggle menu on button click
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('show');
        this.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('show');
                mobileMenuBtn.classList.remove('active');
            }
        });
    });
}

// Only create mobile menu for smaller screens
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Create mobile menu on resize if needed
window.addEventListener('resize', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (window.innerWidth <= 768 && !mobileMenuBtn) {
        createMobileMenu();
    } else if (window.innerWidth > 768 && mobileMenuBtn) {
        mobileMenuBtn.remove();
        document.querySelector('.nav-links').classList.remove('show');
    }
});

// Add animation to skill charts when they come into view
const skillCharts = document.querySelectorAll('.skill-chart circle:nth-child(2)');

function animateSkillCharts() {
    skillCharts.forEach(chart => {
        const chartRect = chart.getBoundingClientRect();
        const isVisible = chartRect.top < window.innerHeight && chartRect.bottom >= 0;
        
        if (isVisible) {
            chart.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
            chart.style.strokeDashoffset = '13.2'; // Final value (97% filled)
        }
    });
}

// Initial check and add scroll event listener
window.addEventListener('scroll', animateSkillCharts);
animateSkillCharts();

// Add fade-in animation for sections
const sections = document.querySelectorAll('section');

function fadeInSections() {
    sections.forEach(section => {
        const sectionRect = section.getBoundingClientRect();
        const isVisible = sectionRect.top < window.innerHeight - 100;
        
        if (isVisible) {
            section.classList.add('fade-in');
        }
    });
}

// Initial check and add scroll event listener
window.addEventListener('scroll', fadeInSections);
fadeInSections();