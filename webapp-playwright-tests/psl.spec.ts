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

import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('PSL library integration in browser', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('file://' + path.resolve('webapp-playwright-tests/psl-harness.html'));

    // Wait for psl to be ready
    await page.evaluate(() => window.waitForPsl());
  });

  test('psl library should be loaded from CDN', async ({ page }) => {
    const availability = await page.evaluate(() => window.testPslAvailability());

    expect(availability.pslExists).toBe(true);
    expect(availability.pslParse).toBe(true);
    expect(availability.extractDomainAuthorityExists).toBe(true);
  });

  test('should extract domain from GitHub Pages URL', async ({ page }) => {
    const result = await page.evaluate(() =>
      window.testExtractDomainAuthority('https://paul-hammant.github.io/live-verify/c')
    );

    expect(result.success).toBe(true);
    expect(result.result).toBe('github.io');
  });

  test('should extract domain from standard .com', async ({ page }) => {
    const result = await page.evaluate(() =>
      window.testExtractDomainAuthority('https://api.example.com/verify')
    );

    expect(result.success).toBe(true);
    expect(result.result).toBe('example.com');
  });

  test('should extract domain from .ac.uk', async ({ page }) => {
    const result = await page.evaluate(() =>
      window.testExtractDomainAuthority('https://degrees.ed.ac.uk/verify/hash123')
    );

    expect(result.success).toBe(true);
    expect(result.result).toBe('ed.ac.uk');
  });

  test('should extract domain from .co.uk', async ({ page }) => {
    const result = await page.evaluate(() =>
      window.testExtractDomainAuthority('https://api.example.co.uk/verify')
    );

    expect(result.success).toBe(true);
    expect(result.result).toBe('example.co.uk');
  });

  test('should handle IP addresses', async ({ page }) => {
    const result = await page.evaluate(() =>
      window.testExtractDomainAuthority('http://192.168.1.1/verify')
    );

    expect(result.success).toBe(true);
    expect(result.result).toBe('192.168.1.1');
  });

  test('should handle localhost', async ({ page }) => {
    const result = await page.evaluate(() =>
      window.testExtractDomainAuthority('http://localhost:8000/verify')
    );

    expect(result.success).toBe(true);
    expect(result.result).toBe('localhost');
  });

  test('should handle Brazilian .com.br domain', async ({ page }) => {
    const result = await page.evaluate(() =>
      window.testExtractDomainAuthority('https://foobar.com.br/certify')
    );

    expect(result.success).toBe(true);
    expect(result.result).toBe('foobar.com.br');
  });

  test('should throw on invalid URL', async ({ page }) => {
    const result = await page.evaluate(() =>
      window.testExtractDomainAuthority('not-a-valid-url')
    );

    expect(result.success).toBe(false);
    expect(result.error).toContain('Invalid URL');
  });

  test('should handle deeply nested subdomains', async ({ page }) => {
    const result = await page.evaluate(() =>
      window.testExtractDomainAuthority('https://a.b.c.d.example.com/verify')
    );

    expect(result.success).toBe(true);
    expect(result.result).toBe('example.com');
  });

  test('should strip fake edinburgh.ac.uk GitHub Pages URL', async ({ page }) => {
    const result = await page.evaluate(() =>
      window.testExtractDomainAuthority('https://edinburgh.ac.uk--___dir.github.io/verify/abc123')
    );

    expect(result.success).toBe(true);
    expect(result.result).toBe('github.io');
  });
});

test.describe('PSL library CDN failure handling', () => {
  test('should detect when psl fails to load', async ({ page }) => {
    // Navigate to a harness that intentionally has a broken psl CDN link
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>PSL Failure Test</title>
        <!-- Intentionally broken CDN URL -->
        <script src='https://cdn.jsdelivr.net/npm/psl@999.999.999/dist/psl.min.js'></script>
      </head>
      <body>
        <script>
          window.checkPsl = () => typeof window.psl !== 'undefined';
        </script>
      </body>
      </html>
    `);

    // Wait a bit for script to attempt loading
    await page.waitForTimeout(2000);

    const pslLoaded = await page.evaluate(() => window.checkPsl());

    // This should fail, demonstrating the CDN dependency issue
    expect(pslLoaded).toBe(false);
  });
});
