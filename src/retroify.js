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
        .retroify {
            ${features.imageRendering}: pixelated;
            ${features.imageRendering}: -moz-crisp-edges;
            ${features.imageRendering}: crisp-edges;
            font-family: 'Press Start 2P' !important;
            font-size: 0.75em;
            --retroify-shadow-opacity: 0.3;
        }

        /* Reset FontAwesome icons to prevent retroify styling from affecting them */
        .retroify i.fa,
        .retroify i.fab {
            font-size: 2em !important;
            transform: initial !important;
            text-shadow: initial !important;
            box-shadow: initial !important;
            filter: initial !important;
        }

        .retroify h1 { font-size: 2.5em; }
        .retroify h2 { font-size: 1.25em; }
        .retroify h3 { font-size: 1em; }
        .retroify h4 { font-size: 0.8em; }
        .retroify h5 { font-size: 0.6em; }
        .retroify h6 { font-size: 0.4em; }

        .retroify img {
            box-shadow: 8px 8px 0 rgb(var(--retroify-shadow-color, 0 0 0) / var(--retroify-shadow-opacity, 0.3));
            image-rendering: pixelated;
            filter: contrast(150%) brightness(110%);
            border-radius: 0 !important;
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
            border-top-left-radius: 0 !important;
            border-top-right-radius: 0 !important;
        }

        /* Base button styles */
        .retroify a,
        .retroify button,
        .retroify input[type="button"],
        .retroify input[type="submit"],
        .retroify .btn {
            position: relative !important;
            top: 0 !important;
            left: 0 !important;
            transform: scale(1) !important;
            transition: all 0.1s ease !important;
            border-radius: 0 !important;
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
            border-top-left-radius: 0 !important;
            border-top-right-radius: 0 !important;
            padding: 12px !important;
            border-width: 2px !important;
            border-style: solid !important;
            box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.3) !important;
            font-size: 0.9em !important;
        }

        /* Hover states for buttons */
        .retroify a:hover,
        .retroify button:hover,
        .retroify input[type="button"]:hover,
        .retroify input[type="submit"]:hover,
        .retroify .btn:hover {
            top: -2px !important;
            left: -2px !important;
            cursor: pointer !important;
            box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.3) !important;
        }

        /* Active states for buttons */
        .retroify a:active,
        .retroify button:active,
        .retroify input[type="button"]:active,
        .retroify input[type="submit"]:active,
        .retroify .btn:active {
            top: 4px !important;
            left: 4px !important;
            box-shadow: 0px 0px 0 !important;
        }

        .retroify h1,
        .retroify h2,
        .retroify h3 {
            text-shadow: 2px 2px 0 rgb(var(--retroify-shadow-color, 0 0 0) / var(--retroify-shadow-opacity, 0.3));
        }

        .retroify h4,
        .retroify h5,
        .retroify h6 {
            text-shadow: 1px 1px 0 rgb(var(--retroify-shadow-color, 0 0 0) / var(--retroify-shadow-opacity, 0.3));
        }

        .retroify p {
            line-height: 1.6;
            margin-bottom: 1.5em;
        }

        .retroify input[type="text"],
        .retroify input[type="email"],
        .retroify input[type="password"],
        .retroify textarea {
            border: 2px solid currentColor !important;
            border-radius: 0 !important;
            box-shadow: 4px 4px 0 rgb(var(--retroify-shadow-color, 0 0 0) / var(--retroify-shadow-opacity, 0.3));
            padding: 8px !important;
        }

        .retroify select {
            border: 2px solid currentColor !important;
            border-radius: 0 !important;
            box-shadow: 4px 4px 0 rgb(var(--retroify-shadow-color, 0 0 0) / var(--retroify-shadow-opacity, 0.3));
            padding: 8px !important;
        }

        .retroify .card,
        .retroify .alert,
        .retroify .modal-content {
            border-radius: 0 !important;
            box-shadow: 8px 8px 0 rgb(var(--retroify-shadow-color, 0 0 0) / var(--retroify-shadow-opacity, 0.3));
            border: 2px solid currentColor !important;
        }

        .retroify hr {
            border: none;
            border-bottom: 4px dashed currentColor;
            margin: 2em 0;
        }

        .retroify table {
            border-collapse: separate;
            border-spacing: 0;
            border: 2px solid currentColor;
            box-shadow: 4px 4px 0 rgb(var(--retroify-shadow-color, 0 0 0) / var(--retroify-shadow-opacity, 0.3));
        }

        .retroify th ,
        .retroify td {
            border: 1px solid currentColor;
            padding: 8px;
        }

        .retroify code,
        .retroify pre {
            font-family: 'Press Start 2P', monospace;
            font-size: 0.8em;
        }

        .retroify-scanlines::before {
            content: "";
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
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

        .retroify .floating {
            animation: retroify-float 2s ease-in-out infinite;
        }

        .retroify .blink {
            animation: retroify-blink 1s step-end infinite;
        }

        @keyframes retroify-blink {
            50% { opacity: 0; }
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
            .retroify .floating {
                animation: none !important;
            }
            
            .retroify button,
            .retroify .btn {
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
         * Inject required font and styles into the document
         * @private
         */
        _injectDependencies: function() {
            // Add Google Font
            if (!document.querySelector('link[href*="Press+Start+2P"]')) {
                const fontLink = document.createElement('link');
                fontLink.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
                fontLink.rel = 'stylesheet';
                document.head.appendChild(fontLink);
            }

            // Add styles
            if (!document.querySelector('style[data-retroify]')) {
                const styleSheet = document.createElement('style');
                styleSheet.setAttribute('data-retroify', '');
                styleSheet.textContent = STYLES;
                document.head.appendChild(styleSheet);
            }
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
                this._injectDependencies();

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

                try {
                    const elements = [
                        rootElement,
                        ...rootElement.querySelectorAll(selectors.join(','))
                    ];

                    elements.forEach(element => {
                        if (element && element instanceof HTMLElement) {
                            element.classList.add('retroify');
                            // Add ARIA attributes
                            if (element.tagName.toLowerCase() === 'button') {
                                element.setAttribute('aria-pressed', 'false');
                            }
                        }
                    });
                    
                    // Dispatch custom event
                    window.dispatchEvent(new CustomEvent('retroify:applied', {
                        detail: { target: rootElement }
                    }));
                } catch (e) {
                    console.error('Retroify: Error applying styles:', e);
                }

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

                rootElement.classList.remove('retroify');
                
                rootElement.querySelectorAll('.retroify').forEach(element => {
                    element.classList.remove('retroify');
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
            if (document.body.classList.contains('retroify')) {
                this.remove(document.body);
            } else {
                this.apply(document.body);
            }

            this.toggleScanlines();

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