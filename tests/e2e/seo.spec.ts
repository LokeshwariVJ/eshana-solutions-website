import { test, expect, visit, cases } from '../helpers/site';

// Release regressions run locally and against a candidate deployment, not the older public release.
for (const path of ['/', '/services', '/about', '/contact', '/quality-audit', '/services/ai-initiative-gate', '/insights']) {
  test(`brand social defaults: ${path} @release`, async ({ page, request }) => {
    await visit(page, path);
    await expect(page).toHaveTitle(/Eshana Software Solutions/);
    for (const selector of ['meta[name="description"]', 'meta[property="og:title"]', 'meta[property="og:description"]']) {
      await expect(page.locator(selector)).toHaveAttribute('content', /\S/);
    }
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(new URL(canonical!).href).toBe(`https://www.eshanasolutions.com${path}`);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://www.eshanasolutions.com/brand/eshana-social-card.png');
    await expect(page.locator('meta[property="og:image"]')).not.toHaveAttribute('content', /triagezero/i);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', /\/brand\/eshana-social-card.png$/);
    if (path === '/') {
      const image = await request.get('/brand/eshana-social-card.png');
      expect(image.ok()).toBeTruthy();
      expect(image.headers()['content-type']).toMatch(/image\/png/);
    }
  });
}
for (const project of cases) {
  test(`case social image: ${project.title} @release`, async ({ page }) => {
    await visit(page, project.path);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', new RegExp(`/images/${project.image}.png$`));
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', new RegExp(`/images/${project.image}.png$`));
  });
}
test('sitemap and robots @smoke', async ({ request }) => {
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  for (const path of ['', '/services', '/work', '/quality-audit', '/about', '/contact', '/services/ai-initiative-gate', ...cases.map(c => c.path)]) {
    expect(xml).toMatch(new RegExp(`<loc>https://(?:www\\.)?eshanasolutions\\.com${path}/?</loc>`));
  }
  expect((await request.get('/robots.txt')).status()).toBe(200);
});
