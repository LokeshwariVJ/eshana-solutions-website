import { test, expect, visit } from '../helpers/site';
test('bounded homepage internal links @smoke', async ({ page, request, baseURL }) => {
  await visit(page, '/');
  const links = await page.getByRole('link').evaluateAll(elements => elements.map(el => (el as HTMLAnchorElement).href));
  const origin = new URL(baseURL!).origin;
  const paths = [...new Set(links.filter(link => new URL(link).origin === origin).map(link => new URL(link).pathname))];
  expect(paths.length).toBeLessThanOrEqual(30);
  for (const path of paths) {
    const response = await request.get(path);
    expect(response.status(), path).toBeLessThan(400);
  }
});
for (const path of ['/', '/contact', '/quality-audit', '/services/ai-initiative-gate', '/work/triagezero', '/work/aec-quality-workflow', '/about']) {
  test(`named controls and no mixed content: ${path} @smoke`, async ({ page }) => {
    await visit(page, path);
    for (const control of await page.getByRole('button').or(page.getByRole('link')).all()) {
      await expect(control).toHaveAccessibleName(/\S/);
    }
    expect(await page.locator('img[src^="http:"],script[src^="http:"],link[rel="stylesheet"][href^="http:"]').count()).toBe(0);
  });
}
