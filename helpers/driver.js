const webdriver = require('selenium-webdriver');
const { By, until } = require('selenium-webdriver');
const conf = require('../hostConfig');


// eslint-disable-next-line symbol-description
const singleton = Symbol();
// eslint-disable-next-line symbol-description
const singletonEnforcer = Symbol();

class WebdriverSingleton {
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            return new Error('Instantiation failed: use Singleton.getInstance() instead of new.');
        }

        this.driver = null;
        this.By = By;
        this.until = until;
    }

    static get instance() {
        if (!this[singleton]) this[singleton] = new WebdriverSingleton(singletonEnforcer);
        return this[singleton];
    }

    createDriver() {
        this.driver = new webdriver.Builder()
            .usingServer(conf.selenium)
            .withCapabilities({ browserName: conf.browser })
            .build();
        return this.driver;
    }

    getDriver() {
        return this.driver;
    }

    quitDriver() {
        return this.driver.quit();
    }
}


module.exports = WebdriverSingleton;
