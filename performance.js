/**
 * Chrome Performance Optimizer
 * Detects Chrome browser and applies optimizations for smoother rendering
 * Include this file with: <script src="performance.js"></script>
 */

(function() {
    'use strict';

    // Detect Chrome browser
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    const isEdge = /Edg/.test(navigator.userAgent);
    
    // Only apply optimizations for Chrome (Edge handles these better natively)
    if (!isChrome || isEdge) return;

    console.log('Chrome detected - applying performance optimizations');

    // Create performance CSS
    const performanceCSS = `
        /* Chrome Performance Optimizations */
        
        /* Force GPU acceleration on animated elements */
        *, *::before, *::after {
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
        }
        
        /* Optimize backdrop-filter for Chrome */
        .side-nav {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
            -webkit-perspective: 1000px;
            perspective: 1000px;
        }
        
        /* Reduce backdrop-filter blur for Chrome */
        @supports (-webkit-backdrop-filter: blur(10px)) {
            .side-nav {
                -webkit-backdrop-filter: blur(10px) !important;
                backdrop-filter: blur(10px) !important;
            }
        }
        
        /* GPU acceleration for animated pseudo-elements */
        body::before,
        body::after {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            will-change: transform;
        }
        
        /* Optimize star animation - reduce complexity */
        @keyframes floatStars {
            0% { -webkit-transform: translateZ(0) rotate(0deg); transform: translateZ(0) rotate(0deg); }
            100% { -webkit-transform: translateZ(0) rotate(360deg); transform: translateZ(0) rotate(360deg); }
        }
        
        /* GPU hints for frequently animated elements */
        .btn,
        .nav-menu-toggle,
        .moon-icon,
        .side-nav,
        .nav-links a,
        .certification-card,
        .skill-category,
        .project-card,
        .interest-card,
        .achievement-card,
        .theme-toggle {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-font-smoothing: antialiased;
        }
        
        /* Reduce shadow complexity on hover states */
        .btn:hover,
        .btn-primary:hover,
        .btn-secondary:hover {
            transition-property: transform, background !important;
            transition-duration: 0.3s !important;
        }
        
        /* Optimize scroll performance */
        html {
            scroll-behavior: auto !important;
        }
        
        /* Containment for better paint performance */
        .section {
            contain: layout style paint;
        }
        
        .certification-card,
        .skill-category,
        .project-card {
            contain: layout style;
        }
        
        /* Reduce paint areas */
        .header,
        .hero,
        .section {
            isolation: isolate;
        }
        
        /* Simplify complex gradients during scroll */
        .hero-title,
        .section-title,
        .nav-content h3 {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
        }
    `;

    // Inject performance CSS
    const styleElement = document.createElement('style');
    styleElement.id = 'chrome-performance-optimizations';
    styleElement.textContent = performanceCSS;
    document.head.appendChild(styleElement);

    // Use passive event listeners for scroll
    const supportsPassive = (function() {
        let supported = false;
        try {
            const opts = Object.defineProperty({}, 'passive', {
                get: function() { supported = true; }
            });
            window.addEventListener('testPassive', null, opts);
            window.removeEventListener('testPassive', null, opts);
        } catch (e) {}
        return supported;
    })();

    if (supportsPassive) {
        // Override scroll events to be passive
        const originalAddEventListener = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function(type, listener, options) {
            if (['scroll', 'touchstart', 'touchmove', 'wheel', 'mousewheel'].includes(type)) {
                if (typeof options === 'boolean') {
                    options = { capture: options, passive: true };
                } else if (typeof options === 'object' || options === undefined) {
                    options = { ...options, passive: true };
                }
            }
            return originalAddEventListener.call(this, type, listener, options);
        };
    }

    // Request idle callback for non-critical work
    const scheduleIdleWork = window.requestIdleCallback || function(cb) {
        return setTimeout(cb, 1);
    };

    // Optimize images once page is idle
    scheduleIdleWork(function() {
        const images = document.querySelectorAll('img');
        images.forEach(function(img) {
            img.decoding = 'async';
            img.loading = 'lazy';
        });
    });

    // Reduce animation frame rate during scroll
    let scrollTimeout;
    let isScrolling = false;
    const scrollOptimizations = document.createElement('style');
    scrollOptimizations.id = 'scroll-optimizations';
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            isScrolling = true;
            scrollOptimizations.textContent = `
                body::before, body::after {
                    animation-play-state: paused !important;
                }
            `;
            document.head.appendChild(scrollOptimizations);
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            isScrolling = false;
            scrollOptimizations.textContent = '';
        }, 150);
    }, { passive: true });

    // Intersection Observer for off-screen elements
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.contentVisibility = 'visible';
                } else {
                    entry.target.style.contentVisibility = 'auto';
                }
            });
        }, { rootMargin: '50px' });

        scheduleIdleWork(function() {
            document.querySelectorAll('.section').forEach(function(section) {
                observer.observe(section);
            });
        });
    }

    // Force composite layer for fixed elements
    scheduleIdleWork(function() {
        const fixedElements = document.querySelectorAll('[style*="position: fixed"], .nav-menu-toggle, .side-nav');
        fixedElements.forEach(function(el) {
            el.style.transform = el.style.transform || 'translateZ(0)';
        });
    });

    console.log('Chrome performance optimizations applied successfully');
})();
