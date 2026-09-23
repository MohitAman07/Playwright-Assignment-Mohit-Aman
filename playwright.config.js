import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    retries: 1,
    timeout: 30 * 1000,
    expect: {
        timeout: 40 * 1000
    },
    reporter: 'html',
    use: {
        baseURL: 'https://www.way2automation.com/angularjs-protractor/banking/#/login',
        // Headed locally, headless in GitHub Actions
        headless: !!process.env.CI,
        actionTimeout: 10 * 1000,
        screenshot: 'on',
        video: 'on',
        trace: 'on-first-retry'
    },

    projects: [
        {
            name: 'chrome',
            use: {
                browserName: 'chromium',
            }
        }
    ]
});