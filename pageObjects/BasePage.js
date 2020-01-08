import WebdriverSingleton from '../helpers/driver';
import { decorationMethod, screenshotWithCircle } from '../utils';
import { conf } from '../hostConfig';


export class BasePage {
    constructor() {
        const webdriverConstructor = WebdriverSingleton.instance;

        this.driver = webdriverConstructor.getDriver();

        this.by = webdriverConstructor.By;
        this.until = webdriverConstructor.until;

        this.timeout = 10000;
    }

    _locatorObj(locator) {
        return this.by.xpath(locator);
    }

    async page(pageUrl = conf.host) {
        await this.driver.get(pageUrl);
        await screenshotWithCircle(this.driver, `Страница ${pageUrl}`);
    }

    async elementLocated(locator, timeout = this.timeout) {
        return this.driver.wait(this.until.elementLocated(this._locatorObj(locator)), timeout);
    }

    async elementsLocated(locator, timeout = this.timeout) {
        return this.driver.wait(this.until.elementsLocated(this._locatorObj(locator)), timeout);
    }

    async scrollToElement(element) {
        await this.driver.executeScript('arguments[0].scrollIntoView()', element);
        await this.driver.executeScript('window.scrollBy(0, -100)');
        await this.driver.sleep(200);
    }

    async checkRedirect(expectUrl) {
        await this.driver.wait(this.until.urlIs(expectUrl), this.timeout);
        await screenshotWithCircle(this.driver, `Проверка редиректа на страницу ${expectUrl}`);
    }
}

const steps = {
    page: (url) => `Страница ${url === undefined ? conf.host : url}`,
    checkRedirect: (expectUrl) => `Проверка редиректа. Ожидаем: ${expectUrl}`,
};

decorationMethod(BasePage, 'page', steps);
decorationMethod(BasePage, 'checkRedirect', steps);
