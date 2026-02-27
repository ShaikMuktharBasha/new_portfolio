/**
 * Chrome Performance Optimizer v2.0
 * Advanced optimizations for smooth 60fps rendering in Chrome
 * Based on techniques from high-performance production websites
 */

(function() {
    'use strict';

    // Detect browsers
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    const isEdge = /Edg/.test(navigator.userAgent);
    
    if (!isChrome || isEdge) return;

    console.log('Chrome Performance Optimizer v2.0 - Initializing...');

    // ============================================
    // PHASE 1: Critical CSS Optimizations
    // Injected immediately to prevent layout shifts
    // ============================================
    
    const criticalCSS = `
        /* ========== COMPOSITOR-ONLY ANIMATIONS ========== */
        /* Force all transforms to use GPU compositor thread */
        
        html {
            /* Disable smooth scroll - causes jank in Chrome */
            scroll-behavior: auto !important;
        }
        
        /* ========== BACKDROP-FILTER FIX ========== */
        /* Chrome's backdrop-filter is extremely expensive */
        /* Replace with optimized semi-transparent background */
        
        .side-nav {
            -webkit-backdrop-filter: blur(8px) !important;
            backdrop-filter: blur(8px) !important;
            background: rgba(15, 15, 20, 0.92) !important;
            transform: translate3d(0, 0, 0);
            will-change: transform;
        }
        
        /* ========== PSEUDO-ELEMENT OPTIMIZATION ========== */
        /* body::before and ::after cause massive repaint areas */
        
        body::before,
        body::after {
            /* Promote to own compositor layer */
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            perspective: 1000px;
            /* Reduce animation complexity */
            animation-timing-function: linear !important;
            /* Hint browser about incoming changes */
            will-change: transform;
            /* Prevent hit testing overhead */
            pointer-events: none !important;
        }
        
        /* Slow down star rotation - less GPU work */
        body::after {
            animation-duration: 120s !important;
        }
        
        /* ========== LAYER MANAGEMENT ========== */
        /* Strategic GPU layer promotion */
        
        .nav-menu-toggle,
        .moon-icon,
        .btn,
        .certification-card,
        .skill-category,
        .project-card,
        .interest-card,
        .achievement-card {
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
        }
        
        /* ========== BOX-SHADOW OPTIMIZATION ========== */
        /* Complex shadows cause expensive blur calculations */
        /* Use CSS filter for GPU-accelerated shadows on hover */
        
        .btn:hover,
        .certification-card:hover,
        .project-card:hover,
        .skill-category:hover {
            /* Transitions only compositor-friendly properties */
            transition-property: transform, opacity, filter !important;
            transition-duration: 0.25s !important;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        /* ========== CONTAINMENT FOR PAINT ISOLATION ========== */
        /* Prevents repaint propagation */
        
        .section {
            contain: layout style paint;
            content-visibility: auto;
            contain-intrinsic-size: auto 600px;
        }
        
        .header,
        .hero {
            contain: layout style;
            isolation: isolate;
        }
        
        .certification-card,
        .skill-category,
        .project-card,
        .interest-card {
            contain: layout style;
        }
        
        /* ========== TEXT RENDERING OPTIMIZATION ========== */
        /* Gradient text is expensive - optimize rendering */
        
        .hero-title,
        .section-title,
        .nav-content h3,
        [style*="background-clip: text"],
        [style*="-webkit-background-clip: text"] {
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            /* Prevent subpixel rendering issues */
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        /* ========== FIXED ELEMENT OPTIMIZATION ========== */
        /* Fixed elements cause full-page repaints if not layered */
        
        .nav-menu-toggle,
        .side-nav,
        [style*="position: fixed"] {
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            will-change: transform;
        }
        
        /* ========== HOVER STATE OPTIMIZATION ========== */
        /* Reduce paint area during interactions */
        
        .nav-links a:hover {
            transition-property: transform, background-color, border-color !important;
        }
        
        /* ========== IMAGE OPTIMIZATION ========== */
        img {
            content-visibility: auto;
        }
        
        /* ========== REDUCE MOTION DURING SCROLL ========== */
        /* Applied dynamically via JavaScript */
        
        .chrome-scrolling body::before,
        .chrome-scrolling body::after {
            animation-play-state: paused !important;
        }
        
        .chrome-scrolling .certification-card,
        .chrome-scrolling .project-card,
        .chrome-scrolling .skill-category {
            transition: none !important;
        }
    `;

    // Inject critical CSS immediately
    const styleEl = document.createElement('style');
    styleEl.id = 'chrome-perf-v2';
    styleEl.textContent = criticalCSS;
    document.head.insertBefore(styleEl, document.head.firstChild);

    // ============================================
    // PHASE 2: Runtime Optimizations
    // ============================================

    // Throttle function for scroll handler
    function throttle(fn, wait) {
        let time = Date.now();
        return function() {
            if ((time + wait - Date.now()) < 0) {
                fn.apply(this, arguments);
                time = Date.now();
            }
        };
    }

    // RAF-based scroll handler for smooth performance
    let ticking = false;
    let scrollY = 0;
    
    function onScroll() {
        scrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // Add scrolling class to html for CSS optimizations
                document.documentElement.classList.add('chrome-scrolling');
                ticking = false;
            });
            ticking = true;
        }
    }

    // Debounced scroll end detection
    let scrollEndTimer;
    function onScrollEnd() {
        clearTimeout(scrollEndTimer);
        scrollEndTimer = setTimeout(function() {
            document.documentElement.classList.remove('chrome-scrolling');
        }, 100);
    }

    // Attach optimized scroll listeners
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scroll', onScrollEnd, { passive: true });

    // ============================================
    // PHASE 3: Intersection Observer for Lazy Rendering
    // ============================================

    if ('IntersectionObserver' in window) {
        const visibilityObserver = new IntersectionObserver(
            function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.contentVisibility = 'visible';
                        entry.target.style.willChange = 'auto';
                    } else {
                        entry.target.style.contentVisibility = 'auto';
                        entry.target.style.willChange = 'unset';
                    }
                });
            },
            { 
                rootMargin: '100px 0px',
                threshold: 0
            }
        );

        // Observe sections when DOM is ready
        function observeSections() {
            document.querySelectorAll('.section, .certification-card, .project-card').forEach(function(el) {
                visibilityObserver.observe(el);
            });
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', observeSections);
        } else {
            observeSections();
        }
    }

    // ============================================
    // PHASE 4: Passive Event Listeners
    // ============================================

    // Make touch and wheel events passive for smooth scrolling
    const eventOptions = { passive: true, capture: false };
    
    document.addEventListener('touchstart', function(){}, eventOptions);
    document.addEventListener('touchmove', function(){}, eventOptions);
    document.addEventListener('wheel', function(){}, eventOptions);

    // ============================================
    // PHASE 5: Reduce Animation During User Interaction
    // ============================================

    let interactionTimer;
    function pauseAnimationsDuringInteraction() {
        document.documentElement.classList.add('chrome-scrolling');
        clearTimeout(interactionTimer);
        interactionTimer = setTimeout(function() {
            document.documentElement.classList.remove('chrome-scrolling');
        }, 150);
    }

    // Pause animations during any user interaction
    ['mousedown', 'touchstart', 'keydown'].forEach(function(event) {
        document.addEventListener(event, throttle(pauseAnimationsDuringInteraction, 100), { passive: true });
    });

    // ============================================
    // PHASE 6: Image and Resource Optimization
    // ============================================

    const idleCallback = window.requestIdleCallback || function(cb) { setTimeout(cb, 1); };

    idleCallback(function() {
        // Lazy load images
        document.querySelectorAll('img').forEach(function(img) {
            img.loading = 'lazy';
            img.decoding = 'async';
        });

        // Add fetchpriority to above-fold images
        const heroImg = document.querySelector('.hero img, .header img');
        if (heroImg) {
            heroImg.fetchPriority = 'high';
            heroImg.loading = 'eager';
        }
    });

    // ============================================
    // PHASE 7: Reduce Composite Layers on Idle
    // ============================================

    // Remove will-change hints after animations complete
    idleCallback(function() {
        setTimeout(function() {
            document.querySelectorAll('[style*="will-change"]').forEach(function(el) {
                // Only remove if not currently animating
                if (!el.matches(':hover, :focus, :active')) {
                    el.style.willChange = 'auto';
                }
            });
        }, 3000);
    });

    // ============================================
    // PHASE 8: Force Compositor Thread for Animations
    // ============================================

    // Override CSS animations to use compositor-friendly properties
    const animationOptimizer = document.createElement('style');
    animationOptimizer.textContent = `
        /* Force all animations to run on compositor thread */
        @keyframes floatStars {
            from { transform: translate3d(0, 0, 0) rotate(0deg); }
            to { transform: translate3d(0, 0, 0) rotate(360deg); }
        }
        
        /* Ensure transform-based animations */
        [class*="animate"],
        [style*="animation"] {
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
        }
    `;
    document.head.appendChild(animationOptimizer);

    console.log('Chrome Performance Optimizer v2.0 - Active');

    // ============================================
    // PHASE 9: Performance Monitoring (Debug)
    // ============================================

    // Uncomment to debug frame drops
    /*
    let lastTime = performance.now();
    let frames = 0;
    function measureFPS() {
        frames++;
        const now = performance.now();
        if (now - lastTime >= 1000) {
            console.log('FPS:', frames);
            frames = 0;
            lastTime = now;
        }
        requestAnimationFrame(measureFPS);
    }
    measureFPS();
    */

})();
