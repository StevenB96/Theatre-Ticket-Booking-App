import { test, expect, type Page } from '@playwright/test';

const TEST_USER = {
  email: 'admin@example.com',
  password: 'admin',
};

test('CRUD operations with entity dependencies', async ({ page }) => {
  test.setTimeout(120_000);

  // Login as admin
  await page.goto('/login', { waitUntil: 'networkidle' });
  await page.fill('input[name="email"]', TEST_USER.email);
  await page.fill('input[name="password"]', TEST_USER.password);
  await page.click('button[type="submit"]');
  await page.waitForURL(/\/admin(\?.*)?$/, { timeout: 20_000 });

  let theatreId: string;
  let showId: string;
  let performanceId: string;
  let userId: string;
  let seatId: string;
  let ticketId: string;

  // CREATE Theatre
  await test.step('Create theatre', async () => {
    await page.goto('/admin/theatres/create', { waitUntil: 'networkidle' });
    await page.fill('form [name="name"]', 'Test Theatre');
    await page.fill('form [name="address"]', '123 Main St');
    await page.selectOption('form [name="status"]', '1');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/admin\/theatres\/\d+(\?.*)?$/);
    theatreId = page.url().match(/\/(\d+)/)![1];
  });

  // CREATE Show
  await test.step('Create show', async () => {
    await page.goto('/admin/shows/create', { waitUntil: 'networkidle' });
    await page.fill('form [name="name"]', 'Test Show');
    await page.selectOption('form [name="status"]', '1');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/admin\/shows\/\d+(\?.*)?$/);
    showId = page.url().match(/\/(\d+)/)![1];
  });

  // CREATE Performance (depends on theatre & show)
  await test.step('Create performance', async () => {
    await page.goto('/admin/performances/create', { waitUntil: 'networkidle' });
    await page.selectOption('form [name="theatre_id"]', theatreId);
    await page.selectOption('form [name="show_id"]', showId);
    await page.fill('form [name="date"]', '2025-01-01');
    await page.fill('form [name="time"]', '18:00');
    await page.selectOption('form [name="type"]', '1');
    await page.selectOption('form [name="status"]', '1');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/admin\/performances\/\d+(\?.*)?$/);
    performanceId = page.url().match(/\/(\d+)/)![1];
  });

  // CREATE User
  await test.step('Create user', async () => {
    await page.goto('/admin/users/create', { waitUntil: 'networkidle' });
    await page.fill('form [name="username"]', 'Test User');
    await page.fill('form [name="email"]', 'test@example.com');
    await page.fill('form [name="password"]', 'password123');
    await page.selectOption('form [name="role"]', '1');
    await page.selectOption('form [name="status"]', '1');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/admin\/users\/\d+(\?.*)?$/);
    userId = page.url().match(/\/(\d+)/)![1];
  });

  // CREATE Seat (depends on theatre)
  await test.step('Create seat', async () => {
    await page.goto('/admin/seats/create', { waitUntil: 'networkidle' });
    await page.selectOption('form [name="theatre_id"]', theatreId);
    await page.fill('form [name="code"]', 'A1');
    await page.fill('form [name="zone"]', 'Orchestra');
    await page.selectOption('form [name="status"]', '1');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/admin\/seats\/\d+(\?.*)?$/);
    seatId = page.url().match(/\/(\d+)/)![1];
  });

  // CREATE Ticket (depends on user, seat, performance)
  await test.step('Create ticket', async () => {
    await page.goto('/admin/tickets/create', { waitUntil: 'networkidle' });
    await page.selectOption('form [name="user_id"]', userId);
    await page.selectOption('form [name="seat_id"]', seatId);
    await page.selectOption('form [name="performance_id"]', performanceId);
    await page.fill('form [name="price"]', '100');
    await page.selectOption('form [name="status"]', '1');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/admin\/tickets\/\d+(\?.*)?$/);
    ticketId = page.url().match(/\/(\d+)/)![1];
  });

  // UPDATE each entity
  await test.step('Update theatre', async () => {
    await page.goto(`/admin/theatres/${theatreId}`, { waitUntil: 'networkidle' });
    await page.fill('form [name="address"]', '456 Elm St');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/admin\/theatres(\?.*)?$/);
  });
  await test.step('Update show', async () => {
    await page.goto(`/admin/shows/${showId}`, { waitUntil: 'networkidle' });
    await page.fill('form [name="name"]', 'Updated Show');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/admin\/shows(\?.*)?$/);
  });
  await test.step('Update performance', async () => {
    await page.goto(`/admin/performances/${performanceId}`, { waitUntil: 'networkidle' });
    await page.fill('form [name="time"]', '19:00');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/admin\/performances(\?.*)?$/);
  });
  await test.step('Update user', async () => {
    await page.goto(`/admin/users/${userId}`, { waitUntil: 'networkidle' });
    await page.fill('form [name="username"]', 'Updated User');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/admin\/users(\?.*)?$/);
  });
  await test.step('Update seat', async () => {
    await page.goto(`/admin/seats/${seatId}`, { waitUntil: 'networkidle' });
    await page.fill('form [name="zone"]', 'Mezzanine');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/admin\/seats(\?.*)?$/);
  });
  await test.step('Update ticket', async () => {
    await page.goto(`/admin/tickets/${ticketId}`, { waitUntil: 'networkidle' });
    await page.fill('form [name="price"]', '120');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/admin\/tickets(\?.*)?$/);
  });

  // DELETE in reverse dependency order
  await test.step('Delete ticket', async () => {
    await page.goto('/admin/tickets', { waitUntil: 'networkidle' });
    page.once('dialog', dialog => dialog.accept());
    await page.click(`button[name="ticketId"][value="${ticketId}"]`);
    await page.waitForURL(/\/admin\/tickets(\?.*)?$/);
    await expect(page.locator(`tr[data-row-id="${ticketId}"]`)).toHaveCount(0);
  });
  await test.step('Delete seat', async () => {
    await page.goto('/admin/seats', { waitUntil: 'networkidle' });
    page.once('dialog', dialog => dialog.accept());
    await page.click(`button[name="seatId"][value="${seatId}"]`);
    await page.waitForURL(/\/admin\/seats(\?.*)?$/);
    await expect(page.locator(`tr[data-row-id="${seatId}"]`)).toHaveCount(0);
  });
  await test.step('Delete performance', async () => {
    await page.goto('/admin/performances', { waitUntil: 'networkidle' });
    page.once('dialog', dialog => dialog.accept());
    await page.click(`button[name="performanceId"][value="${performanceId}"]`);
    await page.waitForURL(/\/admin\/performances(\?.*)?$/);
    await expect(page.locator(`tr[data-row-id="${performanceId}"]`)).toHaveCount(0);
  });
  await test.step('Delete show', async () => {
    await page.goto('/admin/shows', { waitUntil: 'networkidle' });
    page.once('dialog', dialog => dialog.accept());
    await page.click(`button[name="showId"][value="${showId}"]`);
    await page.waitForURL(/\/admin\/shows(\?.*)?$/);
    await expect(page.locator(`tr[data-row-id="${showId}"]`)).toHaveCount(0);
  });
  await test.step('Delete user', async () => {
    await page.goto('/admin/users', { waitUntil: 'networkidle' });
    page.once('dialog', dialog => dialog.accept());
    await page.click(`button[name="userId"][value="${userId}"]`);
    await page.waitForURL(/\/admin\/users(\?.*)?$/);
    await expect(page.locator(`tr[data-row-id="${userId}"]`)).toHaveCount(0);
  });
  await test.step('Delete theatre', async () => {
    await page.goto('/admin/theatres', { waitUntil: 'networkidle' });
    page.once('dialog', dialog => dialog.accept());
    await page.click(`button[name="theatreId"][value="${theatreId}"]`);
    await page.waitForURL(/\/admin\/theatres(\?.*)?$/);
    await expect(page.locator(`tr[data-row-id="${theatreId}"]`)).toHaveCount(0);
  });
});
