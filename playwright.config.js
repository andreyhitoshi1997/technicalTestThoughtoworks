import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    reporter: [
        ['list'],
        ['html', { open: 'never' }],
        ['json', { outputFile: 'test-results/last-run-playwright.json' }],
    ],
    use: {
        trace: 'on-first-retry',
        headless: process.env.CI ? true : false,
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ], 
});