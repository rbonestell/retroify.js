/**
 * @jest-environment jsdom
 */

describe('Retroify', () => {
    let retroify;
    let originalMatchMedia;
    let originalQuerySelector;
    
    // Save original window methods before all tests
    beforeAll(() => {
        originalMatchMedia = window.matchMedia;
        originalQuerySelector = document.querySelector;
    });

    // Restore original window methods after all tests
    afterAll(() => {
        window.matchMedia = originalMatchMedia;
        document.querySelector = originalQuerySelector;
    });
    
    beforeEach(() => {
        // Clear module cache to ensure fresh instance
        jest.resetModules();
        
        // Clear the DOM
        document.body.innerHTML = '';
        
        // Reset head elements
        const head = document.head;
        while (head.firstChild) {
            head.removeChild(head.firstChild);
        }
        
        // Reset window event listeners
        window.removeAllListeners && window.removeAllListeners();
         
        // Reset any mocks
        jest.clearAllMocks();
        
        // Reset matchMedia
        window.matchMedia = originalMatchMedia;
        
        // Load fresh instance of retroify
        require('./retroify.js');
        retroify = window.retroify;
    });

    afterEach(() => {
        // Clean up the DOM
        document.body.innerHTML = '';
        
        // Reset head elements
        const head = document.head;
        while (head.firstChild) {
            head.removeChild(head.firstChild);
        }
        
        // Remove retroify from the window object
		delete window.retroify;
		retroify = null;
		
        
        // Clean up any remaining event listeners
        window.removeAllListeners && window.removeAllListeners();
        
        // Restore original methods if they were modified in the test
        document.querySelector = originalQuerySelector;
        
        // Clear any remaining mocks
        jest.clearAllMocks();
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

    test('should handle invalid target element gracefully', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        retroify.apply('#nonexistent-element');
        expect(consoleSpy).toHaveBeenCalledWith('Retroify:', 'Target element not found');
        consoleSpy.mockRestore();
    });

    test('should handle invalid selector syntax', () => {
        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        expect(retroify._validateSelector('invalid]selector')).toBe(false);
        expect(consoleSpy).toHaveBeenCalledWith('Retroify: Invalid selector syntax');
        consoleSpy.mockRestore();
    });

    test('should preserve original styles when applying and removing', () => {
        const div = document.createElement('div');
        div.style.borderRadius = '5px';
        div.style.fontFamily = 'Arial';
        document.body.appendChild(div);

        retroify.apply(div);
        retroify.remove(div);

        expect(div.style.borderRadius).toBe('5px');
        expect(div.style.fontFamily).toBe('Arial');
    });

    test('should toggle retro styling correctly', () => {
        retroify.apply();
        expect(document.body.hasAttribute('data-retroify')).toBe(true);
        expect(document.body.classList.contains('retroify-scanlines')).toBe(true);

        retroify.toggle();
        expect(document.body.hasAttribute('data-retroify')).toBe(false);
        expect(document.body.classList.contains('retroify-scanlines')).toBe(false);
    });

    test('should handle font loading error gracefully', () => {
        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const errorEvent = new ErrorEvent('error');
        const linkElement = document.querySelector('link[href*="Press+Start+2P"]');
        
        linkElement.dispatchEvent(errorEvent);
        
        expect(consoleSpy).toHaveBeenCalledWith('Retroify: Failed to load Press Start 2P font. Falling back to system fonts.');
        consoleSpy.mockRestore();
    });

    test('should add ARIA attributes to buttons', () => {
        const button = document.createElement('button');
        document.body.appendChild(button);
        
        retroify.apply(document.body);
        expect(button.getAttribute('aria-pressed')).toBe('false');
    });

    test('should properly clean up on destroy', () => {
        retroify.apply();
        retroify.toggleScanlines(true);
        
        retroify.destroy();
        
        expect(document.body.hasAttribute('data-retroify')).toBe(false);
        expect(document.body.classList.contains('retroify-scanlines')).toBe(false);
        expect(document.querySelector('style[data-retroify]')).toBeNull();
    });

    test('should dispatch custom events', () => {
        const appliedHandler = jest.fn();
        const removedHandler = jest.fn();
        
        window.addEventListener('retroify:applied', appliedHandler);
        window.addEventListener('retroify:removed', removedHandler);
        
        retroify.apply();
        expect(appliedHandler).toHaveBeenCalled();
        
        retroify.remove();
        expect(removedHandler).toHaveBeenCalled();
        
        window.removeEventListener('retroify:applied', appliedHandler);
        window.removeEventListener('retroify:removed', removedHandler);
    });

    test('should prevent modification of the Retroify object', () => {
        expect(() => {
            window.retroify = {};
        }).toThrow();

        expect(() => {
            window.retroify.newProperty = 'test';
        }).toThrow();
    });

    test('should handle multiple apply/remove calls gracefully', () => {
        const div = document.createElement('div');
        document.body.appendChild(div);

        // Multiple applies should work
        retroify.apply(div);
        retroify.apply(div);
        expect(div.getAttribute('data-retroify')).toBe('true');

        // Multiple removes should work
        retroify.remove(div);
        retroify.remove(div);
        expect(div.getAttribute('data-retroify')).toBeNull();
    });

    test('should toggle scanlines without parameter', () => {
        retroify.toggleScanlines(true); // First toggle
        expect(document.body.classList.contains('retroify-scanlines')).toBe(true);
        
        retroify.toggleScanlines(); // Second toggle
        expect(document.body.classList.contains('retroify-scanlines')).toBe(false);
    });

    test('should handle non-HTMLElement targets', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        retroify.apply({});
        expect(consoleSpy).toHaveBeenCalledWith('Retroify:', 'Invalid target type. Expected HTMLElement or string selector');
        consoleSpy.mockRestore();
    });

    test('should apply styles to form elements', () => {
        const form = document.createElement('form');
        const input = document.createElement('input');
        const textarea = document.createElement('textarea');
        const select = document.createElement('select');
        
        form.appendChild(input);
        form.appendChild(textarea);
        form.appendChild(select);
        document.body.appendChild(form);
        
        retroify.apply(form);
        
        expect(input.getAttribute('data-retroify')).toBe('true');
        expect(textarea.getAttribute('data-retroify')).toBe('true');
        expect(select.getAttribute('data-retroify')).toBe('true');
    });

    test('should prevent multiple stylesheet injections', () => {
        retroify.apply();
        const initialStyleCount = document.querySelectorAll('style[data-retroify]').length;
        retroify.apply();
        const finalStyleCount = document.querySelectorAll('style[data-retroify]').length;
        
        expect(initialStyleCount).toBe(1);
        expect(finalStyleCount).toBe(1);
    });

    test('should cleanup properly on window unload', () => {
        retroify.apply();
        
        const event = new Event('unload');
        window.dispatchEvent(event);
        
        expect(document.body.hasAttribute('data-retroify')).toBe(false);
    });

    test('should maintain retroify state across operations', () => {
        retroify.apply();
        retroify.toggleScanlines(true);
        
        // Apply again should not remove existing effects
        retroify.apply();
        
        expect(document.body.hasAttribute('data-retroify')).toBe(true);
        expect(document.body.classList.contains('retroify-scanlines')).toBe(true);
    });

    test('should handle dynamic element creation after retroify is applied', (done) => {
        retroify.apply();
        
        const newButton = document.createElement('button');
        newButton.name = 'new-button';
        document.body.appendChild(newButton);
        
		// Expect statement must be wrapped in timeout to execute as macrotask
		// allowing DOM to trigger Retroify's `MutationObserver` first.
        setTimeout(() => {
            expect(newButton.getAttribute('data-retroify')).toBe('true');
            done();
        }, 0);
    });

	test('should handle dynamic nested element creation after retroify is applied', (done) => {
        retroify.apply();
        
        const newButton = document.createElement('button');
        newButton.name = 'new-button';

		const newParagraph = document.createElement('p');

		const newDiv = document.createElement('div');
		newDiv.appendChild(newParagraph);
		newDiv.appendChild(newButton);
		document.body.appendChild(newDiv);
        
		// Expect statement must be wrapped in timeout to execute as macrotask
		// allowing DOM to trigger Retroify's `MutationObserver` first.
        setTimeout(() => {
            expect(newButton.getAttribute('data-retroify')).toBe('true');
            expect(newParagraph.getAttribute('data-retroify')).toBe('true');
            expect(newDiv.getAttribute('data-retroify')).toBe('true');
            done();
        }, 0);
    });

	test('should handle dynamic nested element creation as innerHTML after retroify is applied', (done) => {
        retroify.apply();
        
        const element = document.createElement('div');
		element.className = 'mb-2';
		element.innerHTML = `
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Dynamic Element</h5>
					<p class="card-text">This element was added dynamically.</p>
					<button class="btn btn-primary">Dynamic Button</button>
				</div>
			</div>
		`;
		document.body.appendChild(element);

		const x = 0;
        
		// Expect statement must be wrapped in timeout to execute as macrotask
		// allowing DOM to trigger Retroify's `MutationObserver` first.
        setTimeout(() => {
            expect(element.querySelector('.btn-primary')?.getAttribute('data-retroify')).toBe('true');
            expect(element.querySelector('.card-text')?.getAttribute('data-retroify')).toBe('true');
            expect(element.querySelector('.card-title')?.getAttribute('data-retroify')).toBe('true');
            expect(element.querySelector('.card-body')?.getAttribute('data-retroify')).toBe('true');
            expect(element.querySelector('.card')?.getAttribute('data-retroify')).toBe('true');
			expect(element.getAttribute('data-retroify')).toBe('true');
            done();
        }, 0);
    });

    test('should handle media query preferences', () => {
        const mockMatchMedia = jest.fn().mockImplementation(query => ({
            matches: query === '(prefers-reduced-motion: reduce)',
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
        }));
        
        window.matchMedia = mockMatchMedia;
        
        retroify.apply();
        const styles = document.querySelector('style[data-retroify]').textContent;
        expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
        
        // The cleanup is handled in afterEach
    });

    test('should handle print media styles', () => {
        retroify.apply();
        const styles = document.querySelector('style[data-retroify]').textContent;
        expect(styles).toContain('@media print');
        expect(styles).toContain('display: none !important');
    });

    test('should handle animation classes', () => {
        const div = document.createElement('div');
        div.classList.add('floating');
        document.body.appendChild(div);
        
        retroify.apply();
        const styles = window.getComputedStyle(div);
        expect(styles.animation).toBeTruthy();
    });

    test('should properly remove all child element styles', () => {
        const container = document.createElement('div');
        const child1 = document.createElement('button');
        const child2 = document.createElement('input');
        container.appendChild(child1);
        container.appendChild(child2);
        document.body.appendChild(container);

        retroify.apply(container);
        retroify.remove(container);

        expect(child1.getAttribute('data-retroify')).toBeNull();
        expect(child2.getAttribute('data-retroify')).toBeNull();
    });

    test('should register CSS custom properties with root element', () => {
        const element = document.createElement('textarea');
        document.body.appendChild(element);
        
        retroify.apply();
        const styles = window.getComputedStyle(document.body);
        expect(styles.getPropertyValue('--retroify-shadow-opacity')).toBeTruthy();
    });

    test('should preserve FontAwesome icons', () => {
        const icon = document.createElement('i');
        icon.classList.add('fa', 'fa-test');
        document.body.appendChild(icon);
        
        retroify.apply();
        expect(icon.style.fontFamily).not.toBe('Press Start 2P');
    });

    describe('Accessibility', () => {
        test('should maintain button interactivity states', () => {
            const button = document.createElement('button');
            document.body.appendChild(button);
            retroify.apply();

            // Simulate focus
            button.focus();
            expect(document.activeElement).toBe(button);

            // Simulate click
            button.click();
            expect(button.getAttribute('aria-pressed')).toBe('false');
        });

        test('should preserve native form control accessibility', () => {
            const form = document.createElement('form');
            const input = document.createElement('input');
            input.type = 'text';
            input.setAttribute('aria-label', 'Test Input');
            form.appendChild(input);
            document.body.appendChild(form);

            retroify.apply();
            expect(input.getAttribute('aria-label')).toBe('Test Input');
        });

        test('should handle focus states properly', () => {
            const button = document.createElement('button');
            document.body.appendChild(button);
            retroify.apply();

            // Simulate keyboard navigation
            button.focus();
            expect(document.activeElement).toBe(button);

            // Tab away
            button.blur();
            expect(document.activeElement).not.toBe(button);
        });
    });

    describe('Error Handling', () => {
        test('should handle detached DOM elements', () => {
            const detachedElement = document.createElement('div');
            retroify.apply(detachedElement);
            expect(detachedElement.getAttribute('data-retroify')).toBe('true');
        });
    });

    describe('Performance', () => {
        test('should handle large DOM trees efficiently', () => {
            // Create a large DOM tree
            const root = document.createElement('div');
            for (let i = 0; i < 1000; i++) {
                const child = document.createElement('div');
                child.textContent = `Child ${i}`;
                root.appendChild(child);
            }
            document.body.appendChild(root);

            const start = performance.now();
            retroify.apply(root);
            const end = performance.now();

            // Should process 1000 elements in under 100ms
            expect(end - start).toBeLessThan(100);
        });
    });
});