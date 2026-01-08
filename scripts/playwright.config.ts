/*
 * Copyright (c) Baidu, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {defineConfig, devices} from '@playwright/test';
import path from 'path';

export default defineConfig({
    // Look for test files in the "tests" directory, relative to this configuration file.
    testDir: '../packages',

    testMatch: process.env.COMPONENT ? `**/${process.env.COMPONENT}/**/e2e/**/*.spec.ts` : '**/e2e/**/*.spec.ts',

    // Glob patterns or regular expressions that match test files.
    // testIgnore: '**/search-components/**',

    // Run all tests in parallel.
    fullyParallel: true,

    // Fail the build on CI if you accidentally left test.only in the source code.
    forbidOnly: !!process.env.E2E_ENV,

    // Retry on CI only.
    retries: process.env.E2E_ENV ? 5 : 0,

    // Opt out of parallel tests on CI.
    workers: process.env.E2E_ENV ? undefined : '50%',

    // Maximum time one test can run. After reaching this number, testing will stop and exit with an error
    // maxFailures: process.env.E2E_ENV ? 5 : 0,

    // Reporter to use
    reporter: [
        [
            'html',
            {
                open: process.env.E2E_ENV ? 'never' : 'on-failure'
            }
        ],
        ['list'],
        [
            '@bgotink/playwright-coverage',
            {
                sourceRoot: path.join(__dirname, '..'),
                resultDir: path.join(__dirname, '..', 'e2e-coverage'),
                exclude: ['**/*.ts', '**/*.js'],
                reports: [
                    ['html'],
                    [
                        'text',
                        {
                            file: process.env.E2E_ENV ? 'index.txt' : null
                        }
                    ],
                    ['text-summary']
                ]
            }
        ]
    ],

    use: {
        // Base URL to use in actions like `await page.goto('/')`.
        baseURL: 'http://127.0.0.1:8998',

        // Collect trace when retrying the failed test.
        trace: 'on-first-retry'
    },
    // Configure projects for major browsers.
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                headless: !!process.env.E2E_ENV,
                viewport: {width: 1920, height: 1080}
            }
        }
    ],
    // Run your local dev server before starting the tests.
    webServer: {
        command: 'npm run e2e:dev',
        timeout: 300 * 1000,
        url: 'http://127.0.0.1:8998',
        reuseExistingServer: !process.env.E2E_ENV
    }
});
