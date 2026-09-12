import { test, expect } from '../helpers/site';
test('release security headers @release', async ({ request }) => {
  const response = await request.get('/');
  const headers = response.headers();
  expect(headers['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(headers['x-content-type-options']).toBe('nosniff');
  expect(headers['referrer-policy']).toBeTruthy();
  expect(headers['permissions-policy']).toBeTruthy();
});
test('known unimplemented admin route is not public @smoke', async ({ request }) => {
  expect((await request.get('/admin')).status()).toBe(404);
});
test('production HTTPS and HSTS @smoke', async ({ request, baseURL }) => {
  test.skip(['localhost', '127.0.0.1'].includes(new URL(baseURL!).hostname), 'HTTPS is supplied by Vercel, not local next start.');
  expect(new URL(baseURL!).protocol).toBe('https:');
  const response = await request.get('/');
  expect(new URL(response.url()).protocol).toBe('https:');
  expect(response.headers()['strict-transport-security']).toMatch(/max-age=\d+/);
});
