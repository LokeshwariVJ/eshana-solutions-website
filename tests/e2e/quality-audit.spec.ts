import { test, expect, visit } from '../helpers/site';
test('Quality Audit price and inquiry path @smoke', async ({ page }) => {
  await visit(page, '/quality-audit');
  await expect(page.getByText('Starting at $299', { exact: true })).toBeVisible();
  await page.locator('main a[href*="/contact"]').first().click();
  await expect(page).toHaveURL(/\/contact\?service=quality-audit/);
  await expect(page.getByRole('radio', { name: 'Quality Audit', exact: true })).toBeChecked();
});
