import { defineConfig, devices } from '@playwright/test';
import { trace } from 'console'

export default defineConfig({
    testDir: './tests',
    // retries:1,                 // Retry failed test once
    timeout:30*1000,          // Global test timeout
    expect: {
        timeout:40*1000       // Global assertion timeout
    },

    reporter: 'html',
    use: {
        baseURL:'https://www.way2automation.com/angularjs-protractor/banking/#/login',
        headless:false,
        actionTimeout: 10 * 1000,    // Global action timeout
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

