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

// The front-page in-page demo runs the real Live Verify pipeline (extract verify:
// line -> normalize -> SHA-256 -> GET the issuer domain). The claim's verify: line
// hardcodes the production domain, so we intercept that origin: 200 {"status":"verified"}
// for the pristine claim's hash, 404 for anything else (i.e. an edited claim). This
// exercises the DOM wiring and pipeline without depending on a live deploy.

const PRISTINE_HASH =
  '10a05837abbcf6f3533df418855a7cd513a7feb7d4f347f28853d9c4be2bc76f';

test.describe('front-page verify/fail demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('https://live-verify.github.io/live-verify/c/**', (route) => {
      const url = route.request().url();
      if (url.includes(PRISTINE_HASH)) {
        route.fulfill({ status: 200, contentType: 'application/json', body: '{"status":"verified"}' });
      } else {
        route.fulfill({ status: 404, contentType: 'text/plain', body: 'Not Found' });
      }
    });
    await page.goto('file://' + path.resolve('public/index.html'));
  });

  test('pristine claim verifies green', async ({ page }) => {
    await page.click('#demoVerifyBtn');
    const result = page.locator('#demoResult');
    await expect(result).toBeVisible();
    await expect(result).toHaveClass(/is-verified/);
    await expect(result).toContainText('Verified');
  });

  test('editing a character makes verification fail red', async ({ page }) => {
    // Change the chip time inside the editable claim.
    await page.evaluate(() => {
      const doc = document.getElementById('demoDoc')!;
      doc.innerText = doc.innerText.replace('1:47:32', '1:47:33');
    });
    await page.click('#demoVerifyBtn');
    const result = page.locator('#demoResult');
    await expect(result).toBeVisible();
    await expect(result).toHaveClass(/is-failed/);
    await expect(result).toContainText('Fails verification');
    // Restore button appears once the claim has been edited.
    await expect(page.locator('#demoRestoreBtn')).toBeVisible();
  });

  test('restore brings back the pristine claim and re-verifies green', async ({ page }) => {
    await page.evaluate(() => {
      const doc = document.getElementById('demoDoc')!;
      doc.innerText = doc.innerText.replace('Jordan Avery', 'Jordan Averyx');
    });
    await page.click('#demoVerifyBtn');
    await expect(page.locator('#demoResult')).toHaveClass(/is-failed/);

    await page.click('#demoRestoreBtn');
    await expect(page.locator('#demoRestoreBtn')).toBeHidden();
    await expect(page.locator('#demoResult')).toBeHidden();

    await page.click('#demoVerifyBtn');
    await expect(page.locator('#demoResult')).toHaveClass(/is-verified/);
  });

  test('network failure shows an honest error state, not a pass or fail', async ({ page }) => {
    // Override the route to abort — simulates offline / blocked lookup.
    await page.route('https://live-verify.github.io/live-verify/c/**', (route) => route.abort());
    await page.click('#demoVerifyBtn');
    const result = page.locator('#demoResult');
    await expect(result).toBeVisible();
    await expect(result).toHaveClass(/is-error/);
    await expect(result).not.toHaveClass(/is-verified/);
    await expect(result).not.toHaveClass(/is-failed/);
  });
});
