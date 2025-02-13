/**
 * 8bitify - A library to apply retro 8-bit styling to web pages
 * @version 1.0.0
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
        .eight-bit {
            ${features.imageRendering}: pixelated;
            ${features.imageRendering}: -moz-crisp-edges;
            ${features.imageRendering}: crisp-edges;
            font-family: 'Press Start 2P' !important;
            font-size: 0.75em;
            --eight-bit-shadow-opacity: 0.3;
        }

        /* Reset FontAwesome icons to prevent eight-bit styling from affecting them */
        .eight-bit i.fa,
        .eight-bit i.fab {
            font-size: 2em !important;
            transform: initial !important;
            text-shadow: initial !important;
            box-shadow: initial !important;
            filter: initial !important;
        }

        .eight-bit h1 { font-size: 2.5em; }
        .eight-bit h2 { font-size: 1.25em; }
        .eight-bit h3 { font-size: 1em; }
        .eight-bit h4 { font-size: 0.8em; }
        .eight-bit h5 { font-size: 0.6em; }
        .eight-bit h6 { font-size: 0.4em; }

        .eight-bit img {
            box-shadow: 8px 8px 0 rgb(var(--eight-bit-shadow-color, 0 0 0) / var(--eight-bit-shadow-opacity, 0.3));
            image-rendering: pixelated;
            filter: contrast(150%) brightness(110%);
            border-radius: 0 !important;
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
            border-top-left-radius: 0 !important;
            border-top-right-radius: 0 !important;
        }

        /* Base button styles */
        .eight-bit a,
        .eight-bit button,
        .eight-bit input[type="button"],
        .eight-bit input[type="submit"],
        .eight-bit .btn {
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
        .eight-bit a:hover,
        .eight-bit button:hover,
        .eight-bit input[type="button"]:hover,
        .eight-bit input[type="submit"]:hover,
        .eight-bit .btn:hover {
            top: -2px !important;
            left: -2px !important;
            cursor: pointer !important;
            box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.3) !important;
        }

        /* Active states for buttons */
        .eight-bit a:active,
        .eight-bit button:active,
        .eight-bit input[type="button"]:active,
        .eight-bit input[type="submit"]:active,
        .eight-bit .btn:active {
            top: 4px !important;
            left: 4px !important;
            box-shadow: 0px 0px 0 !important;
        }

        .eight-bit h1,
        .eight-bit h2,
        .eight-bit h3,
        .eight-bit h4,
        .eight-bit h5,
        .eight-bit h6 {
            text-shadow: 4px 4px 0 rgb(var(--eight-bit-shadow-color, 0 0 0) / var(--eight-bit-shadow-opacity, 0.3));
        }

        .eight-bit p {
            line-height: 1.6;
            margin-bottom: 1.5em;
        }

        .eight-bit input[type="text"],
        .eight-bit input[type="email"],
        .eight-bit input[type="password"],
        .eight-bit textarea {
            border: 2px solid currentColor !important;
            border-radius: 0 !important;
            box-shadow: 4px 4px 0 rgb(var(--eight-bit-shadow-color, 0 0 0) / var(--eight-bit-shadow-opacity, 0.3));
            padding: 8px !important;
        }

        .eight-bit select {
            border: 2px solid currentColor !important;
            border-radius: 0 !important;
            box-shadow: 4px 4px 0 rgb(var(--eight-bit-shadow-color, 0 0 0) / var(--eight-bit-shadow-opacity, 0.3));
            padding: 8px !important;
        }

        .eight-bit .card,
        .eight-bit .alert,
        .eight-bit .modal-content {
            border-radius: 0 !important;
            box-shadow: 8px 8px 0 rgb(var(--eight-bit-shadow-color, 0 0 0) / var(--eight-bit-shadow-opacity, 0.3));
            border: 2px solid currentColor !important;
        }

        .eight-bit hr {
            border: none;
            border-bottom: 4px dashed currentColor;
            margin: 2em 0;
        }

        .eight-bit table {
            border-collapse: separate;
            border-spacing: 0;
            border: 2px solid currentColor;
            box-shadow: 4px 4px 0 rgb(var(--eight-bit-shadow-color, 0 0 0) / var(--eight-bit-shadow-opacity, 0.3));
        }

        .eight-bit th,
        .eight-bit td {
            border: 1px solid currentColor;
            padding: 8px;
        }

        .eight-bit code,
        .eight-bit pre {
            // padding: 4px 8px;
            font-family: 'Press Start 2P', monospace;
            font-size: 0.8em;
            // box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.5);
        }

        .eight-bit-scanlines::before {
            content: "";
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
                0deg,
                rgb(var(--eight-bit-shadow-color, 0 0 0) / 0.03),
                rgb(var(--eight-bit-shadow-color, 0 0 0) / 0.03) 2px,
                transparent 3px,
                transparent 5px
            );
            pointer-events: none;
            z-index: 9999;
            animation: eight-bit-scanline-scroll 8s linear infinite;
        }

        @keyframes eight-bit-scanline-scroll {
            0% { transform: translateY(0); }
            100% { transform: translateY(50px); }
        }

        @keyframes eight-bit-float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
            100% { transform: translateY(0); }
        }

        .eight-bit .floating {
            animation: eight-bit-float 2s ease-in-out infinite;
        }

        .eight-bit .blink {
            animation: eight-bit-blink 1s step-end infinite;
        }

        @keyframes eight-bit-blink {
            50% { opacity: 0; }
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
            .eight-bit .floating {
                animation: none !important;
            }
            
            .eight-bit button,
            .eight-bit .btn {
                transition: none !important;
            }
        }

        /* Print styles */
        @media print {
            .eight-bit-scanlines::before {
                display: none !important;
            }
            
            .eight-bit {
                font-family: system-ui, -apple-system, sans-serif !important;
            }
        }
    `;

    const EightBitify = {
        version: '1.0.0',
        isApplied: false,
        
        /**
         * Check if the environment supports 8bitify
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
                console.warn('8bitify: Browser environment not supported');
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
            if (!document.querySelector('style[data-eight-bitify]')) {
                const styleSheet = document.createElement('style');
                styleSheet.setAttribute('data-eight-bitify', '');
                styleSheet.textContent = STYLES;
                document.head.appendChild(styleSheet);
            }
        },

        /**
         * Apply 8-bit styling to the page or specific element
         * @param {HTMLElement|string} [target=document.body] - Optional target element or selector to apply styles to
         * @returns {EightBitify}
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

                // Add eight-bit class to appropriate elements
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
                            element.classList.add('eight-bit');
                            // Add ARIA attributes
                            if (element.tagName.toLowerCase() === 'button') {
                                element.setAttribute('aria-pressed', 'false');
                            }
                        }
                    });

                    this.isApplied = true;
                    
                    // Dispatch custom event
                    window.dispatchEvent(new CustomEvent('eightbitify:applied', {
                        detail: { target: rootElement }
                    }));
                } catch (e) {
                    console.error('8bitify: Error applying styles:', e);
                }

                return this;
            } catch (e) {
                console.error('8bitify:', e.message);
                return this;
            }
        },

        /**
         * Remove 8-bit styling from the page or specific element
         * @param {HTMLElement|string} [target=document.body] - Optional target element or selector to remove styles from
         * @returns {EightBitify}
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

                rootElement.classList.remove('eight-bit');
                
                rootElement.querySelectorAll('.eight-bit').forEach(element => {
                    element.classList.remove('eight-bit');
                    if (element._originalStyles) {
                        Object.assign(element.style, element._originalStyles);
                        delete element._originalStyles;
                    }
                });

                this.isApplied = false;

                // Dispatch custom event
                window.dispatchEvent(new CustomEvent('eightbitify:removed', {
                    detail: { target: rootElement }
                }));

                return this;
            } catch (e) {
                console.error('8bitify:', e.message);
                return this;
            }
        },

        /**
         * Toggle 8-bit styling on the entire page
         */
        toggle: function() {
            if (document.body.classList.contains('eight-bit')) {
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
                enable ? document.body.classList.add('eight-bit-scanlines') : document.body.classList.remove('eight-bit-scanlines');
            } else {
                document.body.classList.toggle('eight-bit-scanlines');
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
            const style = document.querySelector('style[data-eight-bitify]');
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
                console.warn('8bitify: Invalid selector syntax');
                return false;
            }
        }
    };

    // Handle script loading error for the font
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'LINK' && e.target.href.includes('Press+Start+2P')) {
            console.warn('8bitify: Failed to load Press Start 2P font. Falling back to system fonts.');
        }
    }, true);

    // Cleanup on page unload
    window.addEventListener('unload', () => {
        if (window.eightBitify) {
            window.eightBitify.destroy();
        }
    });

    // Export to window with proper safeguards
    if (typeof window.eightBitify === 'undefined') {
        Object.defineProperty(window, 'eightBitify', {
            value: Object.freeze(EightBitify),
            writable: false,
            configurable: false
        });
    }
})(typeof window !== 'undefined' ? window : this);