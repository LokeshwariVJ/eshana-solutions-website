import { test, expect, visit } from '../helpers/site';
import { fillInquiry, inquiry } from '../helpers/inquiry-data';

test('labelled required fields and native validation @smoke', async ({ page }) => {
  await visit(page, '/contact');
  for (const label of ['Name', 'Work email', 'What are you building?']) {
    const field = page.getByLabel(label, { exact: true });
    await expect(field).toBeVisible();
    await expect(field).toHaveAttribute('required', '');
    expect(await field.evaluate(el => (el as HTMLInputElement).validity.valueMissing)).toBeTruthy();
  }
  await page.getByRole('button', { name: 'Start a conversation' }).click();
  await expect(page.getByLabel('Name', { exact: true })).toBeFocused();
  await fillInquiry(page);
  const email = page.getByLabel('Work email');
  await email.fill('not-an-email');
  expect(await email.evaluate(el => (el as HTMLInputElement).validity.typeMismatch)).toBeTruthy();
  const url = page.getByLabel('Website/Product URL optional');
  await url.fill('not-a-url');
  expect(await url.evaluate(el => (el as HTMLInputElement).validity.typeMismatch)).toBeTruthy();
  await url.fill('https://example.com/product');
  expect(await url.evaluate(el => (el as HTMLInputElement).checkValidity())).toBeTruthy();
  for (const name of ['What would you like help with?', 'Timeline']) {
    await expect(page.getByRole('group', { name }).getByRole('radio').first()).toHaveAttribute('required', '');
  }
  await expect(page.getByLabel('Name', { exact: true })).toHaveAttribute('maxlength', '120');
  await expect(page.getByLabel('What are you building?', { exact: true })).toHaveAttribute('maxlength', '5000');
});

test('server rejects invalid fields and retains entered values @validation', async ({ page, baseURL }) => {
  test.skip(!['localhost', '127.0.0.1'].includes(new URL(baseURL!).hostname), 'Server validation probes are local-only; production smoke never sends POST.');
  await visit(page, '/contact');
  await fillInquiry(page);
  await page.getByLabel('Work email').fill('invalid');
  await page.locator('form').evaluate(form => { (form as HTMLFormElement).noValidate = true; });
  await page.getByRole('button', { name: 'Start a conversation' }).click();
  await expect(page.getByRole('main').getByRole('alert')).toBeVisible();
  await expect(page.getByLabel('Work email')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByLabel('Name', { exact: true })).toHaveValue(inquiry.name);
  await expect(page.getByLabel('What are you building?', { exact: true })).toHaveValue(inquiry.message);
  await expect(page.getByRole('main').getByRole('alert')).not.toContainText(/supabase|postgres|stack|uuid|service_role/i);
});

test('confirmed success clears form and restart preserves query selection @submission', async ({ page }) => {
  test.skip(process.env.ENABLE_E2E_FORM_SUBMISSION !== 'true', 'Explicit opt-in required; creates one real record and notification.');
  await visit(page, '/contact?service=ai-initiative-gate');
  await fillInquiry(page);
  await page.getByRole('button', { name: 'Start a conversation' }).click();
  await expect(page.getByRole('heading', { name: 'Thanks — we received your inquiry.' })).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText('We’ll review the details and get back to you shortly.', { exact: true })).toBeVisible();
  await expect(page.locator('form')).toHaveCount(0);
  for (const value of Object.values(inquiry)) await expect(page.locator('body')).not.toContainText(value);
  await expect(page.getByRole('button', { name: 'Inquiry received', exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Send another inquiry' }).click();
  for (const label of ['Name', 'Work email', 'Company', 'Website/Product URL optional', 'What are you building?']) {
    await expect(page.getByLabel(label, { exact: true })).toHaveValue('');
  }
  await expect(page.getByRole('radio', { name: 'AI Initiative Gate', exact: true })).toBeChecked();
  await expect(page.getByRole('group', { name: 'Timeline' }).locator(':checked')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Thanks — we received your inquiry.' })).toHaveCount(0);
});
