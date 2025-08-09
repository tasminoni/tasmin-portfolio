// Portfolio JavaScript - Interactive Features and Animations

// Global Variables
let currentTheme = localStorage.getItem('theme') || 'light';
let isMenuOpen = false;
let typingTextElement;
let currentProjectFilter = 'all';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Main initialization function
function initializePortfolio() {
    // Set initial theme
    setTheme(currentTheme);
    
    // Initialize all features
    initializeNavigation();
    initializeTypingAnimation();
    initializeCodeAnimation();

    initializeScrollAnimations();
    initializeSkillBars();
    initializeStatCounters();
    initializeProjectsFilter();
    initializeContactForm();
    initializeThemeToggle();
    initializeLoadingScreen();
    
    // Start animations after short delay
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
}

// Loading Screen
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen immediately
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after transition
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 100);
}

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                isMenuOpen = false;
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Active link highlighting
    window.addEventListener('scroll', () => {
        updateActiveNavLink();
    });
    
    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Typing animation for hero section
function initializeTypingAnimation() {
    typingTextElement = document.getElementById('typing-text');
    const texts = [
        'Computer Science Student',
        'Software Engineer Enthusiastic',
        'Problem Solver',
        'Continuous Learner'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    typeText();
}

// Animated code block in hero section
function initializeCodeAnimation() {
    const codeElement = document.getElementById('animated-code');
    const codeLines = [
        'const developer = {',
        '  name: "Tasmin Ahmed Oni",',
        '  skills: ["Python", "JavaScript", "Java", "PHP"],',
        '  education: "CSE @ Brac University",',
        '  cgpa: 3.62,',
        '  location: "Dhaka, Bangladesh",',
        '  passionate: true,',
        '  hireable: true,',
        '  contact: () => {',
        '    return "Let\'s build something amazing!";',
        '  }',
        '};',
        '',
        'console.log(developer.contact());'
    ];
    
    let lineIndex = 0;
    let charIndex = 0;
    
    function animateCode() {
        if (lineIndex < codeLines.length) {
            const currentLine = codeLines[lineIndex];
            
            if (charIndex < currentLine.length) {
                const currentCode = codeLines.slice(0, lineIndex).join('\n') + 
                                 '\n' + currentLine.substring(0, charIndex + 1);
                codeElement.textContent = currentCode;
                charIndex++;
                setTimeout(animateCode, 50);
            } else {
                lineIndex++;
                charIndex = 0;
                setTimeout(animateCode, 200);
            }
        }
    }
    
    // Start code animation after a delay
    setTimeout(animateCode, 1000);
}

// Scroll animations using Intersection Observer
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Trigger skill bars animation
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
                
                // Trigger counter animation
                if (entry.target.classList.contains('about')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe other elements
    const animatedElements = document.querySelectorAll('.project-card, .timeline-item, .skill-category');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Skill bars animation
function initializeSkillBars() {
    // Animation will be triggered by scroll observer
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 200);
    });
}

// Statistics counters animation
function initializeStatCounters() {
    // Animation will be triggered by scroll observer
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Projects filtering and display
function initializeProjectsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectsGrid = document.getElementById('projects-grid');
    
    // Add click listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            filterProjects(filter);
        });
    });
    
    // Load initial projects
    loadProjects();
}

// Sample projects data
const projectsData = [
    {
        id: 1,
        title: 'Neighbor Management System (NMS)',
        description: 'A comprehensive web application for managing neighborhood communities with features for resident management, announcements, and communication.',
        image: 'project1.jpg',
        technologies: ['Java', 'Spring Boot', 'HTML', 'CSS', 'MySQL'],
        category: 'web',
        github: 'https://github.com/tasminoni/Neighbor-Management-System',
        demo: 'https://github.com/tasminoni/Neighbor-Management-System'
    },
    {
        id: 2,
        title: 'Secure User System',
        description: 'A secure user authentication and management system with robust security features, user roles, and access control.',
        image: 'project2.jpg',
        technologies: ['PHP', 'HTML', 'CSS', 'MySQL'],
        category: 'backend',
        github: 'https://github.com/tasminoni/Secure-User-System',
        demo: 'https://github.com/tasminoni/Secure-User-System'
    },

    {
        id: 3,
        title: 'Web Development Portfolio',
        description: 'A responsive portfolio website showcasing web development skills with modern design and interactive features.',
        image: 'project5.jpg',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
        category: 'web',
        github: 'https://github.com/tasminoni',
        demo: 'https://github.com/tasminoni'
    },
];

function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = '';
    
    projectsData.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = `project-card ${project.category}`;
    card.innerHTML = `
        <div class="project-image">
            <div class="project-overlay">
                <a href="${project.github}" target="_blank" class="project-link" title="View Code">
                    <i class="fab fa-github"></i>
                </a>
                <a href="${project.demo}" target="_blank" class="project-link" title="Live Demo">
                    <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        </div>
    `;
    
    return card;
}

function filterProjects(filter) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        if (filter === 'all' || card.classList.contains(filter)) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Add form field animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData);
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        e.target.reset();
        
        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Remove focused class from form groups
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('focused');
        });
    }, 2000);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success-color)' : 'var(--primary-color)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Theme toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
    });
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const debouncedScroll = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && isMenuOpen) {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        isMenuOpen = false;
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Additional animations and interactions
document.addEventListener('mousemove', (e) => {
    // Parallax effect for floating shapes
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const xOffset = (x - 0.5) * speed * 20;
        const yOffset = (y - 0.5) * speed * 20;
        
        shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

// Tech items hover effect
document.addEventListener('DOMContentLoaded', () => {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(-5px) scale(1)';
        });
    });
});

// Add CSS for notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 50%;
        transition: background-color 0.2s ease;
    }
    
    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;

document.head.appendChild(notificationStyles);

// Initialize cursor effect for interactive elements
function initializeCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        opacity: 0;
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '0.6';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .tech-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'var(--accent-color)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'var(--primary-color)';
        });
    });
}

// Initialize cursor effect only on desktop
if (window.innerWidth > 768) {
    initializeCursorEffect();
}

// Console message for fellow developers
console.log(`
🚀 Welcome to Tasmin Ahmed Oni's Portfolio!
📧 Interested in collaborating? Let's connect!
🔗 GitHub: https://github.com/tasminoni
💼 LinkedIn: https://linkedin.com/in/tasmin-ahmed-oni-968a44255
📧 Email: tasminahmedoni909@gmail.com


`);

// Export functions for testing (if in a module environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializePortfolio,
        setTheme,
        filterProjects,
        showNotification
    };
}


