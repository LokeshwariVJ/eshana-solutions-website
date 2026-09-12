import type { Page } from '@playwright/test';
export const inquiry = {
  name: 'TEST ONLY - Playwright', email: 'playwright-test@example.com',
  company: 'Eshana Automated Test', url: 'https://example.com',
  message: 'Automated Playwright verification. Please ignore.',
};
export async function fillInquiry(page: Page) {
  await page.getByLabel('Name', { exact: true }).fill(inquiry.name);
  await page.getByLabel('Work email').fill(inquiry.email);
  await page.getByLabel('Company', { exact: true }).fill(inquiry.company);
  await page.getByLabel('Website/Product URL optional').fill(inquiry.url);
  await page.getByLabel('What are you building?', { exact: true }).fill(inquiry.message);
  await page.getByRole('radio', { name: 'AI Initiative Gate', exact: true }).check();
  await page.getByRole('radio', { name: 'Exploring options', exact: true }).check();
}
