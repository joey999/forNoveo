const screenshotWithCircle = require('../util/screenFunc');
const conf = require("../util/hostConfig");
const expect = require('chai').expect;
const Base = require("./BasePage");

class locators {
    static title(titleName) {
        return `//div[contains(@class, 'index')]//*[contains(@class, 'title')][text()='${titleName}']`
    }

    static button(buttonName) {
        return `//div[contains(@class, 'index')]//*[contains(@class, 'button')][text()='${buttonName}']`
    }
}

class Start extends Base {

    _locators(locatorName, objectName) {
        return locators[locatorName](objectName)
    }

    async page() {
        await this.driver.get(conf.host);
    }

    async scrollToTitle(title) {
        const titleEl = await this.elementLocated(this._locators('title', title));
        await this.scrollToElement(titleEl);

        await screenshotWithCircle(this.driver, `Скролл в '${title}'`, titleEl);
    }

    async clickButton(buttonName) {
        const buttonEl = await this.elementLocated(this._locators('button', buttonName));

        await screenshotWithCircle(this.driver, `Нажимаем по кнопке '${buttonName}'`, buttonEl);
        await buttonEl.click();
    }

    async checkHeader(expectHeader) {
        let locator = "//h1[contains(@class, 'header')]";
        let headerEl = await this.elementLocated(locator);

        await screenshotWithCircle(this.driver, 'Проверка хидера', headerEl);

        return expect(expectHeader).to.equal(await headerEl.getText(), 'НЕВЕРНЫЙ ТАЙТЛ!!! ')
    }
}

module.exports = Start;
