const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ShopPage } = require('../pages/ShopPage');

test('Login and verify iphone X is present on shop page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const shopPage = new ShopPage(page);

  await loginPage.goto();
  await loginPage.login('rahulshettyacademy', 'Learning@830$3mK2');

  await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
  await shopPage.expectProductVisible('iphone X');
});

