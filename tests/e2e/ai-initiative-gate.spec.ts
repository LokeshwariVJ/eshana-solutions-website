import { test, expect, visit } from '../helpers/site';
test('Gate scope, decision and preselected inquiry @smoke', async ({ page }) => {
  await visit(page, '/services/ai-initiative-gate');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Before you fund the next AI idea');
  for (const name of ['AI Initiative Gate Workshop', 'Full Gate Assessment', 'Independent Pilot Evaluation']) {
    await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
  }
  await expect(page.getByText('Fixed-scope engagements.', { exact: true })).toBeVisible();
  await expect(page.getByText('Scope and fee are confirmed after an initial conversation, based on the number and complexity of initiatives.', { exact: true })).toBeVisible();
  await expect(page.getByText(/Go · Conditional · No-Go/)).toBeVisible();
  await expect(page.locator('main')).not.toContainText(/Fee quoted after the workshop/i);
  await page.getByRole('link', { name: 'Start with your idea list', exact: true }).first().click();
  await expect(page).toHaveURL(/\/contact\?service=ai-initiative-gate/);
  await expect(page.getByRole('radio', { name: 'AI Initiative Gate', exact: true })).toBeChecked();
});

for (const path of ['/', '/services', '/services/ai-initiative-gate']) {
  test(`no public Gate rates or credit terms: ${path} @smoke`, async ({ page }) => {
    await visit(page, path);
    const rates = /\$(?:1,?500|7,?500|2,?000)(?:\/week)?/;
    await expect(page.locator('body')).not.toContainText(rates);
    await expect(page.locator('body')).not.toContainText(/workshop fee|30.days|additional initiatives?:|fee quoted after the workshop/i);
    // Includes server-rendered HTML, metadata, JSON-LD, and serialized page data.
    expect(await page.content()).not.toMatch(rates);
    await expect(page.getByText(/Fixed-scope (?:advisory )?engagements\./)).toBeVisible();
    if (path === '/') {
      await expect(page.getByText('Starting at $299', { exact: true })).toBeVisible();
      await page.getByRole('link', { name: 'Explore the AI Initiative Gate', exact: true }).click();
    } else if (path === '/services') {
      for (const name of ['AI Initiative Gate Workshop', 'Full Gate Assessment', 'Independent Pilot Evaluation']) {
        await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
      }
      await expect(page.getByText('Fixed-scope engagements. Scope and fee are confirmed after an initial conversation.', { exact: true })).toBeVisible();
      await page.getByRole('link', { name: 'Explore the AI Initiative Gate', exact: true }).click();
    }
    await expect(page).toHaveURL(/\/services\/ai-initiative-gate$/);
  });
}
