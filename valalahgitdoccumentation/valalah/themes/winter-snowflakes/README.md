# ❄️ Winter Snowflakes Theme

Gentle falling snowflakes with subtle rotation and drift. Perfect for winter and Christmas profiles.

## Preview

![Winter Snowflakes Preview](preview.png)

## Features

- ✨ Realistic snowflake falling animation
- 🌀 Subtle rotation and drift effects
- 📱 Mobile optimized (reduced particles on small screens)
- 🎨 Three different snowflake characters (❄ ❅ ❆)
- ⚡ Performance optimized (<30 particles max)

## Installation

1. Copy all files to `public/themes/winter-snowflakes/`
2. Register theme in database:
   ```sql
   INSERT INTO themes (name, slug, description, css_file_url, js_file_url, is_system_theme, status, price_per_use_cents)
   VALUES ('Winter Snowflakes', 'winter-snowflakes', 'Gentle falling snowflakes...', '/themes/winter-snowflakes/styles.css', '/themes/winter-snowflakes/effects.js', true, 'published', 10);
   ```

## Customization

### Change snowflake speed

Edit `effects.js`:
```javascript
const config = {
  minDuration: 8,  // Slower = higher number
  maxDuration: 12  // Slower = higher number
};
```

### Change particle count

Edit `effects.js`:
```javascript
const config = {
  maxParticles: 30,  // Desktop
  // ...
};
```

For mobile:
```javascript
maxParticles: window.innerWidth < 768 ? 15 : 30
```

### Change snowflake characters

Edit `effects.js`:
```javascript
snowflakeChars: ['❄', '❅', '❆', '✻', '✼']
```

### Change colors

Edit `styles.css`:
```css
.snowflake {
  color: white;  /* Change to any color */
  text-shadow: 0 0 3px rgba(255, 255, 255, 0.8);  /* Glow effect */
}
```

## Performance

- **Max particles:** 30 (desktop), 15 (mobile)
- **CPU usage:** ~1-2%
- **Memory:** ~2-3MB
- **Compatible:** All modern browsers

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## License

MIT License - Free to use and modify

## Credits

Created by Valalah Team  
Version 1.0.0
