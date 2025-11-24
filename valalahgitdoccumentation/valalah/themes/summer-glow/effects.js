/**
 * Summer Glow Theme - JavaScript Effects
 * Author: Valalah Team
 * Version: 1.0.0
 */

(function() {
  'use strict';
  
  // Configuration
  const config = {
    maxTrailLength: 15,
    trailInterval: 16, // ~60fps
    sparkleInterval: 500,
    isMobile: window.innerWidth < 768 || ('ontouchstart' in window)
  };
  
  let mouseX = 0;
  let mouseY = 0;
  let trail = [];
  let glowCenter = null;
  let animationFrame = null;
  let sparkleTimeout = null;
  
  /**
   * Create the center glow element
   */
  function createGlowCenter() {
    glowCenter = document.createElement('div');
    glowCenter.className = 'glow-center';
    glowCenter.style.left = '-100px';
    glowCenter.style.top = '-100px';
    document.body.appendChild(glowCenter);
  }
  
  /**
   * Create a trail particle
   */
  function createTrailParticle(x, y) {
    if (config.isMobile) return;
    
    const particle = document.createElement('div');
    particle.className = 'glow-trail';
    particle.style.left = (x - 10) + 'px';
    particle.style.top = (y - 10) + 'px';
    document.body.appendChild(particle);
    
    trail.push(particle);
    
    if (trail.length > config.maxTrailLength) {
      const oldParticle = trail.shift();
      oldParticle.style.opacity = '0';
      setTimeout(() => oldParticle.remove(), 300);
    }
  }
  
  /**
   * Create a sparkle effect
   */
  function createSparkle(x, y) {
    if (config.isMobile) return;
    
    const sparkle = document.createElement('div');
    sparkle.className = 'glow-sparkle';
    sparkle.style.left = (x + (Math.random() - 0.5) * 30) + 'px';
    sparkle.style.top = (y + (Math.random() - 0.5) * 30) + 'px';
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
  }
  
  /**
   * Update glow position
   */
  function updateGlow() {
    if (glowCenter) {
      glowCenter.style.left = (mouseX - 20) + 'px';
      glowCenter.style.top = (mouseY - 20) + 'px';
    }
  }
  
  /**
   * Animation loop
   */
  function animate() {
    createTrailParticle(mouseX, mouseY);
    updateGlow();
    animationFrame = requestAnimationFrame(animate);
  }
  
  /**
   * Handle mouse movement
   */
  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
  
  /**
   * Sparkle interval
   */
  function startSparkles() {
    if (config.isMobile) return;
    
    function sparkle() {
      if (Math.random() > 0.7) {
        createSparkle(mouseX, mouseY);
      }
      sparkleTimeout = setTimeout(sparkle, config.sparkleInterval);
    }
    
    sparkle();
  }
  
  /**
   * Start the glow effect
   */
  function startGlow() {
    createGlowCenter();
    document.addEventListener('mousemove', handleMouseMove);
    animate();
    startSparkles();
  }
  
  /**
   * Stop the glow effect and cleanup
   */
  function stopGlow() {
    document.removeEventListener('mousemove', handleMouseMove);
    
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
    
    if (sparkleTimeout) {
      clearTimeout(sparkleTimeout);
      sparkleTimeout = null;
    }
    
    // Remove all elements
    document.querySelectorAll('.glow-center, .glow-trail, .glow-sparkle').forEach(el => el.remove());
    trail = [];
    glowCenter = null;
  }
  
  /**
   * Initialize theme
   */
  function init() {
    console.log('☀️ Summer Glow theme loaded');
    startGlow();
  }
  
  /**
   * Cleanup on page unload
   */
  window.addEventListener('beforeunload', stopGlow);
  
  // Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Export cleanup function
  window.cleanupSummerGlow = stopGlow;
})();
