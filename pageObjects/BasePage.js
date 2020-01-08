const WebdriverSingleton = require('../helpers/driver');
const { screenshotWithCircle, decoration } = require('../utils');
const conf = require('../hostConfig');


class Base {
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

    async elementIsVisible(locator, timeout = this.timeout) {
        return this.driver.wait(this.until.elementIsVisible(this._locatorObj(locator)), timeout);
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

decoration.decorationMethod(Base, 'page', steps);
decoration.decorationMethod(Base, 'checkRedirect', steps);

module.exports = Base;
