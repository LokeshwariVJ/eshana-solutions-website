import { test, expect, visit, loadedImage, founderAlt } from '../helpers/site';
test('founder identity and portrait @smoke', async ({ page }) => {
  await visit(page, '/about');
  await expect(page.getByRole('heading', { name: 'Lokeshwari Padmanabhan' })).toBeVisible();
  await expect(page.getByText('Founder & Quality Engineering Consultant', { exact: true })).toBeVisible();
  await loadedImage(page.getByRole('img', { name: founderAlt, exact: true }));
});
