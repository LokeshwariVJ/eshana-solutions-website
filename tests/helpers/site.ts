import { test as base, expect, type Page, type Locator } from '@playwright/test';

export const test = base.extend<{ browserSafety: void }>({
  browserSafety: [async ({ page, baseURL }, use, info) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => {
      if (message.type() === 'error') errors.push(message.text());
    });
    // Ordinary smoke runs cannot write to any backend, even if a CTA regresses.
    await page.route('**/*', async route => {
      if (!info.tags.includes('@submission') && !info.tags.includes('@validation') &&
          !['GET', 'HEAD', 'OPTIONS'].includes(route.request().method())) {
        return route.abort('blockedbyclient');
      }
      // Safari upgrades loopback assets to HTTPS under production CSP. next start
      // serves HTTP locally; remove only that transport directive in the harness.
      // Remote responses and API-level security assertions remain untouched.
      const local = ['localhost', '127.0.0.1'].includes(new URL(baseURL!).hostname);
      if (local && route.request().isNavigationRequest()) {
        const response = await route.fetch();
        const headers = response.headers();
        if (headers['content-security-policy']) {
          headers['content-security-policy'] = headers['content-security-policy'].replace(/;?\s*upgrade-insecure-requests/g, '');
        }
        return route.fulfill({ response, headers });
      }
      return route.continue();
    });
    await use();
    expect(errors, 'Browser console and uncaught errors').toEqual([]);
  }, { auto: true }],
});
export { expect };
export async function visit(page: Page, path: string) {
  const response = await page.goto(path);
  expect(response?.status(), path).toBe(200);
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
}
export async function loadedImage(image: Locator) {
  await image.scrollIntoViewIfNeeded();
  await expect(image).toBeVisible();
  await expect.poll(() => image.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
}
export async function noOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(2);
}
export const cases = [
  { path: '/work/triagezero', title: 'TriageZero', image: 'triagezero-command-center', alt: 'TriageZero command center showing AI-assisted regression failure investigations and release-risk metrics' },
  { path: '/work/aec-quality-workflow', title: 'AEC Quality Workflow', image: 'aec-qaqc-dashboard', alt: 'AEC QA/QC dashboard showing project checklist status, open issues, flagged items, and project-phase quality metrics' },
];
export const founderAlt = 'Lokeshwari Padmanabhan, Founder and Quality Engineering Consultant at Eshana Software Solutions';
