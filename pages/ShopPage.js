const { expect } = require('@playwright/test');

class ShopPage {
  constructor(page) {
    this.page = page;
  }

  productLocator(productName) {
    return this.page.locator('.card-body a', { hasText: productName });
  }

  async expectProductVisible(productName) {
    await expect(this.productLocator(productName)).toBeVisible();
  }
}

module.exports = { ShopPage };
