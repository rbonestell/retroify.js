/**
 * @jest-environment jsdom
 */

describe('Retroify', () => {
    let retroify;
    
    beforeEach(() => {
        // Clear the DOM
        document.body.innerHTML = '';
        
        // Reset head elements
        const head = document.head;
        while (head.firstChild) {
            head.removeChild(head.firstChild);
        }
        
        // Load retroify
        require('./retroify.js');
        retroify = window.retroify;
    });

	test('should inject Press Start 2P font', () => {
        const fontLink = document.querySelector('link[href*="Press+Start+2P"]');
        expect(fontLink).toBeTruthy();
        expect(fontLink.rel).toBe('stylesheet');
    });

    test('should check browser support', () => {
        expect(retroify.isSupported()).toBe(true);
    });

    test('should apply retro styles to body', () => {
        retroify.apply();
        expect(document.body.getAttribute('data-retroify')).toBe('true');
    });

    test('should apply retro styles to specific element', () => {
        const div = document.createElement('div');
        document.body.appendChild(div);
        
        retroify.apply(div);
        expect(div.getAttribute('data-retroify')).toBe('true');
    });

    test('should remove retro styles', () => {
        const div = document.createElement('div');
        document.body.appendChild(div);
        
        retroify.apply(div);
        expect(div.getAttribute('data-retroify')).toBe('true');
        
        retroify.remove(div);
        expect(div.getAttribute('data-retroify')).toBeNull();
    });

    test('should toggle scanlines', () => {
        retroify.toggleScanlines(true);
        expect(document.body.classList.contains('retroify-scanlines')).toBe(true);
        
        retroify.toggleScanlines(false);
        expect(document.body.classList.contains('retroify-scanlines')).toBe(false);
    });
});