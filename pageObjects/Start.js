const { expect } = require('chai');
const { screenshotWithCircle, decoration } = require('../utils');
const Base = require('./BasePage');


class locators {
    static title(titleName) {
        return `//div[contains(@class, 'index')]//*[contains(@class, 'title')][text()='${titleName}']`;
    }

    static button(buttonName) {
        return `//div[contains(@class, 'index')]//*[contains(@class, 'button')][text()='${buttonName}']`;
    }
}

class Start extends Base {
    async scrollToTitle(title) {
        const titleEl = await this.elementLocated(locators.title(title));
        await this.scrollToElement(titleEl);

        await screenshotWithCircle(this.driver, `Скролл в '${title}'`, titleEl);
    }

    async clickButton(buttonName) {
        await this.elementIsVisible(locators.button(buttonName));
        const buttonEl = await this.elementLocated(locators.button(buttonName));

        await screenshotWithCircle(this.driver, `Нажимаем по кнопке '${buttonName}'`, buttonEl);
        await buttonEl.click();
    }

    async checkHeader(expectHeader) {
        const locator = `//h1[contains(@class, 'header')]`;
        const headerEl = await this.elementLocated(locator);

        await screenshotWithCircle(this.driver, 'Проверка хидера', headerEl);

        return expect(expectHeader).to.equal(await headerEl.getText(), 'НЕВЕРНЫЙ ТАЙТЛ!!! ');
    }
}

const steps = {
    clickButton: (button) => `Клик по кнопке '${button}'`,
    scrollToTitle: (title) => `Скролл к тайтлу '${title}'`,
    checkHeader: (header) => `Проверка хидера. Ожидаем '${header}'`,
};

decoration.decorationClass(Start, steps);

module.exports = Start;
