import { After, Before, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, chromium, Page } from "playwright";

let page: Page;
let browser: Browser;

setDefaultTimeout(60000);

Before(async () => {
    try {
        browser = await chromium.launch({headless: false});
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://www.demoblaze.com");
    } catch(error) {
        console.log(`Navigation to the page failed because of ${error}`);
        throw new Error(`Navigation to the page failed because of ${error}`);
    }
    return page;
});

After(async () => {
    await browser.close();
});
export{ page, browser};