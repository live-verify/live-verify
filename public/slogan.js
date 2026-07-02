/*
    Copyright (C) 2025, Paul Hammant

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

(() => {
    const roots = document.querySelectorAll('[data-slogan-root]');
    if (!roots.length) return;

    if (!document.getElementById('slogan-style')) {
        const style = document.createElement('style');
        style.id = 'slogan-style';
        style.textContent = `
            [data-slogan-root] {
                font-size: 0.98em;
                opacity: 0.95;
                line-height: 1.6;
                margin: 8px auto 18px;
                max-width: 640px;
                text-align: center;
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

        toggleEl.addEventListener('click', () => {
            state = state === 'google_lens' ? 'live_text' : 'google_lens';
            render();
        });

        render();
    }

    roots.forEach(wire);
})();
