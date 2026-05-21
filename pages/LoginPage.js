const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.termsCheckbox = page.locator('#terms');
    this.signInButton = page.locator('#signInBtn');
  }

  async goto() {
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.termsCheckbox.check();
    await this.signInButton.click();
    await expect(this.page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
  }
}

module.exports = { LoginPage };
