const {By, until} = require('selenium-webdriver');
// const actions = require('selenium-webdriver/lib/input').Actions;
const screenshotWithCircle = require('../util/screenFunc');
const conf = require("../util/hostConfig");
const logger = require("../util/logger");
const assert = require('chai').assert;
const expect = require('chai').expect;
const {waitLoader} = require('../util/randomFuncs');

let passwordInput = "//input[contains(@name, 'Password')]";
let nameInput = "//input[contains(@name, 'UserName')]";
let loginButton = "";


class Base {

    constructor(driver) {
        this.driver = driver;
    }

    _locatorObj(locator) {
        return By.xpath(locator)
    }

    async elementLocated(locator, timeout = 10000) {

        return this.driver.wait(until.elementLocated(this._locatorObj(locator)), timeout);
    }

    async scrollToElement(element) {
        await this.driver.executeScript('arguments[0].scrollIntoView()', element);
    }

    /**
     * Ожидание загрузки страницы
     * @returns {Promise<void>}
     * @param locator
     */
    async waitFor(locator = ".//div/load") {

        logger.log('======================>> Ожидание загрузки страницы... << ====================');
        const waitArray = await this.driver.findElements(this._locatorObj(locator))
            .then(async () => {
                for (let i = 0; i < waitArray.length; i++) {
                    await this.driver.wait(until.elementIsNotVisible(waitArray[i]), 20000);
                }
            })
            .catch(() => {
                console.log('============ Ожидание завершено =============')
            })
    }
}

module.exports = Base;
