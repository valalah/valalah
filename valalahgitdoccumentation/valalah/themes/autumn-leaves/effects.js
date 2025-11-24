/**
 * Autumn Leaves Theme - JavaScript Effects
 * Author: Valalah Team
 * Version: 1.0.0
 */

(function() {
  'use strict';
  
  // Configuration
  const config = {
    maxParticles: window.innerWidth < 768 ? 12 : 25,
    particleInterval: 400,
    leafChars: ['🍁', '🍂'],
    leafColors: ['orange', 'red', 'yellow', 'brown'],
    minDuration: 10,
    maxDuration: 14
  };
  
  let activeParticles = 0;
  let intervalId = null;
  
  /**
   * Create a single leaf element
   */
  function createLeaf() {
    if (activeParticles >= config.maxParticles) {
      return;
    }
    
    const leaf = document.createElement('div');
    leaf.className = 'autumn-leaf';
    
    // Random leaf character
    leaf.textContent = config.leafChars[Math.floor(Math.random() * config.leafChars.length)];
    
    // Random color class
    const colorClass = config.leafColors[Math.floor(Math.random() * config.leafColors.length)];
    leaf.classList.add(colorClass);
    
    // Random horizontal position
    leaf.style.left = Math.random() * 100 + 'vw';
    
    // Random animation duration
    const fallDuration = config.minDuration + Math.random() * (config.maxDuration - config.minDuration);
    const swayDuration = 3 + Math.random() * 2;
    leaf.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
    
    document.body.appendChild(leaf);
    activeParticles++;
    
    // Remove leaf after animation completes
    setTimeout(() => {
      leaf.remove();
      activeParticles--;
    }, fallDuration * 1000);
  }
  
  /**
   * Start the leaf fall effect
   */
  function startLeafFall() {
    // Create initial batch
    for (let i = 0; i < Math.min(8, config.maxParticles); i++) {
      setTimeout(() => createLeaf(), i * 150);
    }
    
    // Continue creating leaves at intervals
    intervalId = setInterval(createLeaf, config.particleInterval);
  }
  
  /**
   * Stop the leaf fall effect and cleanup
   */
  function stopLeafFall() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    
    // Remove all leaves
    document.querySelectorAll('.autumn-leaf').forEach(leaf => leaf.remove());
    activeParticles = 0;
  }
  
  /**
   * Initialize theme
   */
  function init() {
    console.log('🍂 Autumn Leaves theme loaded');
    startLeafFall();
  }
  
  /**
   * Cleanup on page unload
   */
  window.addEventListener('beforeunload', stopLeafFall);
  
  // Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Export cleanup function
  window.cleanupAutumnLeaves = stopLeafFall;
})();
