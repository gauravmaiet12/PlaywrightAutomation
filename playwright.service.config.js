const { defineConfig } = require('@playwright/test');
const { createAzurePlaywrightConfig, ServiceOS } = require('@azure/playwright');
const { DefaultAzureCredential } = require('@azure/identity');

const baseConfig = require('./playwright.config');

module.exports = defineConfig(
  createAzurePlaywrightConfig(baseConfig, {
    exposeNetwork: '<loopback>',
    connectTimeout: 3 * 60 * 1000,
    os: ServiceOS.LINUX,
    credential: new DefaultAzureCredential()
  }),
  {
    reporter: [
      ['list'],
      ['html', { open: 'never' }],
      ['@azure/playwright/reporter']
    ]
  }
);
