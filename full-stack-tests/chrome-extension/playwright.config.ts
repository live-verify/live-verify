import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: '.',
  timeout: 60000,
  use: {
    ...devices['Desktop Chrome'],
    // Extension testing requires persistent context, handled in the test file
  },
});
