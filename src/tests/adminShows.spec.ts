import { test, expect, type Page } from '@playwright/test';

const TEST_USER = {
  email: 'admin@example.com',
  password: 'admin',
};

test.describe('@admin @crud Operations', () => {
  test.beforeEach(async ({ page }) => {
    // consolidated logging
    page.on('console', msg => console.log(`🪵 [${msg.type()}]`, msg.text()));
    // page.on('request', req => console.log('⬆️', req.method(), req.url()));
    // page.on('response', res => console.log('⬇️', res.status(), res.url()));

    // Login as admin
    await page.goto('/login', { waitUntil: 'networkidle' });
    await page.fill('input[name="email"]', TEST_USER.email);
    await page.fill('input[name="password"]', TEST_USER.password);
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/admin(\?.*)?$/, { timeout: 60_000 });
  });

  /**
   * Generic CRUD helper
   * @param entity - resource path
   * @param createFields - input[name] -> value
   * @param selectors - button selectors for create/update
   */
  async function runCrud(
    page: Page,
    entity: string,
    createFields: Record<string, string>,
    updateField: { name: string; value: string },
    selectors: { create: string; update: string }
  ) {
    let id: string;

    // CREATE
    await test.step(`Create ${entity}`, async () => {
      // Note: timing includes full page navigation, form fill, server round-trip, and client render
      const t0 = performance.now();
      await page.goto(`/admin/${entity}s/create`, { waitUntil: 'networkidle' });
      await page.waitForSelector('form, button');

      for (const [name, value] of Object.entries(createFields)) {
        await page.fill(`input[name="${name}"]`, value);
      }
      await page.click(selectors.create);
      await page.waitForURL(new RegExp(`/admin/${entity}s/\\d+(\\?.*)?$`), { timeout: 60_000 });

      const match = page.url().match(new RegExp(`/admin/${entity}s/(\\d+)`));
      expect(match, `Expected URL to contain created ${entity} ID`).not.toBeNull();
      id = match![1];
      console.log(`✅ Created ${entity} id:`, id);
      console.log(
        `⏱️ Create ${entity} duration:`,
        `${(performance.now() - t0).toFixed(2)}ms`
      );
    });

    // UPDATE
    await test.step(`Update ${entity}`, async () => {
      // Note: timing includes navigation to edit page and update submission
      const t1 = performance.now();
      await page.goto(`/admin/${entity}s/${id}`, { waitUntil: 'networkidle' });
      await page.waitForSelector('form, button');

      await page.fill(`input[name="${updateField.name}"]`, updateField.value);
      await page.click(selectors.update);
      await page.waitForURL(new RegExp(`/admin/${entity}s(\\?.*)?$`), { timeout: 60_000 });

      console.log(
        `⏱️ Update ${entity} duration:`,
        `${(performance.now() - t1).toFixed(2)}ms`
      );
    });

    // DELETE
    await test.step(`Delete ${entity}`, async () => {
      // Note: timing includes navigation back to list and DOM check for deletion
      const t2 = performance.now();
      await page.goto(`/admin/${entity}s`, { waitUntil: 'networkidle' });
      page.once('dialog', dialog => dialog.accept());
      await page.click(`button[name="${entity}Id"][value="${id}"]`);
      await page.waitForURL(new RegExp(`/admin/${entity}s(\\?.*)?$`), { timeout: 60_000 });

      const row = page.locator('tr', { hasText: updateField.value });
      await expect(row).toHaveCount(0);
      console.log(
        `⏱️ Delete ${entity} duration:`,
        `${(performance.now() - t2).toFixed(2)}ms`
      );
    });
  }

  test('Seats CRUD', async ({ page }) => {
    await runCrud(
      page,
      'seat',
      { theatreId: '1', code: 'A3', zone: 'Stalls', status: '1' },
      { name: 'code', value: 'Updated Code' },
      { create: 'button[type="button"]:has-text("Create")', update: 'button[type="button"]:has-text("Save")' }
    );
  });

  test('Shows CRUD', async ({ page }) => {
    await runCrud(
      page,
      'show',
      { name: 'Test Show', status: '1' },
      { name: 'name', value: 'Updated Show' },
      { create: 'button[type="submit"]', update: 'button[type="submit"]' }
    );
  });
});
