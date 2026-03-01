(() => {
    const roots = document.querySelectorAll('[data-slogan-root]');
    if (!roots.length) return;

    const straplines = [
        'A path to removing massive fraud and waste from document workflows.',
        'Reduce point‑of‑use document fraud—without QR codes or upload portals.',
        'Select text in any browser, email client, or PDF viewer—verify without leaving the page.',
        'Right-click to verify: degrees, receipts, licenses, employment letters.',
        'Turn camera OCR into instant anti‑fraud checks.',
        'A small amount of digital, for the world of paper.',
        'Just enough digital to make paper verifiable.',
        'A thin digital layer over printed claims.',
        'No phone calls. No upload portals. Just select, right-click, verified.',
        'Paper-first, with a verifiable edge.',
        'Printed claims, digitally checkable.'
    ];

    if (!document.getElementById('slogan-style')) {
        const style = document.createElement('style');
        style.id = 'slogan-style';
        style.textContent = `
            [data-slogan-root] {
                font-size: 0.98em;
                opacity: 0.95;
                line-height: 1.6;
                margin: 8px 0 18px;
            }
            [data-slogan-toggle] {
                background: transparent;
                border: 0;
                padding: 0;
                margin-left: 10px;
                color: inherit;
                text-decoration: underline;
                cursor: pointer;
                font-size: 0.85em;
                opacity: 0.9;
            }
            [data-slogan-toggle]:hover {
                opacity: 1;
            }
            [data-strapline-rotator] {
                display: block;
                margin-top: 8px;
            }
            [data-strapline-text] {
                display: block;
                font-size: 0.95em;
                opacity: 0.92;
            }
            [data-strapline-dots] {
                display: inline-flex;
                align-items: center;
                gap: 7px;
                margin-top: 10px;
            }
            [data-strapline-dot] {
                width: 11px;
                height: 11px;
                border-radius: 50%;
                border: 1px solid currentColor;
                background: transparent;
                opacity: 0.45;
                cursor: pointer;
                padding: 0;
            }
            [data-strapline-dot][data-active="true"] {
                background: currentColor;
                opacity: 0.9;
            }
            [data-strapline-dot]:hover {
                opacity: 0.75;
            }
        `;
        document.head.appendChild(style);
    }

    function wire(root) {
        const termEl = root.querySelector('[data-slogan-term]');
        if (!termEl) return;
        const platformEl = root.querySelector('[data-slogan-platform]');

        let toggleEl = root.querySelector('[data-slogan-toggle]');
        if (!toggleEl) {
            toggleEl = document.createElement('button');
            toggleEl.setAttribute('data-slogan-toggle', '');
            toggleEl.type = 'button';
            root.appendChild(toggleEl);
        }

        let state = 'live_text';

        function render() {
            if (state === 'google_lens') {
                termEl.textContent = 'Google Lens';
                if (platformEl) platformEl.textContent = "Android's";
                toggleEl.textContent = '<iPhone: Live Text>';
                toggleEl.setAttribute('aria-label', 'Switch slogan term to iPhone Live Text');
            } else {
                termEl.textContent = 'Live Text';
                if (platformEl) platformEl.textContent = "the iPhone's";
                toggleEl.textContent = '<Android: Google Lens>';
                toggleEl.setAttribute('aria-label', 'Switch slogan term to Android Google Lens');
            }
        }

        wireStraplines(root);

        toggleEl.addEventListener('click', () => {
            state = state === 'google_lens' ? 'live_text' : 'google_lens';
            render();
        });

        render();
    }

    function wireStraplines(root) {
        if (!straplines.length) return;
        if (root.querySelector('[data-strapline-rotator]')) return;

        const rotatorEl = document.createElement('span');
        rotatorEl.setAttribute('data-strapline-rotator', '');

        const textEl = document.createElement('span');
        textEl.setAttribute('data-strapline-text', '');

        const dotsEl = document.createElement('span');
        dotsEl.setAttribute('data-strapline-dots', '');
        dotsEl.setAttribute('role', 'group');
        dotsEl.setAttribute('aria-label', 'Value proposition');

        rotatorEl.appendChild(textEl);
        rotatorEl.appendChild(dotsEl);
        root.appendChild(rotatorEl);

        let currentIndex = 0;
        let timerId = null;

        function renderDots() {
            dotsEl.innerHTML = '';
            straplines.forEach((line, index) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.setAttribute('data-strapline-dot', '');
                dot.title = line;
                dot.setAttribute(
                    'aria-label',
                    `Show message ${index + 1} of ${straplines.length}`
                );

                dot.addEventListener('click', () => {
                    currentIndex = index;
                    render();
                    restartTimer();
                });

                dotsEl.appendChild(dot);
            });
        }

        function render() {
            textEl.textContent = straplines[currentIndex];
            textEl.setAttribute(
                'aria-label',
                `Message ${currentIndex + 1} of ${straplines.length}: ${straplines[currentIndex]}`
            );

            const dots = dotsEl.querySelectorAll('[data-strapline-dot]');
            dots.forEach((dot, index) => {
                const active = index === currentIndex;
                dot.setAttribute('data-active', active ? 'true' : 'false');
                dot.setAttribute('aria-pressed', active ? 'true' : 'false');
            });
        }

        function restartTimer() {
            if (timerId) window.clearInterval(timerId);
            timerId = window.setInterval(() => {
                currentIndex = (currentIndex + 1) % straplines.length;
                render();
            }, 4000);
        }

        renderDots();
        render();
        restartTimer();
    }

    roots.forEach(wire);
})();
