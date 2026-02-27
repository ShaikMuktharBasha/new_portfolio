/**
 * Realistic Rocket Cursor with Flame Effects and Particle Trails
 * A physics-based cursor that follows mouse movement with smooth interpolation
 */

(function() {
    'use strict';

    // ============================================
    // Configuration
    // ============================================
    const CONFIG = {
        smoothing: 0.15,           // Lower = smoother but more lag
        rotationSmoothing: 0.12,   // Rotation interpolation
        trailParticles: 12,        // Number of trail particles
        particleLifetime: 800,     // Particle lifetime in ms
        flameIntensity: 1.0,       // Flame animation intensity
        minSpeed: 2,               // Minimum speed to show flames
        boostSpeed: 15,            // Speed threshold for boost mode
    };

    // ============================================
    // Create Rocket Element
    // ============================================
    
    const rocketHTML = `
        <div class="rocket-cursor" id="rocketCursor">
            <div class="rocket-body">
                <!-- Rocket SVG -->
                <svg viewBox="0 0 64 64" width="40" height="40" class="rocket-svg">
                    <!-- Rocket body -->
                    <defs>
                        <linearGradient id="rocketBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#f8f9fa"/>
                            <stop offset="50%" style="stop-color:#e9ecef"/>
                            <stop offset="100%" style="stop-color:#dee2e6"/>
                        </linearGradient>
                        <linearGradient id="rocketNoseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#ff6b6b"/>
                            <stop offset="100%" style="stop-color:#e74c3c"/>
                        </linearGradient>
                        <linearGradient id="rocketFinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style="stop-color:#4ecdc4"/>
                            <stop offset="100%" style="stop-color:#2ecc71"/>
                        </linearGradient>
                        <linearGradient id="windowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#74b9ff"/>
                            <stop offset="100%" style="stop-color:#0984e3"/>
                        </linearGradient>
                        <filter id="rocketGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="2" result="blur"/>
                            <feMerge>
                                <feMergeNode in="blur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    
                    <!-- Main body -->
                    <ellipse cx="32" cy="32" rx="8" ry="20" fill="url(#rocketBodyGrad)" filter="url(#rocketGlow)"/>
                    
                    <!-- Nose cone -->
                    <path d="M32 8 L26 22 L38 22 Z" fill="url(#rocketNoseGrad)"/>
                    
                    <!-- Window -->
                    <circle cx="32" cy="26" r="4" fill="url(#windowGrad)" stroke="#2d3436" stroke-width="0.5"/>
                    <circle cx="31" cy="25" r="1.5" fill="rgba(255,255,255,0.6)"/>
                    
                    <!-- Left fin -->
                    <path d="M24 38 L18 52 L24 48 Z" fill="url(#rocketFinGrad)"/>
                    
                    <!-- Right fin -->
                    <path d="M40 38 L46 52 L40 48 Z" fill="url(#rocketFinGrad)"/>
                    
                    <!-- Center fin (back) -->
                    <path d="M32 42 L32 54 L28 50 Z" fill="#4ecdc4" opacity="0.7"/>
                    
                    <!-- Body stripe -->
                    <rect x="26" y="34" width="12" height="3" rx="1" fill="#ff6b6b" opacity="0.8"/>
                    
                    <!-- Engine nozzle -->
                    <ellipse cx="32" cy="52" rx="5" ry="2" fill="#2d3436"/>
                    <ellipse cx="32" cy="51" rx="4" ry="1.5" fill="#636e72"/>
                </svg>
            </div>
            
            <!-- Flame container -->
            <div class="rocket-flames">
                <div class="flame flame-core"></div>
                <div class="flame flame-outer"></div>
                <div class="flame flame-outer-2"></div>
            </div>
            
            <!-- Particle trail container -->
            <div class="rocket-trail" id="rocketTrail"></div>
        </div>
    `;

    // ============================================
    // Create Rocket Styles
    // ============================================
    
    const rocketCSS = `
        /* Hide default cursor */
        body.rocket-active,
        body.rocket-active * {
            cursor: none !important;
        }
        
        /* Rocket container */
        .rocket-cursor {
            position: fixed;
            pointer-events: none;
            z-index: 999999;
            transform-origin: center center;
            will-change: transform, left, top;
            opacity: 0;
            transition: opacity 0.2s ease;
        }
        
        .rocket-cursor.visible {
            opacity: 1;
        }
        
        .rocket-body {
            position: relative;
            transform: rotate(-45deg);
            filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
        }
        
        .rocket-svg {
            display: block;
        }
        
        /* Flame styles */
        .rocket-flames {
            position: absolute;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%) rotate(-45deg);
            transform-origin: top center;
            opacity: 0;
            transition: opacity 0.15s ease;
        }
        
        .rocket-cursor.moving .rocket-flames {
            opacity: 1;
        }
        
        .flame {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
            filter: blur(1px);
        }
        
        .flame-core {
            width: 8px;
            height: 25px;
            background: linear-gradient(to bottom, 
                #fff 0%, 
                #fffde7 20%, 
                #ffeb3b 40%, 
                #ff9800 70%, 
                transparent 100%
            );
            animation: flameCore 0.1s ease-in-out infinite alternate;
        }
        
        .flame-outer {
            width: 14px;
            height: 35px;
            background: linear-gradient(to bottom, 
                rgba(255, 152, 0, 0.9) 0%, 
                rgba(255, 87, 34, 0.8) 40%, 
                rgba(244, 67, 54, 0.6) 70%, 
                transparent 100%
            );
            animation: flameOuter 0.15s ease-in-out infinite alternate;
            z-index: -1;
        }
        
        .flame-outer-2 {
            width: 18px;
            height: 45px;
            background: linear-gradient(to bottom, 
                rgba(255, 87, 34, 0.7) 0%, 
                rgba(244, 67, 54, 0.5) 30%, 
                rgba(183, 28, 28, 0.3) 60%, 
                transparent 100%
            );
            animation: flameOuter2 0.12s ease-in-out infinite alternate;
            z-index: -2;
        }
        
        /* Boost mode - larger flames */
        .rocket-cursor.boost .flame-core {
            height: 35px;
            animation-duration: 0.05s;
        }
        
        .rocket-cursor.boost .flame-outer {
            height: 50px;
            animation-duration: 0.08s;
        }
        
        .rocket-cursor.boost .flame-outer-2 {
            height: 65px;
            animation-duration: 0.06s;
        }
        
        @keyframes flameCore {
            0% { 
                transform: translateX(-50%) scaleX(0.9) scaleY(0.95); 
                opacity: 1;
            }
            100% { 
                transform: translateX(-50%) scaleX(1.1) scaleY(1.05); 
                opacity: 0.9;
            }
        }
        
        @keyframes flameOuter {
            0% { 
                transform: translateX(-50%) scaleX(0.85) scaleY(0.9); 
                opacity: 0.8;
            }
            100% { 
                transform: translateX(-50%) scaleX(1.15) scaleY(1.1); 
                opacity: 0.9;
            }
        }
        
        @keyframes flameOuter2 {
            0% { 
                transform: translateX(-50%) scaleX(0.8) scaleY(0.85); 
                opacity: 0.6;
            }
            100% { 
                transform: translateX(-50%) scaleX(1.2) scaleY(1.15); 
                opacity: 0.7;
            }
        }
        
        /* Particle trail */
        .rocket-trail {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 999998;
            overflow: hidden;
        }
        
        .trail-particle {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            will-change: transform, opacity;
        }
        
        .trail-particle.smoke {
            background: radial-gradient(circle, 
                rgba(255, 255, 255, 0.8) 0%, 
                rgba(200, 200, 200, 0.4) 50%, 
                transparent 100%
            );
        }
        
        .trail-particle.spark {
            background: radial-gradient(circle, 
                #ffeb3b 0%, 
                #ff9800 50%, 
                transparent 100%
            );
            box-shadow: 0 0 6px #ff9800;
        }
        
        .trail-particle.ember {
            background: radial-gradient(circle, 
                #ff5722 0%, 
                #d84315 70%, 
                transparent 100%
            );
        }
        
        /* Rocket wobble on direction change */
        .rocket-cursor.turning .rocket-body {
            animation: rocketWobble 0.3s ease-out;
        }
        
        @keyframes rocketWobble {
            0%, 100% { transform: rotate(-45deg); }
            25% { transform: rotate(-47deg); }
            75% { transform: rotate(-43deg); }
        }
        
        /* Rocket entry animation */
        @keyframes rocketEntry {
            0% { 
                opacity: 0; 
                transform: scale(0.5) rotate(180deg);
            }
            100% { 
                opacity: 1; 
                transform: scale(1) rotate(0deg);
            }
        }
        
        .rocket-cursor.entering {
            animation: rocketEntry 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
    `;

    // ============================================
    // Inject HTML and CSS
    // ============================================
    
    // Add CSS
    const styleEl = document.createElement('style');
    styleEl.id = 'rocket-cursor-styles';
    styleEl.textContent = rocketCSS;
    document.head.appendChild(styleEl);
    
    // Add HTML
    const rocketContainer = document.createElement('div');
    rocketContainer.innerHTML = rocketHTML;
    document.body.appendChild(rocketContainer.firstElementChild);
    
    // Add trail container
    const trailContainer = document.createElement('div');
    trailContainer.className = 'rocket-trail';
    trailContainer.id = 'rocketTrail';
    document.body.appendChild(trailContainer);

    // ============================================
    // Rocket Controller
    // ============================================
    
    const rocket = document.getElementById('rocketCursor');
    const trail = document.getElementById('rocketTrail');
    
    let currentX = -100;
    let currentY = -100;
    let targetX = -100;
    let targetY = -100;
    let currentRotation = 45;
    let targetRotation = 45;
    let lastX = 0;
    let lastY = 0;
    let speed = 0;
    let isVisible = false;
    let animationFrame = null;
    let particles = [];
    let lastParticleTime = 0;

    // Particle class
    class Particle {
        constructor(x, y, type) {
            this.x = x;
            this.y = y;
            this.type = type;
            this.size = type === 'smoke' ? Math.random() * 8 + 4 : Math.random() * 4 + 2;
            this.life = CONFIG.particleLifetime;
            this.maxLife = CONFIG.particleLifetime;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2 + 1;
            this.element = document.createElement('div');
            this.element.className = `trail-particle ${type}`;
            this.element.style.width = this.size + 'px';
            this.element.style.height = this.size + 'px';
            trail.appendChild(this.element);
        }
        
        update(deltaTime) {
            this.life -= deltaTime;
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.05; // Slight gravity
            
            const progress = 1 - (this.life / this.maxLife);
            const opacity = 1 - progress;
            const scale = 1 + progress * 0.5;
            
            this.element.style.transform = `translate(${this.x}px, ${this.y}px) scale(${scale})`;
            this.element.style.opacity = opacity;
            
            return this.life > 0;
        }
        
        destroy() {
            if (this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
        }
    }

    // Calculate angle from velocity
    function calculateAngle(dx, dy) {
        return Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    }

    // Lerp function for smooth interpolation
    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    // Normalize angle difference
    function normalizeAngle(angle) {
        while (angle > 180) angle -= 360;
        while (angle < -180) angle += 360;
        return angle;
    }

    // Smooth angle interpolation
    function lerpAngle(start, end, factor) {
        const diff = normalizeAngle(end - start);
        return start + diff * factor;
    }

    // Spawn particles
    function spawnParticle(x, y) {
        const now = Date.now();
        if (now - lastParticleTime < 30) return; // Throttle particle creation
        lastParticleTime = now;
        
        if (speed > CONFIG.minSpeed) {
            // Calculate spawn position behind rocket
            const radian = (currentRotation - 90) * Math.PI / 180;
            const offsetX = Math.cos(radian) * 25;
            const offsetY = Math.sin(radian) * 25;
            
            const types = speed > CONFIG.boostSpeed 
                ? ['spark', 'ember', 'smoke'] 
                : ['smoke', 'ember'];
            
            const type = types[Math.floor(Math.random() * types.length)];
            particles.push(new Particle(x + offsetX, y + offsetY, type));
        }
    }

    // Update particles
    function updateParticles(deltaTime) {
        particles = particles.filter(particle => {
            const alive = particle.update(deltaTime);
            if (!alive) particle.destroy();
            return alive;
        });
    }

    // Main animation loop
    let lastTime = performance.now();
    
    function animate() {
        const now = performance.now();
        const deltaTime = now - lastTime;
        lastTime = now;
        
        // Smooth position interpolation
        currentX = lerp(currentX, targetX, CONFIG.smoothing);
        currentY = lerp(currentY, targetY, CONFIG.smoothing);
        
        // Calculate speed
        const dx = targetX - lastX;
        const dy = targetY - lastY;
        speed = Math.sqrt(dx * dx + dy * dy);
        
        // Calculate target rotation based on movement direction
        if (speed > CONFIG.minSpeed) {
            targetRotation = calculateAngle(dx, dy);
        }
        
        // Smooth rotation interpolation
        currentRotation = lerpAngle(currentRotation, targetRotation, CONFIG.rotationSmoothing);
        
        // Apply transforms
        rocket.style.left = currentX + 'px';
        rocket.style.top = currentY + 'px';
        rocket.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;
        
        // Update flame state
        if (speed > CONFIG.minSpeed) {
            rocket.classList.add('moving');
            if (speed > CONFIG.boostSpeed) {
                rocket.classList.add('boost');
            } else {
                rocket.classList.remove('boost');
            }
        } else {
            rocket.classList.remove('moving', 'boost');
        }
        
        // Spawn particles
        spawnParticle(currentX, currentY);
        
        // Update existing particles
        updateParticles(deltaTime);
        
        lastX = targetX;
        lastY = targetY;
        
        animationFrame = requestAnimationFrame(animate);
    }

    // Mouse event handlers
    function onMouseMove(e) {
        targetX = e.clientX;
        targetY = e.clientY;
        
        if (!isVisible) {
            isVisible = true;
            currentX = targetX;
            currentY = targetY;
            rocket.classList.add('visible', 'entering');
            document.body.classList.add('rocket-active');
            
            setTimeout(() => {
                rocket.classList.remove('entering');
            }, 400);
        }
    }

    function onMouseLeave() {
        isVisible = false;
        rocket.classList.remove('visible', 'moving', 'boost');
    }

    function onMouseEnter(e) {
        targetX = e.clientX;
        targetY = e.clientY;
        currentX = targetX;
        currentY = targetY;
        isVisible = true;
        rocket.classList.add('visible');
    }

    // Start animation loop
    animate();

    // Attach event listeners
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animationFrame);
        particles.forEach(p => p.destroy());
    });

    console.log('🚀 Realistic Rocket Cursor initialized');

})();
