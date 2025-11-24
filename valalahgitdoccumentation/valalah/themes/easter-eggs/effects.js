/**
 * Easter Eggs Theme - JavaScript Effects
 * Author: Valalah Team
 * Version: 1.0.0
 */

(function() {
  'use strict';
  
  // Configuration
  const config = {
    maxParticles: window.innerWidth < 768 ? 10 : 20,
    particleInterval: 500,
    eggChars: ['🥚', '🐣'],
    chocolatePieces: ['🍫', '🍬', '🍭'],
    minDuration: 9,
    maxDuration: 12,
    audioEnabled: true
  };
  
  let activeParticles = 0;
  let intervalId = null;
  let crunchAudio = null;
  
  /**
   * Preload audio
   */
  function preloadAudio() {
    if (!config.audioEnabled) return;
    
    try {
      crunchAudio = new Audio('/themes/easter-eggs/audio.wav');
      crunchAudio.volume = 0.3;
    } catch (e) {
      console.warn('Failed to load Easter egg audio:', e);
      config.audioEnabled = false;
    }
  }
  
  /**
   * Play crunch sound
   */
  function playCrunch() {
    if (!config.audioEnabled || !crunchAudio) return;
    
    try {
      const sound = crunchAudio.cloneNode();
      sound.volume = 0.3;
      sound.play();
    } catch (e) {
      console.warn('Failed to play crunch sound:', e);
    }
  }
  
  /**
   * Create chocolate pieces effect
   */
  function createChocolatePieces(x, y) {
    const pieceCount = 5 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < pieceCount; i++) {
      const piece = document.createElement('div');
      piece.className = 'chocolate-piece';
      piece.textContent = config.chocolatePieces[Math.floor(Math.random() * config.chocolatePieces.length)];
      
      const tx = (Math.random() - 0.5) * 100;
      const ty = (Math.random() - 0.5) * 100;
      
      piece.style.left = x + 'px';
      piece.style.top = y + 'px';
      piece.style.setProperty('--tx', tx + 'px');
      piece.style.setProperty('--ty', ty + 'px');
      
      document.body.appendChild(piece);
      
      setTimeout(() => piece.remove(), 1000);
    }
  }
  
  /**
   * Handle egg click
   */
  function handleEggClick(e) {
    const egg = e.currentTarget;
    
    // Add crack animation
    egg.classList.add('cracked');
    
    // Play sound
    playCrunch();
    
    // Create chocolate pieces
    const rect = egg.getBoundingClientRect();
    createChocolatePieces(rect.left + rect.width / 2, rect.top + rect.height / 2);
    
    // Remove egg
    setTimeout(() => {
      egg.remove();
      activeParticles--;
    }, 300);
  }
  
  /**
   * Create a single egg element
   */
  function createEgg() {
    if (activeParticles >= config.maxParticles) {
      return;
    }
    
    const egg = document.createElement('div');
    egg.className = 'easter-egg';
    egg.textContent = config.eggChars[Math.floor(Math.random() * config.eggChars.length)];
    
    // Random horizontal position
    egg.style.left = Math.random() * 100 + 'vw';
    
    // Random animation duration
    const fallDuration = config.minDuration + Math.random() * (config.maxDuration - config.minDuration);
    const wobbleDuration = 0.8 + Math.random() * 0.4;
    egg.style.animationDuration = `${fallDuration}s, ${wobbleDuration}s`;
    
    // Add click handler
    egg.addEventListener('click', handleEggClick);
    
    document.body.appendChild(egg);
    activeParticles++;
    
    // Auto-remove if not clicked
    setTimeout(() => {
      if (egg.parentNode) {
        egg.remove();
        activeParticles--;
      }
    }, fallDuration * 1000);
  }
  
  /**
   * Start the egg fall effect
   */
  function startEggFall() {
    // Create initial batch
    for (let i = 0; i < Math.min(6, config.maxParticles); i++) {
      setTimeout(() => createEgg(), i * 200);
    }
    
    // Continue creating eggs at intervals
    intervalId = setInterval(createEgg, config.particleInterval);
  }
  
  /**
   * Stop the egg fall effect and cleanup
   */
  function stopEggFall() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    
    // Remove all eggs and chocolate pieces
    document.querySelectorAll('.easter-egg, .chocolate-piece').forEach(el => el.remove());
    activeParticles = 0;
  }
  
  /**
   * Initialize theme
   */
  function init() {
    console.log('🥚 Easter Eggs theme loaded');
    preloadAudio();
    startEggFall();
  }
  
  /**
   * Cleanup on page unload
   */
  window.addEventListener('beforeunload', stopEggFall);
  
  // Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Export cleanup function
  window.cleanupEasterEggs = stopEggFall;
})();
