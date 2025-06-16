/// <reference types="@playwright/test" />
// tests/adminShows.spec.ts
import { test, expect, type Page } from '@playwright/test';

// Credentials for test login
const TEST_USER: { email: string; password: string } = {
  email: 'admin@example.com',
  password: 'admin',
};

test.describe('Admin Shows CRUD operations', () => {
  let showId: string;

  test.beforeEach(async ({ page }) => {
    const browserErrors: string[] = [];

    // Capture browser console logs
    page.on('console', msg => {
      const text = msg.text();
      if (msg.type() === 'error') {
        console.error('❌ Browser console.error:', text);
        browserErrors.push(text);
      } else {
        console.log(`🪵 ${msg.type()}:`, text);
      }
    });

    // Navigate to login page
    await page.goto('http://localhost:3000/login');
    await page.waitForSelector('input[name="email"]', { timeout: 20000 });

    // Fill login form
    await page.fill('input[name="email"]', TEST_USER.email);
    await page.fill('input[name="password"]', TEST_USER.password);

    console.log('🔐 Submitting login...');

    // Click the submit button first
    await page.click('button[type="submit"]');

    // Then wait for the URL to change to /admin
    await page.waitForURL(/\/admin(\/|$)/, { timeout: 20000 });

    console.log('📍 Current URL after submit:', page.url());

    // Error check and assert final URL
    const hasError = browserErrors.length > 0;
    console.log({ hasError, browserErrors });

    if (!hasError) {
      await expect(page).toHaveURL(/\/admin(\/|$)/);
    } else {
      console.warn('⚠ Login succeeded but browser errors detected. Skipping URL assertion.');
    }
  });

  test('Create, Update, Delete a show and measure timings', async ({ page }: { page: Page }) => {
    // Navigate to the create show page
    await page.goto('http://localhost:3000/admin/shows/create', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    // Create
    const createStart = performance.now();
    await page.fill('input[name="name"]', 'Test Show');
    await page.fill('input[name="status"]', '1');

    // Submit the form
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin/shows/**/edit', { timeout: 20000 });

    const createEnd = performance.now();
    console.log(`Create duration: ${(createEnd - createStart).toFixed(2)}ms`);

    // Extract created show ID from URL
    const url = page.url();
    const match = url.match(/\/admin\/shows\/(\d+)\/edit$/);
    expect(match).not.toBeNull();
    const showId = match![1];
    console.log(`Created show ID: ${showId}`);

    // Update
    const updateStart = performance.now();
    await page.fill('input[name="name"]', 'Updated Show');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin/shows', { timeout: 20000 });

    const updateEnd = performance.now();
    console.log(`Update duration: ${(updateEnd - updateStart).toFixed(2)}ms`);

    expect(page.url()).toMatch(/\/admin\/shows$/);

    // Delete
    const deleteStart = performance.now();
    await page.click(`button[name="showId"][value="${showId}"]`);
    await page.waitForURL('**/admin/shows', { timeout: 20000 });

    const deleteEnd = performance.now();
    console.log(`Delete duration: ${(deleteEnd - deleteStart).toFixed(2)}ms`);

    // Confirm that the show is no longer in the table
    const exists = await page.$(`text=Updated Show`);
    expect(exists).toBeNull();
  });
});