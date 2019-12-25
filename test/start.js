"use strict";
const describeWithBrowser = require("../util/browser");
const screenshot = require("../util/screenFunc");
const Pages = require("../pageObjects/Pages");
const conf = require("../util/hostConfig");


let browser;


describeWithBrowser(
    "Check lending ",
    b => (browser = b),
    () => {

        describe("Open https://noveogroup.ru/", () => {

            xit("and check header text 'Noveo' ", async () => {

                allure.addEnvironment('BROWSER', `${conf.browser}`);
                allure.addEnvironment('ENV', `${conf.host}`);

                const startPage = new Pages.Start(browser);
                await startPage.page();

                await startPage.checkHeader("Noveo");
            });
            it("and scroll to 'Горячие вакансии' and click to button 'Все вакансии' ", async () => {

                const startPage = new Pages.Start(browser);
                await startPage.page();

                await startPage.scrollToTitle('Горячие вакансии');
                await startPage.clickButton('Все вакансии');

                // await browser.sleep(100000);
            });
        });

        afterEach("take screenshot on failure", async function () {
            if (this.currentTest.state !== "passed") {
                await screenshot(browser, 'СКРИНШОТ ОШИБКИ!');
            }
        });
    }
);
