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

document.addEventListener('DOMContentLoaded', async () => {
    const savedMessage = document.getElementById('savedMessage');
    const options = document.querySelectorAll('.option');

    // Load saved settings
    let settings = { intrusiveness: 'maximum' };

    try {
        const result = await browser.storage.sync.get('settings');
        if (result.settings) {
            settings = { ...settings, ...result.settings };
        }
    } catch {
        // Fall back to local storage
        try {
            const result = await browser.storage.local.get('settings');
            if (result.settings) {
                settings = { ...settings, ...result.settings };
            }
        } catch (e) {
            console.error('Failed to load settings:', e);
        }
    }

    // Apply saved settings to UI
    applySettings(settings);

    // Handle intrusiveness radio changes
    options.forEach(option => {
        const radio = option.querySelector('input[type="radio"]');

        option.addEventListener('click', () => {
            radio.checked = true;
            updateOptionStyles();
            saveSettings();
        });

        radio.addEventListener('change', () => {
            updateOptionStyles();
            saveSettings();
        });
    });

    function applySettings(settings) {
        // Set intrusiveness radio
        const radio = document.querySelector(`input[name="intrusiveness"][value="${settings.intrusiveness}"]`);
        if (radio) {
            radio.checked = true;
        }
        updateOptionStyles();
    }

    function updateOptionStyles() {
        options.forEach(opt => {
            const radio = opt.querySelector('input[type="radio"]');
            if (radio.checked) {
                opt.classList.add('selected');
            } else {
                opt.classList.remove('selected');
            }
        });
    }

    async function saveSettings() {
        const intrusiveness = document.querySelector('input[name="intrusiveness"]:checked')?.value || 'maximum';

        const newSettings = {
            intrusiveness
        };

        try {
            await browser.storage.sync.set({ settings: newSettings });
        } catch {
            // Fall back to local storage
            await browser.storage.local.set({ settings: newSettings });
        }

        // Show saved message
        savedMessage.classList.add('visible');
        setTimeout(() => {
            savedMessage.classList.remove('visible');
        }, 2000);
    }
});
