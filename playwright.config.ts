import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',                
  timeout: 30 * 1000,                
  retries: 1,                        
  use: {
    headless: false,                
    baseURL: 'https://playwright.dev',  
    screenshot: 'on',                // Capture screenshots on failure
    video: 'retain-on-failure',      // Record video only when failed
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
