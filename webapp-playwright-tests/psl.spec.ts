/*
    Copyright (C) 2025, Paul Hammant

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
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
