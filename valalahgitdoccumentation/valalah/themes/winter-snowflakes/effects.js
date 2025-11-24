/**
 * Winter Snowflakes Theme - JavaScript Effects
 * Author: Valalah Team
 * Version: 1.0.0
 */

(function() {
  'use strict';
  
  // Configuration
  const config = {
    maxParticles: window.innerWidth < 768 ? 15 : 30,
    particleInterval: 300,
    snowflakeChars: ['❄', '❅', '❆'],
    minDuration: 8,
    maxDuration: 12
  };
  
  let activeParticles = 0;
  let intervalId = null;
  
  /**
   * Create a single snowflake element
   */
  function createSnowflake() {
    if (activeParticles >= config.maxParticles) {
      return;
    }
    
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.textContent = config.snowflakeChars[Math.floor(Math.random() * config.snowflakeChars.length)];
    
    // Random horizontal position
    snowflake.style.left = Math.random() * 100 + 'vw';
    
    // Random animation duration
    const duration = config.minDuration + Math.random() * (config.maxDuration - config.minDuration);
    snowflake.style.animationDuration = `${duration}s, 3s`;
    
    document.body.appendChild(snowflake);
    activeParticles++;
    
    // Remove snowflake after animation completes
    setTimeout(() => {
      snowflake.remove();
      activeParticles--;
    }, duration * 1000);
  }
  
  /**
   * Start the snowfall effect
   */
  function startSnowfall() {
    // Create initial batch
    for (let i = 0; i < Math.min(10, config.maxParticles); i++) {
      setTimeout(() => createSnowflake(), i * 100);
    }
    
    // Continue creating snowflakes at intervals
    intervalId = setInterval(createSnowflake, config.particleInterval);
  }
  
  /**
   * Stop the snowfall effect and cleanup
   */
  function stopSnowfall() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    
    // Remove all snowflakes
    document.querySelectorAll('.snowflake').forEach(flake => flake.remove());
    activeParticles = 0;
  }
  
  /**
   * Initialize theme
   */
  function init() {
    console.log('❄️ Winter Snowflakes theme loaded');
    startSnowfall();
  }
  
  /**
   * Cleanup on page unload
   */
  window.addEventListener('beforeunload', stopSnowfall);
  
  // Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Export cleanup function for theme switching
  window.cleanupWinterSnowflakes = stopSnowfall;
})();
