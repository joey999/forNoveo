const WebdriverSingleton = require('../helpers/driver');
const { screenshotWithCircle } = require('../utils');
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
    }
}

module.exports = Base;
