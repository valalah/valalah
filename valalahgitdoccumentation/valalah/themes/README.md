# Valalah Theme System - Open Source Examples

This folder contains **open source theme examples** for the Valalah platform. Use these as templates to create your own custom themes!

---

## 📋 Table of Contents

- [Theme Structure](#theme-structure)
- [Available Themes](#available-themes)
- [Creating Your Own Theme](#creating-your-own-theme)
- [Theme Marketplace](#theme-marketplace)
- [Technical Implementation](#technical-implementation)

---

## 🎨 Theme Structure

Each theme consists of 3 main files:

```
your-theme-name/
├── styles.css        # Visual styling and animations
├── effects.js        # JavaScript effects and interactions
└── theme.json        # Theme metadata and configuration
```

### Optional Files:
- `audio.wav` / `audio.mp3` - Sound effects (e.g., chocolate crunching for Easter Eggs theme)
- `preview.png` - Preview image for the theme marketplace (recommended 800x600px)

---

## 🌟 Available Themes

### 1. Winter Snowflakes ❄️
**Perfect for:** Winter, Christmas, Holiday season  
**Effect:** Gentle falling snowflakes with subtle rotation  
**Price:** €0.10 per use  
**Files:** `winter-snowflakes/`

### 2. Autumn Leaves 🍂
**Perfect for:** Fall, Thanksgiving, Seasonal changes  
**Effect:** Colorful autumn leaves falling and spinning  
**Price:** €0.10 per use  
**Files:** `autumn-leaves/`

### 3. Summer Glow ☀️
**Perfect for:** Summer, Bright profiles, Energy  
**Effect:** Golden halo following your cursor  
**Price:** €0.10 per use  
**Files:** `summer-glow/`

### 4. Easter Eggs 🥚
**Perfect for:** Easter, Spring, Celebrations  
**Effect:** Colorful falling eggs with chocolate crunch sound  
**Price:** €0.10 per use  
**Files:** `easter-eggs/`

---

## 🛠️ Creating Your Own Theme

### Step 1: Clone this repository

```bash
git clone <repository-url>
cd themes
```

### Step 2: Create your theme folder

```bash
mkdir my-awesome-theme
cd my-awesome-theme
```

### Step 3: Create theme.json

```json
{
  "name": "My Awesome Theme",
  "slug": "my-awesome-theme",
  "description": "A short description of your theme",
  "author": "Your Name",
  "version": "1.0.0",
  "pricePerUseCents": 10,
  "tags": ["celebration", "animated", "colorful"],
  "files": {
    "css": "styles.css",
    "js": "effects.js",
    "audio": "audio.mp3",
    "preview": "preview.png"
  }
}
```

### Step 4: Create styles.css

Define your visual styling:

```css
/* Your theme's custom CSS */
.theme-container {
  /* Your styles here */
}

.theme-particle {
  position: fixed;
  pointer-events: none;
  animation: fall 5s linear infinite;
}

@keyframes fall {
  from {
    transform: translateY(-100px) rotate(0deg);
    opacity: 1;
  }
  to {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}
```

### Step 5: Create effects.js

Add interactive JavaScript:

```javascript
// Your theme's JavaScript effects
(function() {
  'use strict';
  
  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'theme-particle';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 7000);
  }
  
  setInterval(createParticle, 300);
})();
```

### Step 6: Test locally

1. Copy your theme files to `public/themes/your-theme-name/`
2. Register your theme in the database
3. Test on a profile page

---

## 🏪 Theme Marketplace

### Submitting Your Theme

1. **Create a Pull Request** with your theme in the `themes/` folder
2. **Include:**
   - Complete theme files (CSS, JS, JSON)
   - Preview image (800x600px PNG)
   - README.md with description and screenshots
3. **Wait for review** by the Valalah team
4. **Earn revenue share:** 70% of sales go to theme creators!

### Theme Guidelines

✅ **Do:**
- Keep file sizes small (<50KB for CSS, <30KB for JS)
- Test on mobile and desktop
- Use CSS animations (not heavy JavaScript loops)
- Provide a clear preview image
- Include attribution if using third-party assets

❌ **Don't:**
- Use external CDN dependencies
- Make API calls to external services
- Access user data without permission
- Use copyrighted content without license
- Create performance-heavy effects

---

## 🔧 Technical Implementation

### How Themes Are Loaded

1. User purchases/activates theme from marketplace
2. Theme files are loaded into profile page:
   ```html
   <link rel="stylesheet" href="/themes/{slug}/styles.css">
   <script src="/themes/{slug}/effects.js"></script>
   ```
3. JavaScript effects initialize automatically
4. Audio files (if any) are preloaded

### Performance Considerations

- **CSS animations preferred** over JavaScript animations
- Use `transform` and `opacity` for smooth 60fps animations
- Limit particle count (max ~30 simultaneous elements)
- Clean up DOM elements after animation completes
- Use `requestAnimationFrame` for JavaScript animations

### Mobile Optimization

```javascript
// Example: Reduce particles on mobile
const isMobile = window.innerWidth < 768;
const particleCount = isMobile ? 10 : 30;
```

### Theme Lifecycle

```javascript
// Initialize theme
function initTheme() {
  console.log('Theme loaded: My Awesome Theme');
  // Your initialization code
}

// Cleanup (when theme is changed)
function cleanupTheme() {
  // Remove event listeners
  // Clear intervals/timeouts
  // Remove DOM elements
}

// Auto-init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}
```

---

## 📊 Theme Analytics

Theme creators get access to:
- **Usage statistics** (how many profiles use your theme)
- **Revenue tracking** (70% of sales)
- **User ratings** (5-star system)
- **Performance metrics** (load time, mobile compatibility)

---

## 🤝 Community

- **Discord:** discord.gg/valalah
- Share your themes and get feedback from the community
- Report bugs or request features via GitHub Issues

---

## 📜 License

All themes in this folder are released under the **MIT License** unless otherwise specified.

You are free to:
- ✅ Use these themes as templates
- ✅ Modify and create derivatives
- ✅ Sell your themes on the Valalah marketplace

**Attribution appreciated but not required!**

---

## 💡 Pro Tips

1. **Start simple** - Copy an existing theme and modify it
2. **Test thoroughly** - Check on different browsers and devices
3. **Optimize early** - Keep file sizes small from the start
4. **Get feedback** - Share previews in the Discord community
5. **Update regularly** - Maintain your themes with bug fixes

---

## 🏆 Top Theme Creators

1. **Valalah Team** - Winter Snowflakes, Autumn Leaves, Summer Glow, Easter Eggs
2. *Your name here!* - Submit your first theme today

---

**Happy theming! 🎨**
