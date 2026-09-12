import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';
const url = new URL(baseURL);
const local = ['localhost', '127.0.0.1'].includes(url.hostname);

export default defineConfig({
  testDir: './tests/e2e',
  outputDir: process.env.PLAYWRIGHT_OUTPUT_DIR || 'test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  reporter: [['list'], ['html', { open: 'never', outputFolder: process.env.PLAYWRIGHT_REPORT_DIR || 'playwright-report' }]],
  use: { baseURL, screenshot: 'only-on-failure', trace: 'on-first-retry', video: 'retain-on-failure' },
  projects: [
    ...['chromium', 'webkit'].map((browserName) => ({
      name: browserName,
      use: { browserName: browserName as 'chromium' | 'webkit', viewport: { width: 1440, height: 900 } },
      testIgnore: /mobile.spec.ts/,
      grepInvert: /@submission/,
    })),
    { name: 'mobile', use: { ...devices['iPhone 13'] }, testMatch: /mobile.spec.ts/ },
    // One project, one test, no retries: an opt-in can create at most one record.
    { name: 'submission', use: { browserName: 'chromium' }, grep: /@submission/, retries: 0, workers: 1 },
  ],
  webServer: local ? {
    command: `npm run start -- --port ${url.port || 3000}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  } : undefined,
});
