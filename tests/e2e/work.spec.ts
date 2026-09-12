import { test, expect, visit, loadedImage, cases } from '../helpers/site';
for (const project of cases) {
  test(`${project.title} screenshot and homepage link @smoke`, async ({ page }) => {
    await visit(page, '/');
    await page.getByRole('link').filter({ has: page.getByRole('heading', { name: project.title, exact: true }) }).click();
    await expect(page).toHaveURL(new RegExp(`${project.path}$`));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(project.title);
    await loadedImage(page.getByRole('img', { name: project.alt, exact: true }));
  });
}
