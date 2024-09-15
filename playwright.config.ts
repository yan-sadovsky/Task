import {defineConfig, devices} from '@playwright/test';
import { env } from './src/services/environment/env.service';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ['list'],
        [
            'html',
            {
                printSteps: true,
                open: 'never',
                // outputFolder: 'report',
                // outputFile: 'report.html'
            }
        ],
        [
            'allure-playwright',
            {
                detail: false,
                outputFolder: 'allure-results',
                suiteTitle: false
            }
        ]
    ],
    use: {
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: {
            mode: 'retain-on-failure'
        },
        baseURL: env.E2E_BASE_URL
    },
    projects: [
        {
            name: 'Chrome',
            use: {...devices['Desktop Chrome']},
        },
    ],
});
