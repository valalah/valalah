# 🥚 Easter Eggs Theme

Colorful falling eggs that crack when clicked, with chocolate crunch sound effects. Perfect for Easter celebrations!

## Features

- 🥚 Interactive falling eggs (clickable)
- 🍫 Chocolate piece explosion on click
- 🔊 Satisfying crunch sound effect
- 📱 Mobile optimized
- ⚡ Performance optimized (<20 particles max)

## Audio File

This theme requires an audio file: `audio.wav`

You can create your own chocolate crunch sound or use a royalty-free sound from:
- Freesound.org
- Zapsplat.com

**Recommended specs:**
- Format: WAV or MP3
- Duration: 0.5-1 second
- Size: <50KB
- Sample rate: 44.1kHz

## Customization

### Change egg click reward

Edit `effects.js`:
```javascript
function createChocolatePieces(x, y) {
  const pieceCount = 5 + Math.floor(Math.random() * 3); // 5-8 pieces
  // ...
}
```

### Disable audio

Edit `effects.js`:
```javascript
const config = {
  audioEnabled: false  // Set to false
};
```

### Change egg characters

Edit `effects.js`:
```javascript
eggChars: ['🥚', '🐣', '🐤']  // Add more emoji
```

## Browser Support

- ✅ Chrome 90+ (with audio)
- ✅ Firefox 88+ (with audio)
- ✅ Safari 14+ (requires user interaction for audio)
- ✅ Edge 90+ (with audio)

## License

MIT License - Free to use and modify

## Credits

Created by Valalah Team  
Version 1.0.0
