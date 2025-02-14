/**
 * retroify.js v0.1.0
 * A library to apply retro 8-bit styling to web pages
 * https://github.com/rbonestell/retroify.js
 * 
 * @license
 * Copyright (c) 2025 Bobby Bonestell
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function(window) {
    'use strict';

    // Feature detection helper
    const features = {
        imageRendering: (function() {
            const test = document.createElement('div').style;
            if ('imageRendering' in test) return 'imageRendering';
            if ('webkitImageRendering' in test) return 'webkitImageRendering';
            if ('mozImageRendering' in test) return 'mozImageRendering';
            if ('msImageRendering' in test) return 'msImageRendering';
            return 'imageRendering';
        })()
    };

    const STYLES = `
        /* Add a data attribute for higher specificity without !important */
        [data-retroify="true"] {
            ${features.imageRendering}: pixelated;
            ${features.imageRendering}: -moz-crisp-edges;
            ${features.imageRendering}: crisp-edges;
            font-family: 'Press Start 2P';
            font-size: 0.8em;
            --retroify-shadow-opacity: 0.3;
        }
        
        /* Preserve Tailwind's font-size utilities while maintaining retro font */
        [data-retroify="true"] *:not(i[class*="fa"],i[class*="fa"]) {  font-family: 'Press Start 2P'; }
        
        /* Reset FontAwesome icons */
        [data-retroify="true"] i.fa,
        [data-retroify="true"] i.fab {
            font-size: 2em;
            transform: none;
            text-shadow: none;
            box-shadow: none;
            filter: none;
        }
        
        /* Heading styles */
        [data-retroify="true"] h1 { 
            font-size: 2.5em;
            text-shadow: 2px 2px 0 rgb(var(--retroify-shadow-color, 0 0 0) / var(--retroify-shadow-opacity, 0.3));
        }
        [data-retroify="true"] h2 {
            font-size: 1.25em;
            text-shadow: 2px 2px 0 rgb(var(--retroify-shadow-color, 0 0 0) / var(--retroify-shadow-opacity, 0.3));
        }
        [data-retroify="true"] h3 {
            font-size: 1em;
            text-shadow: 2px 2px 0 rgb(var(--retroify-shadow-color, 0 0 0) / var(--retroify-shadow-opacity, 0.3));
        }
        [data-retroify="true"] h4 {
            font-size: 0.8em;
            text-shadow: 1px 1px 0 rgb(var(--retroify-shadow-color, 0 0 0) / var(--retroify-shadow-opacity, 0.3));
        }
        [data-retroify="true"] h5 {
            font-size: 0.6em;
            text-shadow: 1px 1px 0 rgb(var(--retroify-shadow-color, 0 0 0) / var(--retroify-shadow-opacity, 0.3));
        }
        [data-retroify="true"] h6 {
            font-size: 0.4em;
            text-shadow: 1px 1px 0 rgb(var(--retroify-shadow-color, 0 0 0) / var(--retroify-shadow-opacity, 0.3));
        }
        
        /* Image styles */
        [data-retroify="true"] img {
            box-shadow: 8px 8px 0 rgb(var(--retroify-shadow-color, 0 0 0) / var(--retroify-shadow-opacity, 0.3));
            image-rendering: pixelated;
            filter: contrast(150%) brightness(110%);
            border-radius: 0;
        }
        
        /* Button styles */
        [data-retroify="true"] a,
        [data-retroify="true"] button,
        [data-retroify="true"] input[type="button"],
        [data-retroify="true"] input[type="submit"],
        [data-retroify="true"] .btn {
            position: relative;
            top: 0;
            left: 0;
            transform: scale(1);
            transition: all 0.1s ease;
            border-radius: 0;
            padding: 12px;
            border-width: 2px;
            border-style: solid;
            box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.3);
            font-size: 0.9em;
        }
        
        /* Hover states for buttons */
        [data-retroify="true"] a:hover,
        [data-retroify="true"] button:hover,
        [data-retroify="true"] input[type="button"]:hover,
        [data-retroify="true"] input[type="submit"]:hover,
        [data-retroify="true"] .btn:hover {
            top: -2px;
            left: -2px;
            cursor: pointer;
            box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.3);
        }

        /* Active states for buttons */
        [data-retroify="true"] a:active,
        [data-retroify="true"] button:active,
        [data-retroify="true"] input[type="button"]:active,
        [data-retroify="true"] input[type="submit"]:active,
        [data-retroify="true"] .btn:active {
            top: 4px !important;
            left: 4px !important;
            box-shadow: 0px 0px 0 !important;
        }

        [data-retroify="true"] p {
            line-height: 1.6;
            margin-bottom: 1.5em;
        }

        [data-retroify="true"] input[type="text"],
        [data-retroify="true"] input[type="email"],
        [data-retroify="true"] input[type="password"],
        [data-retroify="true"] textarea {
            border: 2px solid currentColor !important;
            border-radius: 0 !important;
            box-shadow: 4px 4px 0 rgb(var(--retroify-shadow-color, 0 0 0) / var(--retroify-shadow-opacity, 0.3));
            padding: 8px !important;
        }

        [data-retroify="true"] select {
            border: 2px solid currentColor !important;
            border-radius: 0 !important;
            box-shadow: 4px 4px 0 rgb(var(--retroify-shadow-color, 0 0 0) / var(--retroify-shadow-opacity, 0.3));
            padding: 8px !important;
        }

        [data-retroify="true"] .card,
        [data-retroify="true"] .alert,
        [data-retroify="true"] .modal-content {
            border-radius: 0 !important;
            box-shadow: 8px 8px 0 rgb(var(--retroify-shadow-color, 0 0 0) / var(--retroify-shadow-opacity, 0.3));
            border: 2px solid currentColor !important;
        }

        [data-retroify="true"] hr {
            border: none;
            border-bottom: 4px dashed currentColor;
            margin: 2em 0;
        }

        [data-retroify="true"] table {
            border-collapse: separate;
            border-spacing: 0;
            border: 2px solid currentColor;
            box-shadow: 4px 4px 0 rgb(var(--retroify-shadow-color, 0 0 0) / var(--retroify-shadow-opacity, 0.3));
        }

        [data-retroify="true"] th {
            border: 1px solid currentColor;
            padding: 8px;
            text-shadow: 1px 1px 0 rgb(var(--retroify-shadow-color, 0 0 0) / var(--retroify-shadow-opacity, 0.3));
        }
        [data-retroify="true"] td {
            border: 1px solid currentColor;
            padding: 8px;
        }

        [data-retroify="true"] code,
        [data-retroify="true"] pre {
            font-family: 'Press Start 2P', monospace;
            font-size: 0.8em;
        }

        .retroify-scanlines::before {
            content: "";
            position: fixed;
            top: -50px;
            left: 0;
            width: 100%;
            height: calc(100% + 50px);
            background: repeating-linear-gradient(
                0deg,
                rgb(var(--retroify-shadow-color, 0 0 0) / 0.03),
                rgb(var(--retroify-shadow-color, 0 0 0) / 0.03) 2px,
                transparent 3px,
                transparent 5px
            );
            pointer-events: none;
            z-index: 9999;
            animation: retroify-scanline-scroll 8s linear infinite;
        }

        @keyframes retroify-scanline-scroll {
            0% { transform: translateY(0); }
            100% { transform: translateY(50px); }
        }

        @keyframes retroify-float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
            100% { transform: translateY(0); }
        }

        [data-retroify="true"] .floating {
            animation: retroify-float 2s ease-in-out infinite;
        }

        [data-retroify="true"] .blink {
            animation: retroify-blink 1s step-end infinite;
        }

        @keyframes retroify-blink {
            50% { opacity: 0; }
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
            [data-retroify="true"] .floating {
                animation: none !important;
            }
            
            [data-retroify="true"] button,
            [data-retroify="true"] .btn {
                transition: none !important;
            }
        }

        /* Print styles */
        @media print {
            .retroify-scanlines::before {
                display: none !important;
            }
        }
    `;

    // Add styles
    if (!document.querySelector('style[data-retroify]')) {
        const styleSheet = document.createElement('style');
        styleSheet.setAttribute('data-retroify', '');
        styleSheet.textContent = STYLES;
        document.head.appendChild(styleSheet);
    }

    // Add Google Font
    if (!document.querySelector('link[href*="Press+Start+2P"]')) {
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
    }

    const Retroify = {
        version: '0.1.0',
        isApplied: false,
        
        /**
         * Check if the environment supports Retroify
         * @returns {boolean}
         */
        isSupported: function() {
            return (
                typeof window !== 'undefined' &&
                typeof document !== 'undefined' &&
                'querySelector' in document &&
                'classList' in document.documentElement
            );
        },

        /**
         * Initialize the library
         * @private
         */
        _init: function() {
            if (!this.isSupported()) {
                console.warn('Retroify: Browser environment not supported');
                return false;
            }
            return true;
        },

        /**
         * Apply Retro 8-bit styling to the page or specific element
         * @param {HTMLElement|string} [target=document.body] - Optional target element or selector to apply styles to
         * @returns {Retroify}
         * @throws {Error} If the target is invalid or not found
         */
        apply: function(target) {
            if (!this._init()) return this;

            try {
                const rootElement = target 
                    ? (typeof target === 'string' ? document.querySelector(target) : target)
                    : document.body;

                if (!rootElement) {
                    throw new Error('Target element not found');
                }

                if (!(rootElement instanceof HTMLElement)) {
                    throw new Error('Invalid target type. Expected HTMLElement or string selector');
                }

                // Store original styles for proper cleanup
                if (!rootElement._originalStyles) {
                    rootElement._originalStyles = {
                        borderRadius: rootElement.style.borderRadius,
                        fontFamily: rootElement.style.fontFamily
                    };
                }
                
                // Add retroify class to appropriate elements
                const selectors = [
                    'img',
                    'button',
                    'input[type="button"]',
                    'input[type="submit"]',
                    '.btn',
                    'h1, h2, h3, h4, h5, h6',
                    'p',
                    'input[type="text"]',
                    'input[type="email"]',
                    'input[type="password"]',
                    'textarea',
                    'select',
                    '.card',
                    '.alert',
                    '.modal-content',
                    'hr',
                    'table',
                    'th',
                    'td',
                    'code',
                    'pre',
                    'ul',
                    'ol',
                    'li',
                    'blockquote'
                ];

                // Use data attribute instead of class for better specificity
                rootElement.setAttribute('data-retroify', 'true');

                // Add ARIA attributes where needed
                rootElement.querySelectorAll(selectors).forEach(element => {

                    // Use data attribute instead of class for better specificity
                    element.setAttribute('data-retroify', 'true');

                    // Add ARIA attributes
                    if (element.tagName.toLowerCase() === 'button') {
                        element.setAttribute('aria-pressed', 'false');
                    }
                });
                
                // Dispatch custom event
                window.dispatchEvent(new CustomEvent('retroify:applied', {
                    detail: { target: rootElement }
                }));

                return this;
            } catch (e) {
                console.error('Retroify:', e.message);
                return this;
            }
        },

        /**
         * Remove 8-bit styling from the page or specific element
         * @param {HTMLElement|string} [target=document.body] - Optional target element or selector to remove styles from
         * @returns {Retroify}
         */
        remove: function(target) {
            if (!this._init()) return this;

            try {
                const rootElement = target 
                    ? (typeof target === 'string' ? document.querySelector(target) : target)
                    : document.body;

                if (!rootElement) {
                    throw new Error('Target element not found');
                }

                // Restore original styles if they exist
                if (rootElement._originalStyles) {
                    Object.assign(rootElement.style, rootElement._originalStyles);
                    delete rootElement._originalStyles;
                }

                // Remove data attribute
                rootElement.removeAttribute('data-retroify');
                
                // Remove data attributes from child elements
                rootElement.querySelectorAll('[data-retroify]').forEach(element => {
                    element.removeAttribute('data-retroify');
                    if (element._originalStyles) {
                        Object.assign(element.style, element._originalStyles);
                        delete element._originalStyles;
                    }
                });

                // Dispatch custom event
                window.dispatchEvent(new CustomEvent('retroify:removed', {
                    detail: { target: rootElement }
                }));

                return this;
            } catch (e) {
                console.error('Retroify:', e.message);
                return this;
            }
        },

        /**
         * Toggle 8-bit styling on the entire page
         */
        toggle: function() {
            if (document.body.hasAttribute('data-retroify')) {
                this.toggleScanlines(false);
                this.remove(document.body);
            } else {
                this.toggleScanlines(true);
                this.apply(document.body);
            }

            return this;
        },

        /**
         * Toggle scanlines effect on the page
         * @param {boolean} [enable] - Force enable/disable scanlines. If not provided, toggles current state
         */
        toggleScanlines: function(enable) {            
            if (typeof enable === 'boolean') {
                enable ? document.body.classList.add('retroify-scanlines') : document.body.classList.remove('retroify-scanlines');
            } else {
                document.body.classList.toggle('retroify-scanlines');
            }
            
            return this;
        },

        /**
         * Clean up references and restore original styles
         */
        destroy: function() {
            // Remove all applied styles
            this.remove();

            // Toggle scan lines off
            this.toggleScanlines(false);
            
            // Remove injected stylesheet
            const style = document.querySelector('style[data-retroify]');
            if (style) {
                style.remove();
            }
            
            return this;
        },

        /**
         * Validate CSS selector syntax
         * @param {string} selector - The selector to validate
         * @returns {boolean} - True if the selector is valid, false otherwise
         */
        _validateSelector: function(selector) {
            try {
                document.querySelector(selector);
                return true;
            } catch (e) {
                console.warn('Retroify: Invalid selector syntax');
                return false;
            }
        }
    };

    // Handle script loading error for the font
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'LINK' && e.target.href.includes('Press+Start+2P')) {
            console.warn('Retroify: Failed to load Press Start 2P font. Falling back to system fonts.');
        }
    }, true);

    // Cleanup on page unload
    window.addEventListener('unload', () => {
        if (window.retroify) {
            window.retroify.destroy();
        }
    });

    // Export to window with proper safeguards
    if (typeof window.retroify === 'undefined') {
        Object.defineProperty(window, 'retroify', {
            value: Object.freeze(Retroify),
            writable: false,
            configurable: false
        });
    }
})(typeof window !== 'undefined' ? window : this);