/**
 * Ultra-Realistic Rocket Cursor v3.0
 * Featuring dynamic fire, multiple flame layers, glowing particles, and smoke trails
 */

(function() {
    'use strict';

    // ============================================
    // Configuration
    // ============================================
    const CONFIG = {
        smoothing: 0.18,
        rotationSmoothing: 0.15,
        particleSpawnRate: 15,      // ms between particles
        flameParticleRate: 8,       // ms between flame particles
        minSpeed: 1,
        boostSpeed: 12,
        maxParticles: 100,
    };

    // ============================================
    // Inject Styles
    // ============================================
    
    const styles = `
        /* Hide default cursor */
        body.rocket-active,
        body.rocket-active * {
            cursor: none !important;
        }
        
        /* Main rocket container */
        .rocket-cursor {
            position: fixed;
            pointer-events: none;
            z-index: 999999;
            opacity: 0;
            transition: opacity 0.3s ease;
            filter: drop-shadow(0 0 10px rgba(255, 150, 50, 0.5));
        }
        
        .rocket-cursor.visible {
            opacity: 1;
        }
        
        .rocket-wrapper {
            position: relative;
            width: 32px;
            height: 50px;
        }
        
        /* Rocket SVG */
        .rocket-svg {
            position: absolute;
            top: 0;
            left: 0;
            width: 32px;
            height: 50px;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }
        
        /* ========== FIRE CONTAINER ========== */
        .fire-container {
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 80px;
            opacity: 0;
            transition: opacity 0.1s ease;
            pointer-events: none;
        }
        
        .rocket-cursor.moving .fire-container {
            opacity: 1;
        }
        
        /* ========== MAIN FIRE EFFECT ========== */
        .fire {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            height: 100%;
        }
        
        /* Core white-hot flame */
        .flame-white {
            position: absolute;
            bottom: 12px;
            left: 50%;
            transform: translateX(-50%);
            width: 6px;
            height: 20px;
            background: linear-gradient(to top,
                transparent 0%,
                #fff 20%,
                #fff 80%,
                rgba(255,255,255,0.8) 100%
            );
            border-radius: 50% 50% 50% 50% / 80% 80% 20% 20%;
            filter: blur(1px);
            animation: flameWhite 0.05s ease-in-out infinite alternate;
        }
        
        /* Inner yellow flame */
        .flame-yellow {
            position: absolute;
            bottom: 8px;
            left: 50%;
            transform: translateX(-50%);
            width: 12px;
            height: 35px;
            background: linear-gradient(to top,
                transparent 0%,
                #ffeb3b 15%,
                #ffd54f 40%,
                #ffca28 60%,
                #fff 90%
            );
            border-radius: 50% 50% 50% 50% / 70% 70% 30% 30%;
            filter: blur(1.5px);
            animation: flameYellow 0.08s ease-in-out infinite alternate;
            box-shadow: 0 0 15px #ffca28, 0 0 30px rgba(255,202,40,0.5);
        }
        
        /* Middle orange flame */
        .flame-orange {
            position: absolute;
            bottom: 5px;
            left: 50%;
            transform: translateX(-50%);
            width: 18px;
            height: 50px;
            background: linear-gradient(to top,
                transparent 0%,
                #ff9800 10%,
                #ff7043 30%,
                #ff5722 50%,
                #ffca28 80%,
                transparent 100%
            );
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
            filter: blur(2px);
            animation: flameOrange 0.1s ease-in-out infinite alternate;
            box-shadow: 0 0 20px rgba(255,152,0,0.6);
        }
        
        /* Outer red flame */
        .flame-red {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 24px;
            height: 65px;
            background: linear-gradient(to top,
                transparent 0%,
                rgba(244,67,54,0.9) 10%,
                rgba(255,87,34,0.7) 30%,
                rgba(255,138,101,0.5) 50%,
                rgba(255,152,0,0.3) 70%,
                transparent 100%
            );
            border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
            filter: blur(3px);
            animation: flameRed 0.12s ease-in-out infinite alternate;
        }
        
        /* Outermost glow */
        .flame-glow {
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 35px;
            height: 80px;
            background: radial-gradient(ellipse at center top,
                rgba(255,100,50,0.4) 0%,
                rgba(255,50,0,0.2) 30%,
                transparent 70%
            );
            filter: blur(8px);
            animation: flameGlow 0.15s ease-in-out infinite alternate;
        }
        
        /* Boost mode - bigger flames */
        .rocket-cursor.boost .flame-white { height: 28px; }
        .rocket-cursor.boost .flame-yellow { height: 50px; width: 16px; }
        .rocket-cursor.boost .flame-orange { height: 70px; width: 24px; }
        .rocket-cursor.boost .flame-red { height: 90px; width: 32px; }
        .rocket-cursor.boost .flame-glow { height: 110px; width: 50px; }
        
        .rocket-cursor.boost .flame-white { animation-duration: 0.03s; }
        .rocket-cursor.boost .flame-yellow { animation-duration: 0.05s; }
        .rocket-cursor.boost .flame-orange { animation-duration: 0.06s; }
        .rocket-cursor.boost .flame-red { animation-duration: 0.08s; }
        
        /* ========== FLAME ANIMATIONS ========== */
        @keyframes flameWhite {
            0% { transform: translateX(-50%) scaleX(0.8) scaleY(0.9); opacity: 1; }
            100% { transform: translateX(-50%) scaleX(1.2) scaleY(1.1); opacity: 0.95; }
        }
        
        @keyframes flameYellow {
            0% { transform: translateX(-50%) scaleX(0.85) scaleY(0.92) translateY(2px); }
            100% { transform: translateX(-50%) scaleX(1.15) scaleY(1.08) translateY(-2px); }
        }
        
        @keyframes flameOrange {
            0% { transform: translateX(-50%) scaleX(0.9) scaleY(0.88) skewX(-2deg); }
            100% { transform: translateX(-50%) scaleX(1.1) scaleY(1.12) skewX(2deg); }
        }
        
        @keyframes flameRed {
            0% { transform: translateX(-50%) scaleX(0.85) scaleY(0.85) skewX(3deg); opacity: 0.9; }
            100% { transform: translateX(-50%) scaleX(1.15) scaleY(1.15) skewX(-3deg); opacity: 1; }
        }
        
        @keyframes flameGlow {
            0% { transform: translateX(-50%) scale(0.9); opacity: 0.6; }
            100% { transform: translateX(-50%) scale(1.1); opacity: 0.8; }
        }
        
        /* ========== PARTICLE EFFECTS ========== */
        .particle-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 999998;
            overflow: hidden;
        }
        
        .fire-particle {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
        }
        
        .fire-particle.spark {
            background: radial-gradient(circle,
                #fff 0%,
                #ffeb3b 30%,
                #ff9800 60%,
                transparent 100%
            );
            box-shadow: 0 0 6px 2px rgba(255,200,0,0.8);
        }
        
        .fire-particle.ember {
            background: radial-gradient(circle,
                #ffca28 0%,
                #ff7043 40%,
                #e64a19 70%,
                transparent 100%
            );
            box-shadow: 0 0 4px rgba(255,100,0,0.6);
        }
        
        .fire-particle.smoke {
            background: radial-gradient(circle,
                rgba(150,150,150,0.6) 0%,
                rgba(100,100,100,0.3) 50%,
                transparent 100%
            );
        }
        
        .fire-particle.hot-smoke {
            background: radial-gradient(circle,
                rgba(255,200,150,0.5) 0%,
                rgba(200,100,50,0.2) 50%,
                transparent 100%
            );
        }
        
        /* Engine glow effect on rocket */
        .engine-glow {
            position: absolute;
            bottom: -2px;
            left: 50%;
            transform: translateX(-50%);
            width: 14px;
            height: 8px;
            background: radial-gradient(ellipse,
                rgba(255,200,100,1) 0%,
                rgba(255,150,50,0.8) 40%,
                transparent 100%
            );
            border-radius: 50%;
            opacity: 0;
            transition: opacity 0.1s;
        }
        
        .rocket-cursor.moving .engine-glow {
            opacity: 1;
            animation: enginePulse 0.1s ease-in-out infinite alternate;
        }
        
        @keyframes enginePulse {
            0% { transform: translateX(-50%) scale(0.9); }
            100% { transform: translateX(-50%) scale(1.2); }
        }
    `;
    
    const styleEl = document.createElement('style');
    styleEl.id = 'rocket-cursor-v3';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    // ============================================
    // Create Rocket HTML
    // ============================================
    
    const rocketHTML = `
        <div class="rocket-cursor" id="rocketCursor">
            <div class="rocket-wrapper">
                <svg class="rocket-svg" viewBox="0 0 32 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#e8e8e8"/>
                            <stop offset="50%" stop-color="#ffffff"/>
                            <stop offset="100%" stop-color="#d0d0d0"/>
                        </linearGradient>
                        <linearGradient id="noseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#ff5252"/>
                            <stop offset="100%" stop-color="#d32f2f"/>
                        </linearGradient>
                        <linearGradient id="finGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#4dd0e1"/>
                            <stop offset="100%" stop-color="#00acc1"/>
                        </linearGradient>
                        <linearGradient id="windowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#64b5f6"/>
                            <stop offset="100%" stop-color="#1976d2"/>
                        </linearGradient>
                    </defs>
                    
                    <!-- Rocket body -->
                    <ellipse cx="16" cy="24" rx="6" ry="16" fill="url(#bodyGrad)"/>
                    
                    <!-- Nose cone -->
                    <path d="M16 4 L10 16 L22 16 Z" fill="url(#noseGrad)"/>
                    
                    <!-- Window -->
                    <circle cx="16" cy="18" r="3.5" fill="url(#windowGrad)" stroke="#37474f" stroke-width="0.5"/>
                    <ellipse cx="15" cy="17" rx="1.5" ry="1" fill="rgba(255,255,255,0.7)"/>
                    
                    <!-- Left fin -->
                    <path d="M10 30 L3 44 L10 40 Z" fill="url(#finGrad)"/>
                    
                    <!-- Right fin -->
                    <path d="M22 30 L29 44 L22 40 Z" fill="url(#finGrad)"/>
                    
                    <!-- Body details -->
                    <rect x="11" y="26" width="10" height="2" rx="1" fill="#ff5252" opacity="0.8"/>
                    <rect x="12" y="30" width="8" height="1.5" rx="0.5" fill="#ff8a80" opacity="0.6"/>
                    
                    <!-- Engine bell -->
                    <ellipse cx="16" cy="40" rx="5" ry="2" fill="#37474f"/>
                    <ellipse cx="16" cy="39" rx="4" ry="1.5" fill="#607d8b"/>
                    <ellipse cx="16" cy="38.5" rx="3" ry="1" fill="#90a4ae"/>
                </svg>
                
                <!-- Engine glow -->
                <div class="engine-glow"></div>
                
                <!-- Fire effect -->
                <div class="fire-container">
                    <div class="fire">
                        <div class="flame-glow"></div>
                        <div class="flame-red"></div>
                        <div class="flame-orange"></div>
                        <div class="flame-yellow"></div>
                        <div class="flame-white"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.id = 'particleContainer';
    document.body.appendChild(particleContainer);
    
    // Add rocket
    const rocketDiv = document.createElement('div');
    rocketDiv.innerHTML = rocketHTML;
    document.body.appendChild(rocketDiv.firstElementChild);

    // ============================================
    // Rocket Controller
    // ============================================
    
    const rocket = document.getElementById('rocketCursor');
    const particles = document.getElementById('particleContainer');
    
    let currentX = -100, currentY = -100;
    let targetX = -100, targetY = -100;
    let currentRotation = 0;
    let targetRotation = 0;
    let lastX = 0, lastY = 0;
    let speed = 0;
    let isVisible = false;
    let animFrame = null;
    let activeParticles = [];
    let lastParticleTime = 0;
    let lastSmokeTime = 0;

    // Particle class
    class FireParticle {
        constructor(x, y, type, angle) {
            this.x = x;
            this.y = y;
            this.type = type;
            
            // Randomize size based on type
            if (type === 'spark') {
                this.size = Math.random() * 4 + 2;
                this.life = 300 + Math.random() * 200;
            } else if (type === 'ember') {
                this.size = Math.random() * 6 + 3;
                this.life = 400 + Math.random() * 300;
            } else if (type === 'hot-smoke') {
                this.size = Math.random() * 10 + 5;
                this.life = 500 + Math.random() * 300;
            } else {
                this.size = Math.random() * 15 + 8;
                this.life = 600 + Math.random() * 400;
            }
            
            this.maxLife = this.life;
            
            // Velocity based on rocket direction
            const spread = (Math.random() - 0.5) * 0.8;
            const rad = (angle + 180) * Math.PI / 180;
            const baseSpeed = type === 'spark' ? 3 : type === 'ember' ? 2 : 1;
            this.vx = Math.cos(rad + spread) * baseSpeed + (Math.random() - 0.5) * 2;
            this.vy = Math.sin(rad + spread) * baseSpeed + (Math.random() - 0.5) * 2;
            
            // Create DOM element
            this.el = document.createElement('div');
            this.el.className = `fire-particle ${type}`;
            this.el.style.width = this.size + 'px';
            this.el.style.height = this.size + 'px';
            this.el.style.left = this.x + 'px';
            this.el.style.top = this.y + 'px';
            particles.appendChild(this.el);
        }
        
        update(dt) {
            this.life -= dt;
            
            // Physics
            this.vy += 0.02; // Slight gravity for smoke rise effect
            this.vx *= 0.98; // Air resistance
            this.vy *= 0.98;
            
            this.x += this.vx;
            this.y += this.vy;
            
            // Fade and scale
            const progress = 1 - (this.life / this.maxLife);
            const opacity = Math.max(0, 1 - progress * 1.2);
            const scale = this.type === 'smoke' || this.type === 'hot-smoke' 
                ? 1 + progress * 2 
                : 1 - progress * 0.5;
            
            this.el.style.transform = `translate(-50%, -50%) scale(${scale})`;
            this.el.style.opacity = opacity;
            this.el.style.left = this.x + 'px';
            this.el.style.top = this.y + 'px';
            
            return this.life > 0;
        }
        
        destroy() {
            if (this.el.parentNode) {
                this.el.remove();
            }
        }
    }

    // Utility functions
    function lerp(a, b, t) { return a + (b - a) * t; }
    
    function normalizeAngle(a) {
        while (a > 180) a -= 360;
        while (a < -180) a += 360;
        return a;
    }
    
    function lerpAngle(a, b, t) {
        return a + normalizeAngle(b - a) * t;
    }

    // Spawn fire particles
    function spawnFireParticles(x, y, angle, count) {
        const now = Date.now();
        if (now - lastParticleTime < CONFIG.flameParticleRate) return;
        lastParticleTime = now;
        
        if (activeParticles.length >= CONFIG.maxParticles) return;
        
        // Spawn position (behind rocket)
        const rad = (angle + 180) * Math.PI / 180;
        const offsetX = Math.cos(rad) * 20;
        const offsetY = Math.sin(rad) * 20;
        const spawnX = x + offsetX;
        const spawnY = y + offsetY;
        
        // Sparks
        if (Math.random() < 0.7) {
            activeParticles.push(new FireParticle(spawnX, spawnY, 'spark', angle));
        }
        
        // Embers
        if (Math.random() < 0.5) {
            activeParticles.push(new FireParticle(spawnX, spawnY, 'ember', angle));
        }
        
        // Hot smoke
        if (Math.random() < 0.4) {
            activeParticles.push(new FireParticle(spawnX + (Math.random()-0.5)*10, spawnY + (Math.random()-0.5)*10, 'hot-smoke', angle));
        }
    }

    // Spawn smoke trail
    function spawnSmoke(x, y, angle) {
        const now = Date.now();
        if (now - lastSmokeTime < 50) return;
        lastSmokeTime = now;
        
        if (activeParticles.length >= CONFIG.maxParticles) return;
        
        const rad = (angle + 180) * Math.PI / 180;
        const spawnX = x + Math.cos(rad) * 35 + (Math.random()-0.5)*8;
        const spawnY = y + Math.sin(rad) * 35 + (Math.random()-0.5)*8;
        
        activeParticles.push(new FireParticle(spawnX, spawnY, 'smoke', angle));
    }

    // Animation loop
    let lastTime = performance.now();
    
    function animate() {
        const now = performance.now();
        const dt = now - lastTime;
        lastTime = now;
        
        // Smooth position
        currentX = lerp(currentX, targetX, CONFIG.smoothing);
        currentY = lerp(currentY, targetY, CONFIG.smoothing);
        
        // Calculate speed and direction
        const dx = targetX - lastX;
        const dy = targetY - lastY;
        speed = Math.sqrt(dx*dx + dy*dy);
        
        if (speed > CONFIG.minSpeed) {
            targetRotation = Math.atan2(dy, dx) * 180 / Math.PI + 90;
        }
        
        currentRotation = lerpAngle(currentRotation, targetRotation, CONFIG.rotationSmoothing);
        
        // Update rocket position
        rocket.style.left = currentX + 'px';
        rocket.style.top = currentY + 'px';
        rocket.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;
        
        // Update flame state
        if (speed > CONFIG.minSpeed) {
            rocket.classList.add('moving');
            
            // Spawn fire particles
            spawnFireParticles(currentX, currentY, currentRotation, speed > CONFIG.boostSpeed ? 3 : 1);
            spawnSmoke(currentX, currentY, currentRotation);
            
            if (speed > CONFIG.boostSpeed) {
                rocket.classList.add('boost');
            } else {
                rocket.classList.remove('boost');
            }
        } else {
            rocket.classList.remove('moving', 'boost');
        }
        
        // Update particles
        activeParticles = activeParticles.filter(p => {
            const alive = p.update(dt);
            if (!alive) p.destroy();
            return alive;
        });
        
        lastX = targetX;
        lastY = targetY;
        
        animFrame = requestAnimationFrame(animate);
    }

    // Event handlers
    function onMouseMove(e) {
        targetX = e.clientX;
        targetY = e.clientY;
        
        if (!isVisible) {
            isVisible = true;
            currentX = targetX;
            currentY = targetY;
            rocket.classList.add('visible');
            document.body.classList.add('rocket-active');
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
        document.body.classList.add('rocket-active');
    }

    // Start
    animate();
    
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    console.log('🚀 Ultra-Realistic Rocket Cursor v3.0 loaded');
})();
