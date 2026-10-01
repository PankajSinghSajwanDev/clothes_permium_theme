const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: false,
  retries: 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3456',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'node tests/preview-server.js',
    url: 'http://localhost:3456',
    reuseExistingServer: !process.env.CI,
    timeout: 10000,
  },
});
