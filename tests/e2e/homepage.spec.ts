import { test, expect, visit } from '../helpers/site';

test('homepage content and hero composition @smoke', async ({ page }) => {
  await visit(page, '/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Build fast\.\s*Ship with confidence\./);
  await expect(page.getByRole('banner').getByRole('link', { name: 'Eshana Software Solutions home' })).toBeVisible();
  for (const name of ['Get a Quality Audit', 'Explore our work', 'Explore the AI Initiative Gate']) {
    await expect(page.getByRole('link', { name, exact: true })).toBeVisible();
  }
  const journey = page.getByRole('complementary', { name: 'A more confident release journey' });
  await expect(journey).toHaveCount(1);
  for (const name of ['Plan', 'Build', 'Test', 'Assess', 'Release']) await expect(journey.getByRole('heading', { name, exact: true })).toBeVisible();
  for (const name of ['Quality Engineering', 'Test Automation', 'AI-Assisted Quality', 'The Eshana Quality Audit', 'Focused software quality work with modern engineering teams.']) {
    await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
  }
  const h1 = await page.getByRole('heading', { level: 1 }).boundingBox();
  const right = await journey.boundingBox();
  expect(right!.x).toBeGreaterThan(h1!.x + h1!.width);
  expect(right!.y).toBeLessThan(h1!.y + 400);
  await expect(page.getByRole('contentinfo')).toBeVisible();
  await expect(page.locator('body')).not.toContainText(/Lorem ipsum|\bTODO\b|<Company name>|you@company\.com/i);
});

test('current brand mark and favicon @release', async ({ page, request }) => {
  await visit(page, '/about');
  const logo = page.getByRole('banner').getByRole('link', { name: 'Eshana Software Solutions home' });
  await expect(logo.locator('svg')).toBeVisible();
  await expect(logo.locator('svg rect')).toHaveCount(0);
  await logo.click();
  await expect(page).toHaveURL(/\/$/);
  const icon = page.locator('link[rel="icon"]').first();
  const response = await request.get((await icon.getAttribute('href'))!);
  expect(response.ok()).toBeTruthy();
  expect(response.headers()['content-type']).toMatch(/image/);
});
