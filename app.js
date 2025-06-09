// Genome Error Detection - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initAnimatedCounters();
    initScrollAnimations();
    initTabSwitching();
    initModelMetrics();
    initSmoothScrolling();
    initIntersectionObserver();
});

// Navigation functionality
function initNavigation() {
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add shadow to nav on scroll
        if (currentScrollY > 50) {
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }

        lastScrollY = currentScrollY;
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Animated counters in hero section
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateCounters = () => {
        if (animated) return;
        animated = true;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const start = 0;
            const increment = target / (duration / 16); // 60fps
            let current = start;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    };

    // Trigger animation when hero section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateCounters, 1000); // Delay for dramatic effect
            }
        });
    }, { threshold: 0.5 });

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        observer.observe(heroSection);
    }
}

// Scroll-triggered animations
function initScrollAnimations() {
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.overview-card, .tech-card, .feature-card, .timeline-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
}

// Tab switching for model performance
function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const modelMetrics = document.querySelectorAll('.model-metrics');

    // Model data
    const modelData = {
        bilstm: {
            accuracy: '92%',
            precision: '90%',
            recall: '94%',
            rocAuc: '96%',
            description: 'Bidirectional LSTM for sequential dependencies'
        },
        cnn: {
            accuracy: '89%',
            precision: '87%',
            recall: '91%',
            rocAuc: '94%',
            description: 'Convolutional Neural Network for pattern detection'
        },
        xgboost: {
            accuracy: '87%',
            precision: '85%',
            recall: '89%',
            rocAuc: '93%',
            description: 'Gradient boosting for enhanced performance'
        },
        rf: {
            accuracy: '85%',
            precision: '83%',
            recall: '87%',
            rocAuc: '91%',
            description: 'Ensemble method with k-mer features'
        },
        lr: {
            accuracy: '82%',
            precision: '80%',
            recall: '84%',
            rocAuc: '88%',
            description: 'Linear classification with k-mer analysis'
        }
    };

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetModel = button.getAttribute('data-model');
            
            // Remove active class from all buttons and metrics
            tabButtons.forEach(btn => btn.classList.remove('active'));
            modelMetrics.forEach(metric => metric.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding metrics with animation
            const targetMetric = document.querySelector(`[data-model="${targetModel}"].model-metrics`);
            if (targetMetric) {
                targetMetric.classList.add('active');
                updateMetricDisplay(targetModel, modelData[targetModel]);
            }
        });
    });
}

// Update metric display with animations
function updateMetricDisplay(modelName, data) {
    const metricItems = document.querySelectorAll('.model-metrics.active .metric-item');
    
    metricItems.forEach((item, index) => {
        const value = item.querySelector('.metric-value');
        const progressFill = item.querySelector('.progress-fill');
        
        // Animate metric values
        setTimeout(() => {
            switch(index) {
                case 0:
                    value.textContent = data.accuracy;
                    animateProgress(progressFill, parseInt(data.accuracy));
                    break;
                case 1:
                    value.textContent = data.precision;
                    animateProgress(progressFill, parseInt(data.precision));
                    break;
                case 2:
                    value.textContent = data.recall;
                    animateProgress(progressFill, parseInt(data.recall));
                    break;
                case 3:
                    value.textContent = data.rocAuc;
                    animateProgress(progressFill, parseInt(data.rocAuc));
                    break;
            }
        }, index * 100);
    });
}

// Animate progress bars
function animateProgress(element, targetWidth) {
    element.style.width = '0%';
    setTimeout(() => {
        element.style.width = `${targetWidth}%`;
    }, 100);
}

// Initialize model metrics for all models
function initModelMetrics() {
    const modelData = {
        bilstm: { accuracy: 92, precision: 90, recall: 94, rocAuc: 96 },
        cnn: { accuracy: 89, precision: 87, recall: 91, rocAuc: 94 },
        xgboost: { accuracy: 87, precision: 85, recall: 89, rocAuc: 93 },
        rf: { accuracy: 85, precision: 83, recall: 87, rocAuc: 91 },
        lr: { accuracy: 82, precision: 80, recall: 84, rocAuc: 88 }
    };

    // Create metrics for each model
    Object.keys(modelData).forEach(modelKey => {
        if (modelKey === 'bilstm') return; // Already exists in HTML
        
        const tabContent = document.querySelector('.tab-content');
        const modelMetric = document.createElement('div');
        modelMetric.className = 'model-metrics';
        modelMetric.setAttribute('data-model', modelKey);
        
        const data = modelData[modelKey];
        modelMetric.innerHTML = `
            <div class="metric-grid">
                <div class="metric-item">
                    <div class="metric-value">${data.accuracy}%</div>
                    <div class="metric-label">Accuracy</div>
                    <div class="progress-bar"><div class="progress-fill" style="width: ${data.accuracy}%"></div></div>
                </div>
                <div class="metric-item">
                    <div class="metric-value">${data.precision}%</div>
                    <div class="metric-label">Precision</div>
                    <div class="progress-bar"><div class="progress-fill" style="width: ${data.precision}%"></div></div>
                </div>
                <div class="metric-item">
                    <div class="metric-value">${data.recall}%</div>
                    <div class="metric-label">Recall</div>
                    <div class="progress-bar"><div class="progress-fill" style="width: ${data.recall}%"></div></div>
                </div>
                <div class="metric-item">
                    <div class="metric-value">${data.rocAuc}%</div>
                    <div class="metric-label">ROC-AUC</div>
                    <div class="progress-bar"><div class="progress-fill" style="width: ${data.rocAuc}%"></div></div>
                </div>
            </div>
        `;
        
        tabContent.appendChild(modelMetric);
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav__link, .hero__cta');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Intersection Observer for fade-in animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add staggered animation for grid items
                if (entry.target.classList.contains('overview-grid') ||
                    entry.target.classList.contains('features-grid') ||
                    entry.target.classList.contains('approach-grid')) {
                    animateGridItems(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Observe individual cards and elements
    const animatedElements = document.querySelectorAll(
        '.overview-card, .tech-card, .feature-card, .dataset-card, .timeline-item, .pipeline-step'
    );
    
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Animate grid items with stagger effect
function animateGridItems(gridContainer) {
    const items = gridContainer.children;
    Array.from(items).forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 150);
    });
}

// Tech card hover effects
function initTechCardEffects() {
    const techCards = document.querySelectorAll('.tech-card');
    
    techCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add glow effect
            card.style.boxShadow = '0 10px 40px rgba(33, 128, 141, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            // Remove glow effect
            card.style.boxShadow = '';
        });
    });
}

// Initialize tech card effects
initTechCardEffects();

// Parallax effect for hero background
function initParallaxEffect() {
    const heroBackground = document.querySelector('.hero__background');
    
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Initialize parallax effect
initParallaxEffect();

// Dynamic DNA helix animation speed based on scroll
function initDynamicDNAAnimation() {
    const dnaHelixes = document.querySelectorAll('.dna-helix');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const speed = 1 + (scrolled * 0.01);
        
        dnaHelixes.forEach((helix, index) => {
            const baseSpeed = 20 + (index * 5);
            helix.style.animationDuration = `${baseSpeed / speed}s`;
        });
    });
}

// Initialize dynamic DNA animation
initDynamicDNAAnimation();

// Loading animation for images
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '0';
            img.style.transform = 'scale(0.8)';
            img.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            }, 100);
        });
    });
}

// Initialize image loading animations
initImageLoading();

// Keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Tab switching with arrow keys
        if (document.activeElement.classList.contains('tab-button')) {
            const tabButtons = Array.from(document.querySelectorAll('.tab-button'));
            const currentIndex = tabButtons.indexOf(document.activeElement);
            
            if (e.key === 'ArrowRight' && currentIndex < tabButtons.length - 1) {
                e.preventDefault();
                tabButtons[currentIndex + 1].focus();
                tabButtons[currentIndex + 1].click();
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                e.preventDefault();
                tabButtons[currentIndex - 1].focus();
                tabButtons[currentIndex - 1].click();
            }
        }
        
        // Navigation with number keys
        if (e.key >= '1' && e.key <= '5') {
            const sections = ['hero', 'overview', 'architecture', 'performance', 'features'];
            const sectionIndex = parseInt(e.key) - 1;
            if (sections[sectionIndex]) {
                const targetSection = document.querySelector(`#${sections[sectionIndex]}`);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    });
}

// Initialize keyboard navigation
initKeyboardNavigation();

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll handlers
const throttledScrollHandler = throttle(() => {
    // Combine all scroll handlers here for better performance
}, 16); // ~60fps

// Error handling and fallbacks
window.addEventListener('error', (e) => {
    console.warn('Non-critical error occurred:', e.error);
    // Gracefully handle any runtime errors
});

// Accessibility improvements
function initAccessibility() {
    // Add ARIA labels and roles where needed
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach((button, index) => {
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-controls', `tabpanel-${index}`);
    });
    
    const modelMetrics = document.querySelectorAll('.model-metrics');
    modelMetrics.forEach((panel, index) => {
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('id', `tabpanel-${index}`);
    });
    
    // Skip link for keyboard users
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '10px';
    skipLink.style.left = '10px';
    skipLink.style.zIndex = '9999';
    skipLink.addEventListener('focus', () => {
        skipLink.classList.remove('sr-only');
    });
    skipLink.addEventListener('blur', () => {
        skipLink.classList.add('sr-only');
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize accessibility features
initAccessibility();

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'https://pplx-res.cloudinary.com/image/upload/v1749394431/pplx_code_interpreter/9e87a35c_i99nwj.jpg',
        'https://pplx-res.cloudinary.com/image/upload/v1749394535/pplx_code_interpreter/868da232_u7rfre.jpg',
        'https://pplx-res.cloudinary.com/image/upload/v1749394582/gpt4o_images/b9axwvpbugnza4vmpgty.png',
        'https://pplx-res.cloudinary.com/image/upload/v1749394631/gpt4o_images/ejecltpyhpcyabz1ncbo.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Preload images
preloadImages();

// Final initialization
console.log('🧬 Genome Error Detection ML Project - Initialized Successfully');