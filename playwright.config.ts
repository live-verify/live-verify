import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 30000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 800 },
  },
  projects: [
    {
      name: 'webapp',
      testDir: 'webapp-playwright-tests',
    },
    {
      // Loads the real unpacked extension via launchPersistentContext —
      // see extension-playwright-tests/extension.spec.ts. Runs one worker
      // because each test gets its own persistent context.
      name: 'extension',
      testDir: 'extension-playwright-tests',
    },
  ],
});
