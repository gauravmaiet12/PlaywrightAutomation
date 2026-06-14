const { test, expect } = require('@playwright/test');

test('@smoke Brower Context fixture - Playwright Test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    const password = page.locator("[type='password']");
    const signIn = page.locator('#signInBtn');
    const elementsTitle = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await userName.fill("rahulshetty");
    await password.fill("learning");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await password.fill("");
    await password.fill("Learning@830$3mK2");
    await signIn.click();
    // console.log(await elementsTitle.first().textContent());
    // console.log(await elementsTitle.nth(1).textContent());
    const allTitles = await elementsTitle.allTextContents();
    console.log(allTitles);
});

test('Page fixture - Playwright Test', async ({ page }) => {
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test('@regression Page fixture - Playwright Test Dropdpwn', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const password = page.locator("[type='password']");
    const dropdown = page.locator("select.form-control");
    const radio = page.locator(".radiotextsty");
    const okbtn = page.locator("#okayBtn");
    const chkbox = page.locator("#terms");
    const documentlink = page.locator("[href*='documents-request']");

    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await dropdown.selectOption("consult");
    await radio.last().click();
    await okbtn.click();
//Assertion
    await expect(radio.last()).toBeChecked();
    console.log(await radio.last().isChecked());

    await chkbox.click();
    await expect(chkbox).toBeChecked();
    await chkbox.uncheck();
    expect(await chkbox.isChecked()).toBeFalsy();
    await expect(documentlink).toHaveAttribute("class","blinkingText");
}); 

test.only(@sanity 'Child Window Handling', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentlink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all(
    [
    context.waitForEvent('page'),
    documentlink.click(),
    ]
    );
    await newPage.waitForLoadState();
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const email = arrayText[1].split(" ")[0];
    // console.log(email);

    // Enter this user name to the parent window
    await userName.fill(email);
    // await page.pause();
    console.log(await userName.inputValue()); 
});

