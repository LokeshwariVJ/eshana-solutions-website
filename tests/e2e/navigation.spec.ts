import { test, expect, visit } from '../helpers/site';

const destinations = [
  ['Services', '/services', /Practical quality engineering/],
  ['Work', '/work', /Selected work/],
  ['Quality Audit', '/quality-audit', /Before you launch/],
  ['Insights', '/insights', /Notes on quality/],
  ['About', '/about', /Senior experience/],
  ['Contact', '/contact', /Tell us what/],
] as const;
for (const [name, path, heading] of destinations) {
  test(`navigation: ${name} @smoke`, async ({ page, request }) => {
    await visit(page, '/');
    await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
    expect((await request.get(path)).status()).toBe(200);
  });
}
