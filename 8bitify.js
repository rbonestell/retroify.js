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
            return null;
        })()
    };

    const STYLES = `
        .eight-bit {
            ${features.imageRendering ? `
            ${features.imageRendering}: pixelated;
            ${features.imageRendering}: -moz-crisp-edges;
            ${features.imageRendering}: crisp-edges;` : ''}
            font-family: 'Press Start 2P', system-ui, -apple-system, sans-serif;
            --eight-bit-shadow-opacity: 0.3;
        }

        .eight-bit img {
            box-shadow: 8px 8px 0 rgb(var(--eight-bit-shadow-color, 0 0 0) / var(--eight-bit-shadow-opacity, 0.3));
            transform: scale(0.95);
            image-rendering: pixelated;
            filter: contrast(150%) brightness(110%);
            border-radius: 0 !important;
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
            border-top-left-radius: 0 !important;
            border-top-right-radius: 0 !important;
        }

        /* Base button styles */
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
            padding: 12px !important;
            border-width: 2px !important;
            border-style: solid !important;
            box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.3) !important;
        }

        /* Hover states for buttons */
        .eight-bit .btn:hover {
            top: -2px !important;
            left: -2px !important;
            cursor: pointer !important;
            box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.3) !important;
        }

        /* Active states for buttons */
        .eight-bit .btn:active {
            top: 4px !important;
            left: 4px !important;
            box-shadow: 0px 0px 0 !important;
        }

        // /* Regular button styles (non-Bootstrap) */
        // .eight-bit button:not(.btn),
        // .eight-bit input[type="button"]:not(.btn),
        // .eight-bit input[type="submit"]:not(.btn) {
        //     box-shadow: 4px 4px 0 currentColor !important;
        //     border: 2px solid currentColor !important;
        // }

        // .eight-bit button:not(.btn):hover,
        // .eight-bit input[type="button"]:not(.btn):hover,
        // .eight-bit input[type="submit"]:not(.btn):hover {
        //     box-shadow: 6px 6px 0 currentColor !important;
        //     top: -2px !important;
        //     left: -2px !important;
        // }

        // .eight-bit button:not(.btn):active,
        // .eight-bit input[type="button"]:not(.btn):active,
        // .eight-bit input[type="submit"]:not(.btn):active {
        //     box-shadow: 0 0 0 transparent !important;
        //     top: 4px !important;
        //     left: 4px !important;
        // }

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
                rgb(var(--eight-bit-shadow-color, 0 0 0) / 0.1),
                rgb(var(--eight-bit-shadow-color, 0 0 0) / 0.1) 1px,
                transparent 1px,
                transparent 2px
            );
            pointer-events: none;
            z-index: 9999;
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
        elements: new WeakSet(), // Track enhanced elements for cleanup
        
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
                            // Track enhanced elements
                            this.elements.add(element);
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

                if (rootElement === document.body) {
                    this.toggleScanlines(false);
                }

                // Restore original styles if they exist
                if (rootElement._originalStyles) {
                    Object.assign(rootElement.style, rootElement._originalStyles);
                    delete rootElement._originalStyles;
                }

                rootElement.classList.remove('eight-bit');
                rootElement.classList.remove('eight-bit-scanlines');
                
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
         * Toggle 8-bit styling on the page or specific element
         * @param {HTMLElement|string} [target=document.body] - Optional target element or selector to toggle styles on
         */
        toggle: function(target) {
            if (typeof target === 'string' && !this._validateSelector(target)) {
                return this;
            }

            const rootElement = target 
                ? (typeof target === 'string' ? document.querySelector(target) : target)
                : document.body;

            if (target && !(typeof target === 'string' || target instanceof HTMLElement)) {
                console.warn('8bitify: Invalid target type. Expected HTMLElement or string selector');
                return this;
            }

            if (!rootElement) {
                console.warn('8bitify: Target element not found');
                return;
            }

            if (rootElement.classList.contains('eight-bit')) {
                this.remove(rootElement);
            } else {
                this.apply(rootElement);
            }

            return this;
        },

        /**
         * Toggle scanlines effect on the page
         * @param {boolean} [enable] - Force enable/disable scanlines. If not provided, toggles current state
         */
        toggleScanlines: function(enable) {
            const body = document.body;
            const hasClass = body.classList.contains('eight-bit-scanlines');
            
            if (typeof enable === 'boolean') {
                enable && !hasClass ? body.classList.add('eight-bit-scanlines') : body.classList.remove('eight-bit-scanlines');
            } else {
                body.classList.toggle('eight-bit-scanlines');
            }
            
            return this;
        },

        /**
         * Clean up references and restore original styles
         */
        destroy: function() {
            // Remove all applied styles
            this.remove();
            
            // Remove injected stylesheet
            const style = document.querySelector('style[data-eight-bitify]');
            if (style) {
                style.remove();
            }

            // Clear element references
            this.elements = new WeakSet();
            
            return this;
        },

        /**
         * Announce a message to screen readers
         * @private
         */
        _announceToScreenReader: function(message) {
            let announce = document.getElementById('eight-bitify-announce');
            if (!announce) {
                announce = document.createElement('div');
                announce.id = 'eight-bitify-announce';
                announce.setAttribute('role', 'status');
                announce.setAttribute('aria-live', 'polite');
                announce.style.position = 'absolute';
                announce.style.width = '1px';
                announce.style.height = '1px';
                announce.style.padding = '0';
                announce.style.margin = '-1px';
                announce.style.overflow = 'hidden';
                announce.style.clip = 'rect(0, 0, 0, 0)';
                announce.style.whiteSpace = 'nowrap';
                announce.style.border = '0';
                document.body.appendChild(announce);
            }
            announce.textContent = message;
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