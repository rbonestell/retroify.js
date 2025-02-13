# Retroify.js

Add instant retro 8-bit styling to any website with a single line of JavaScript. Retroify.js transforms your modern web elements into a nostalgic, pixel-perfect interface inspired by classic video games.

![NPM Version](https://img.shields.io/npm/v/retroify.js)
![License](https://img.shields.io/github/license/rbonestell/retroify.js)

## Features

- 🎮 8-bit pixel-perfect styling
- 🖼️ Pixelated image rendering
- 📝 Retro typography using "Press Start 2P" font
- 🔲 Pixel-perfect buttons and form elements
- 📺 Optional CRT scanline effect
- 🎨 Customizable shadow colors
- ♿ Accessibility-friendly
- 📱 Responsive design
- 🔄 Easy to implement and remove
- 🌐 Wide browser support

## Installation

### CDN (Recommended)
```html
<script src="https://cdn.jsdelivr.net/npm/retroify.js@0.1.0/retroify.min.js"></script>
```

### NPM
```bash
npm install retroify.js
```

## Quick Start

1. Add the script to your HTML:
```html
<script src="path/to/retroify.js"></script>
```

2. Apply retro styling to your entire page:
```javascript
retroify.apply();
```

Or target specific elements:
```javascript
retroify.apply('#game-container');
```

## API Reference

### Methods

#### `retroify.apply([target])`
Apply retro styling to the page or a specific element.
- `target` (optional): CSS selector or HTMLElement
- Returns: Retroify instance

```javascript
// Apply to entire page
retroify.apply();

// Apply to specific element
retroify.apply('#game-section');
```

#### `retroify.remove([target])`
Remove retro styling.
- `target` (optional): CSS selector or HTMLElement
- Returns: Retroify instance

```javascript
retroify.remove();
```

#### `retroify.toggle()`
Toggle retro styling and scanlines on/off.
- Returns: Retroify instance

```javascript
retroify.toggle();
```

#### `retroify.toggleScanlines([enable])`
Toggle CRT scanline effect.
- `enable` (optional): Boolean to force state
- Returns: Retroify instance

```javascript
// Toggle scanlines
retroify.toggleScanlines();

// Force enable
retroify.toggleScanlines(true);
```

#### `retroify.destroy()`
Clean up and remove all Retroify modifications.
- Returns: Retroify instance

```javascript
retroify.destroy();
```

### CSS Custom Properties

Customize the appearance using CSS variables:

```css
.retroify {
  --retroify-shadow-color: 0 0 0;  /* RGB values for shadows */
  --retroify-shadow-opacity: 0.3;  /* Shadow opacity (0-1) */
}
```

### Events

Retroify dispatches custom events:

- `retroify:applied` - Fired when styles are applied
- `retroify:removed` - Fired when styles are removed

```javascript
window.addEventListener('retroify:applied', (e) => {
  console.log('Retroify applied to:', e.detail.target);
});
```

## Examples

### Basic Implementation
```html
<!DOCTYPE html>
<html>
<head>
    <title>Retroify Example</title>
    <script src="path/to/retroify.js"></script>
</head>
<body>
    <div id="game">
        <h1>My Retro Game</h1>
        <button>Start Game</button>
    </div>
    
    <script>
        retroify.apply('#game');
    </script>
</body>
</html>
```

### Interactive Toggle
```javascript
const toggleButton = document.querySelector('#retro-toggle');
toggleButton.addEventListener('click', () => {
    retroify.toggle();
});
```

## Browser Support

- Chrome 49+
- Firefox 44+
- Safari 9.1+
- Edge 16+
- Opera 36+

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details.
