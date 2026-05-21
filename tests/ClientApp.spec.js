const { test, expect } = require('@playwright/test');

test('Page Context fixture - Playwright Test', async ({page}) => {
    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const signIn = page.locator("[value='Login']");
    const elementsTitle = page.locator(".card-body b");
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());
    await userName.fill("anshika@gmail.com");
    await password.fill("Iamking@000");
    await signIn.click();
    await elementsTitle.first().waitFor(); 
    // await page.waitForLoadState('networkidle');
    const titles = await elementsTitle.allTextContents();
    console.log(titles);
});