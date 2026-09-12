import { test, expect, visit, noOverflow, founderAlt } from '../helpers/site';
test('mobile menu opens, closes and navigates @smoke', async ({ page }) => {
  await visit(page, '/');
  const toggle = page.locator('summary').filter({ hasText: 'Toggle navigation' });
  const nav = page.getByRole('navigation', { name: 'Mobile navigation', exact: true });
  await toggle.click();
  await expect(nav).toBeVisible();
  await toggle.click();
  await expect(nav).toBeHidden();
  await toggle.click();
  await nav.getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/\/about$/);
});
for (const path of ['/', '/about', '/contact', '/quality-audit', '/services/ai-initiative-gate']) {
  test(`mobile layout: ${path} @smoke`, async ({ page }) => {
    await visit(page, path);
    await noOverflow(page);
    if (path === '/') {
      const journey = page.getByRole('complementary', { name: 'A more confident release journey' });
      const stages = await journey.getByRole('list').first().getByRole('listitem').all();
      let previous = -1;
      for (const stage of stages) {
        const bounds = await stage.boundingBox();
        expect(bounds!.y).toBeGreaterThan(previous);
        previous = bounds!.y;
      }
      const cta = await page.getByRole('link', { name: 'Explore our work', exact: true }).boundingBox();
      expect((await journey.boundingBox())!.y).toBeGreaterThan(cta!.y + cta!.height);
    }
    if (path === '/about') {
      const photo = await page.getByRole('img', { name: founderAlt }).boundingBox();
      const bio = await page.getByRole('heading', { name: 'Lokeshwari Padmanabhan' }).boundingBox();
      expect(bio!.y).toBeGreaterThanOrEqual(photo!.y + photo!.height);
    }
    if (path === '/contact') {
      for (const field of await page.getByRole('textbox').all()) {
        const bounds = await field.boundingBox();
        expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(page.viewportSize()!.width);
      }
    }
  });
}
