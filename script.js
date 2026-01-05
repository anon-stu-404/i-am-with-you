// Emotional Doodle Companion - For Anha
// A gentle digital space for presence and understanding

class EmotionalDoodle {
    constructor() {
        // State management
        this.state = {
            isPaused: false,
            animationPhase: 0,
            companionArrived: false,
            waveDissolved: false,
            particles: [],
            lastClickTime: 0,
            breathGuideActive: false
        };
        
        // DOM elements
        this.elements = {
            girl: document.getElementById('girl'),
            wave: document.getElementById('wave'),
            companion: document.getElementById('companion'),
            particles: document.getElementById('particles'),
            recognition: document.getElementById('recognition'),
            comfort: document.getElementById('comfort'),
            pauseBtn: document.getElementById('pauseBtn'),
            resetBtn: document.getElementById('resetBtn'),
            breathBtn: document.getElementById('breathBtn'),
            hint: document.getElementById('hint'),
            scene: document.querySelector('.scene')
        };
        
        // Timeline configuration
        this.timeline = {
            girlAppear: 1000,      // 1s
            waveApproach: 4000,    // 4s
            recognitionShow: 7000,  // 7s
            companionEnter: 10000,  // 10s
            waveDissolveStart: 13000, // 13s
            comfortShow: 16000,     // 16s
            loopReset: 22000        // 22s
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.startTimeline();
        this.createInteractiveBackground();
        
        // Initial hint
        setTimeout(() => {
            this.showHint();
        }, 2000);
    }
    
    setupEventListeners() {
        // Control buttons
        this.elements.pauseBtn.addEventListener('click', () => this.togglePause());
        this.elements.resetBtn.addEventListener('click', () => this.resetAnimation());
        this.elements.breathBtn.addEventListener('click', () => this.startBreathGuide());
        
        // Interactive click/touch support
        document.addEventListener('click', (e) => this.handleInteraction(e));
        document.addEventListener('touchstart', (e) => this.handleInteraction(e));
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case ' ':
                    e.preventDefault();
                    this.togglePause();
                    break;
                case 'r':
                case 'R':
                    this.resetAnimation();
                    break;
                case 'b':
                case 'B':
                    this.startBreathGuide();
                    break;
                case 'Escape':
                    this.state.isPaused = false;
                    this.updatePauseState();
                    break;
            }
        });
        
        // Visibility change handling
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.state.wasPaused = this.state.isPaused;
                this.state.isPaused = true;
            } else if (!this.state.wasPaused) {
                this.state.isPaused = false;
            }
            this.updatePauseState();
        });
    }
    
    startTimeline() {
        // Phase 1: Girl appears
        setTimeout(() => {
            if (this.state.isPaused) return;
            this.animateGirl();
        }, this.timeline.girlAppear);
        
        // Phase 2: Wave approaches
        setTimeout(() => {
            if (this.state.isPaused) return;
            this.animateWaveApproach();
        }, this.timeline.waveApproach);
        
        // Phase 3: Recognition message
        setTimeout(() => {
            if (this.state.isPaused) return;
            this.showRecognition();
        }, this.timeline.recognitionShow);
        
        // Phase 4: Companion enters
        setTimeout(() => {
            if (this.state.isPaused) return;
            this.animateCompanionEnter();
        }, this.timeline.companionEnter);
        
        // Phase 5: Wave dissolves
        setTimeout(() => {
            if (this.state.isPaused) return;
            this.animateWaveDissolve();
        }, this.timeline.waveDissolveStart);
        
        // Phase 6: Comfort message
        setTimeout(() => {
            if (this.state.isPaused) return;
            this.showComfort();
        }, this.timeline.comfortShow);
        
        // Phase 7: Loop reset
        setTimeout(() => {
            if (this.state.isPaused) return;
            this.resetForLoop();
        }, this.timeline.loopReset);
    }
    
    animateGirl() {
        this.elements.girl.style.animation = 'girlAppear 3s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        // Add subtle movement
        const moveGirl = () => {
            if (this.state.isPaused) return;
            const moveX = Math.sin(Date.now() / 5000) * 3;
            const moveY = Math.cos(Date.now() / 7000) * 2;
            this.elements.girl.style.transform = `translate(calc(-50% + ${moveX}px), ${moveY}px)`;
            if (!this.state.isPaused) requestAnimationFrame(moveGirl);
        };
        moveGirl();
    }
    
    animateWaveApproach() {
        this.elements.wave.style.animation = `
            waveApproach 5s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94),
            wavePulse 8s infinite ease-in-out
        `;
        
        // Add pressure effect on girl
        setTimeout(() => {
            if (this.state.isPaused) return;
            this.elements.girl.style.transform = 'translate(-50%, 0) scale(0.95)';
        }, 2000);
    }
    
    showRecognition() {
        this.elements.recognition.style.opacity = '1';
        this.elements.recognition.style.transform = 'translateY(0)';
        
        // Typewriter effect
        const text = this.elements.recognition.querySelector('p');
        const originalText = text.textContent;
        text.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length && !this.state.isPaused) {
                text.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        typeWriter();
    }
    
    animateCompanionEnter() {
        this.state.companionArrived = true;
        
        this.elements.companion.style.opacity = '1';
        this.elements.companion.style.transform = 'translate(-50%, 0)';
        this.elements.companion.style.transition = 'all 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        // Subtle companion movement
        const moveCompanion = () => {
            if (this.state.isPaused) return;
            const moveX = Math.sin(Date.now() / 6000 + 1) * 2;
            const moveY = Math.cos(Date.now() / 8000 + 1) * 1.5;
            this.elements.companion.style.transform = `translate(calc(-50% + ${moveX}px), ${moveY}px)`;
            if (!this.state.isPaused) requestAnimationFrame(moveCompanion);
        };
        moveCompanion();
        
        // Girl reacts slightly to companion's presence
        setTimeout(() => {
            if (this.state.isPaused) return;
            this.elements.girl.style.transform = 'translate(calc(-50% + 5px), -2px)';
        }, 1000);
    }
    
    animateWaveDissolve() {
        this.state.waveDissolved = true;
        
        // Slow down wave pulse
        this.elements.wave.style.animation = `
            waveApproach 5s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94),
            wavePulse 12s infinite ease-in-out
        `;
        
        // Create dissolving particles
        this.createWaveParticles();
        
        // Gradually fade wave
        setTimeout(() => {
            if (this.state.isPaused) return;
            this.elements.wave.style.opacity = '0';
            this.elements.wave.style.transition = 'opacity 4s ease';
        }, 1000);
    }
    
    createWaveParticles() {
        const particleCount = 80;
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                if (this.state.isPaused) return;
                
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random position along wave
                const waveRect = this.elements.wave.getBoundingClientRect();
                const sceneRect = this.elements.scene.getBoundingClientRect();
                
                const x = Math.random() * waveRect.width;
                const y = waveRect.top - sceneRect.top + Math.random() * 50;
                
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;
                particle.style.setProperty('--start-x', x);
                particle.style.setProperty('--start-y', y);
                
                // Random animation
                const angle = Math.random() * Math.PI * 2;
                const distance = 50 + Math.random() * 100;
                const duration = 2 + Math.random() * 3;
                
                particle.style.animation = `
                    particleFloat ${duration}s forwards ease-out
                `;
                
                // Add to particles array for cleanup
                this.state.particles.push({
                    element: particle,
                    birthTime: Date.now(),
                    lifespan: duration * 1000
                });
                
                this.elements.particles.appendChild(particle);
                
                // Remove after animation
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, duration * 1000);
                
            }, i * 30); // Stagger creation
        }
        
        // Cleanup old particles
        this.cleanupParticles();
    }
    
    cleanupParticles() {
        const now = Date.now();
        this.state.particles = this.state.particles.filter(p => {
            if (now - p.birthTime > p.lifespan) {
                if (p.element.parentNode) {
                    p.element.parentNode.removeChild(p.element);
                }
                return false;
            }
            return true;
        });
    }
    
    showComfort() {
        this.elements.comfort.style.opacity = '1';
        this.elements.comfort.style.transform = 'translateY(0)';
        
        // Stagger text appearance
        const lines = this.elements.comfort.querySelectorAll('p');
        lines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                if (this.state.isPaused) return;
                line.style.transition = 'all 1.5s ease';
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, index * 800);
        });
    }
    
    resetForLoop() {
        // Reset all elements to initial state
        this.elements.girl.style.opacity = '0';
        this.elements.girl.style.transform = 'translate(-50%, 20px)';
        
        this.elements.wave.style.opacity = '0';
        this.elements.wave.style.transform = 'translateY(100px) scaleX(0.8)';
        this.elements.wave.style.animation = '';
        
        this.elements.companion.style.opacity = '0';
        this.elements.companion.style.transform = 'translate(-50%, 100px)';
        
        this.elements.recognition.style.opacity = '0';
        this.elements.recognition.style.transform = 'translateY(20px)';
        
        this.elements.comfort.style.opacity = '0';
        this.elements.comfort.style.transform = 'translateY(20px)';
        
        this.state.companionArrived = false;
        this.state.waveDissolved = false;
        
        // Clear all particles
        this.elements.particles.innerHTML = '';
        this.state.particles = [];
        
        // Reset text content
        this.elements.recognition.querySelector('p').textContent = 
            'Some days, the weight doesn\'t need to be carried alone.';
        
        // Restart timeline
        setTimeout(() => {
            if (!this.state.isPaused) {
                this.startTimeline();
            }
        }, 1000);
    }
    
    togglePause() {
        this.state.isPaused = !this.state.isPaused;
        this.updatePauseState();
        
        // Visual feedback
        const btn = this.elements.pauseBtn.querySelector('.btn-icon');
        btn.textContent = this.state.isPaused ? '▶️' : '⏸️';
    }
    
    updatePauseState() {
        const elements = [
            this.elements.girl,
            this.elements.wave,
            this.elements.companion,
            this.elements.recognition,
            this.elements.comfort
        ];
        
        elements.forEach(el => {
            if (el) {
                el.style.animationPlayState = this.state.isPaused ? 'paused' : 'running';
            }
        });
        
        // Pause particles
        document.querySelectorAll('.particle').forEach(particle => {
            particle.style.animationPlayState = this.state.isPaused ? 'paused' : 'running';
        });
    }
    
    resetAnimation() {
        this.state.isPaused = false;
        this.updatePauseState();
        
        // Reset button icon
        this.elements.pauseBtn.querySelector('.btn-icon').textContent = '⏸️';
        
        // Reset to beginning
        this.resetForLoop();
        
        // Visual feedback
        this.elements.resetBtn.style.background = 'rgba(100, 255, 218, 0.3)';
        setTimeout(() => {
            this.elements.resetBtn.style.background = '';
        }, 300);
    }
    
    startBreathGuide() {
        if (this.state.breathGuideActive) return;
        
        this.state.breathGuideActive = true;
        
        // Visual feedback
        this.elements.breathBtn.style.background = 'rgba(100, 255, 218, 0.3)';
        this.elements.breathBtn.querySelector('.btn-icon').textContent = '🌊';
        
        // Create breath guide animation
        const breathCircle = document.createElement('div');
        breathCircle.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100px;
            height: 100px;
            border: 3px solid rgba(100, 255, 218, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 100;
            animation: breathGuide 4s infinite ease-in-out;
        `;
        
        // Add CSS for animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes breathGuide {
                0%, 100% { 
                    transform: translate(-50%, -50%) scale(0.8); 
                    opacity: 0.3; 
                    border-color: rgba(100, 255, 218, 0.3);
                }
                50% { 
                    transform: translate(-50%, -50%) scale(1.2); 
                    opacity: 0.7; 
                    border-color: rgba(100, 255, 218, 0.8);
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(breathCircle);
        
        // Sync girl's breathing
        const girlBreath = this.elements.girl.querySelector('.body');
        if (girlBreath) {
            girlBreath.style.animation = 'girlBreath 4s infinite ease-in-out';
        }
        
        // Stop after 5 cycles
        setTimeout(() => {
            document.body.removeChild(breathCircle);
            document.head.removeChild(style);
            this.state.breathGuideActive = false;
            this.elements.breathBtn.style.background = '';
            this.elements.breathBtn.querySelector('.btn-icon').textContent = '🌬️';
            
            if (girlBreath) {
                girlBreath.style.animation = '';
            }
        }, 20000); // 5 cycles * 4 seconds
    }
    
    handleInteraction(e) {
        // Prevent multiple rapid clicks
        const now = Date.now();
        if (now - this.state.lastClickTime < 500) return;
        this.state.lastClickTime = now;
        
        // Show support feedback at click location
        this.showSupportFeedback(e.clientX, e.clientY);
        
        // If companion hasn't arrived yet, accelerate their arrival
        if (!this.state.companionArrived && this.state.animationPhase >= 2) {
            this.accelerateCompanion();
        }
        
        // If wave hasn't dissolved, accelerate dissolution
        if (!this.state.waveDissolved && this.state.companionArrived) {
            this.accelerateWaveDissolution();
        }
    }
    
    showSupportFeedback(x, y) {
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(100, 255, 218, 0.2);
            pointer-events: none;
            z-index: 10;
            transform: translate(-50%, -50%);
            animation: supportRipple 1.5s ease-out;
        `;
        
        // Add CSS for animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes supportRipple {
                0% { 
                    width: 0; 
                    height: 0; 
                    opacity: 0.7; 
                }
                100% { 
                    width: 200px; 
                    height: 200px; 
                    opacity: 0; 
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(feedback);
        
        // Clean up
        setTimeout(() => {
            document.body.removeChild(feedback);
            document.head.removeChild(style);
        }, 1500);
    }
    
    accelerateCompanion() {
        if (this.state.companionArrived || this.state.isPaused) return;
        
        this.state.companionArrived = true;
        this.animateCompanionEnter();
        
        // Update wave animation to respond
        setTimeout(() => {
            if (!this.state.isPaused) {
                this.elements.wave.style.animation = `
                    waveApproach 5s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94),
                    wavePulse 10s infinite ease-in-out
                `;
            }
        }, 500);
    }
    
    accelerateWaveDissolution() {
        if (this.state.waveDissolved || this.state.isPaused) return;
        
        this.state.waveDissolved = true;
        this.animateWaveDissolve();
        
        // Show comfort message sooner
        setTimeout(() => {
            if (!this.state.isPaused) {
                this.showComfort();
            }
        }, 1000);
    }
    
    showHint() {
        this.elements.hint.style.animation = 'hintFade 3s 2s forwards';
        
        // Hide hint after showing
        setTimeout(() => {
            this.elements.hint.style.opacity = '0';
        }, 8000);
    }
    
    createInteractiveBackground() {
        // Create subtle interactive particles in background
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${1 + Math.random() * 3}px;
                height: ${1 + Math.random() * 3}px;
                background: rgba(100, 255, 218, ${0.05 + Math.random() * 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                z-index: 1;
                animation: float ${10 + Math.random() * 20}s infinite linear;
            `;
            
            document.querySelector('.background').appendChild(particle);
        }
        
        // Add floating animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translate(0, 0) rotate(0deg); }
                25% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(90deg); }
                50% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(180deg); }
                75% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(270deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add custom CSS for particles
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 0.8;
            }
            100% {
                transform: translate(
                    calc(var(--start-x) * 0.1 - 50px + ${Math.random() * 100 - 50}px),
                    calc(var(--start-y) * -1 - 100px)
                ) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
    
    // Start the emotional doodle
    window.emotionalDoodle = new EmotionalDoodle();
    
    // Console message for Anha
    console.log('%c For Anha — You don\'t have to be strong right now. ', 
        'background: #0a192f; color: #64ffda; font-size: 16px; padding: 10px; border: 1px solid #64ffda; border-radius: 5px;');
    console.log('%c This space is a gentle reminder: presence is enough. ', 
        'color: #8892b0; font-style: italic;');
});
