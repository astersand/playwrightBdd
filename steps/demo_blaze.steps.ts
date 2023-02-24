import { Given, Then, When } from "@cucumber/cucumber";
import { page } from "../steps/world";
import { expect } from "@playwright/test";


Given('I am on {string} page', async (expectedText) => {
    const actualText = await page.locator("#nava").textContent();
    expect(expectedText).toEqual(actualText?.trim());
});

When('I click categories link', async () => {
    await page.locator("#cat").click();
});

Then('I see {string}, {string} and {string} under categories', async (string, string2, string3) => {
    const actualSubLinks = await page.locator("div[class='list-group'] > a:not([id=cat])").allTextContents();
    const expectedSubLinks = [string, string2, string3];
    expect(actualSubLinks).toEqual(expectedSubLinks);
});

When('I choose {string}', async (expectedCategory) => {
    const sublinks = page.locator("div[class='list-group'] a");
    const sublinksCount = await page.locator("div[class='list-group'] a").count();
    for(let i = 0; i < sublinksCount; i++) {
        if(await sublinks.nth(i).textContent() === expectedCategory) {
            sublinks.nth(i).click();
            break;
        }
    }

});

Then('I see {string} in display', async (actualProduct) => {
    const product = await page.locator(`div[class='col-lg-4 col-md-6 mb-4']:nth-child(1) h4`).textContent();
    expect(product).toEqual(actualProduct);
});