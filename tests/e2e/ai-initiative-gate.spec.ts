import { test, expect, visit } from '../helpers/site';
test('Gate pricing, decision and preselected inquiry @smoke', async ({ page }) => {
  await visit(page, '/services/ai-initiative-gate');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Before you fund the next AI idea');
  for (const text of ['$1,500 fixed', 'From $7,500', 'From $1,500/week']) await expect(page.getByText(text, { exact: true })).toBeVisible();
  await expect(page.getByText(/Additional initiatives?: \+\$2,000 each/)).toBeVisible();
  await expect(page.getByText(/Workshop fee credited(?: in full)? toward a Full Gate Assessment if you proceed within 30 days\./)).toBeVisible();
  await expect(page.getByText(/Go · Conditional · No-Go/)).toBeVisible();
  await expect(page.locator('main')).not.toContainText(/Fee quoted after the workshop/i);
  await page.getByRole('link', { name: 'Start with your idea list', exact: true }).first().click();
  await expect(page).toHaveURL(/\/contact\?service=ai-initiative-gate/);
  await expect(page.getByRole('radio', { name: 'AI Initiative Gate', exact: true })).toBeChecked();
});
