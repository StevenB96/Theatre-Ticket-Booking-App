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
    // page.on('requestfailed', req =>
    //   console.log(`❌ Request failed: ${req.method()} ${req.url()} — ${req.failure()?.errorText}`)
    // );

    // Login as admin
    await page.goto('/login', { waitUntil: 'networkidle' });
    await page.fill('input[name="email"]', TEST_USER.email);
    await page.fill('input[name="password"]', TEST_USER.password);
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/admin(\?.*)?$/, { timeout: 20_000 });
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
        await page.fill(`form *[name="${name}"]`, value);
      }
      await page.click(selectors.create);
      await page.waitForURL(new RegExp(`/admin/${entity}s/\\d+(\\?.*)?$`), { timeout: 20_000 });

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

      await page.fill(`form *[name="${updateField.name}"]`, updateField.value);
      await page.click(selectors.update);
      await page.waitForURL(new RegExp(`/admin/${entity}s(\\?.*)?$`), { timeout: 20_000 });

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
      await page.waitForURL(new RegExp(`/admin/${entity}s(\\?.*)?$`), { timeout: 20_000 });

      const row = page.locator(`tr[data-row-id="${id}"]`, { hasText: updateField.value });
      await expect(row).toHaveCount(0);
      console.log(
        `⏱️ Delete ${entity} duration:`,
        `${(performance.now() - t2).toFixed(2)}ms`
      );
    });
  }

  test('Seats CRUD', async ({ page }) => {
    test.setTimeout(60_000);
    await runCrud(
      page,
      'seat',
      {
        theatre_id: '1',
        code: 'A3',
        zone: 'Stalls',
        status: '1',
      },
      { name: 'zone', value: 'Balcony' },
      {
        create: 'button[type="submit"]',
        update: 'button[type="submit"]'
      }
    );
  });

  test('Shows CRUD', async ({ page }) => {
    test.setTimeout(60_000);
    await runCrud(
      page,
      'show',
      {
        name: 'Test Show',
        status: '1'
      },
      { name: 'name', value: 'Updated Show' },
      {
        create: 'button[type="submit"]',
        update: 'button[type="submit"]'
      }
    );
  });

  test('Tickets CRUD', async ({ page }) => {
    test.setTimeout(60_000);
    await runCrud(
      page,
      'ticket',
      {
        user_id: '1',
        seat_id: '1',
        performance_id: '2',
        price: '50',
        status: '1',
      },
      { name: 'price', value: '75' },
      {
        create: 'button[type="submit"]',
        update: 'button[type="submit"]'
      }
    );
  });

  test('Users CRUD', async ({ page }) => {
    test.setTimeout(60_000);
    await runCrud(
      page,
      'user',
      {
        username: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: '1',
        status: '1',
      },
      { name: 'username', value: 'Updated User' },
      {
        create: 'button[type="submit"]',
        update: 'button[type="submit"]'
      }
    );
  });

  test('Performances CRUD', async ({ page }) => {
    test.setTimeout(60_000);
    await runCrud(
      page,
      'performance',
      {
        theatre_has_show_id: '1',
        start_time: '16:00',
        type: '0',
        status: '1',
      },
      {
        name: 'type',
        value: '1'
      },
      {
        create: 'button[type="submit"]',
        update: 'button[type="submit"]'
      }
    );
  });

  test('Theatres CRUD', async ({ page }) => {
    test.setTimeout(60_000);
    await runCrud(
      page,
      'theatre',
      {
        name: 'Test',
        address: 'Test Address',
        status: '1',
      },
      {
        name: 'address',
        value: 'Updated Address'
      },
      {
        create: 'button[type="submit"]',
        update: 'button[type="submit"]'
      }
    );
  });
});
