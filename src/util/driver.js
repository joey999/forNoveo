const webdriver = require('selenium-webdriver');
const { By, until } = require('selenium-webdriver');
const conf = require('./hostConfig');


let singleton = Symbol();
let singletonEnforcer = Symbol();

class WebdriverSingleton {

    constructor(enforcer) {
        if (enforcer !== singletonEnforcer)
            throw "Instantiation failed: use Singleton.getInstance() instead of new.";

        // код конструктора
        this.driver = null;
        this.By = By;
        this.until = until;
    }

    static get instance() {
        if (!this[singleton])
            this[singleton] = new WebdriverSingleton(singletonEnforcer);
        return this[singleton];
    }

    createDriver () {
        return this.driver = new webdriver.Builder()
            .usingServer(conf.selenium)
            .withCapabilities({'browserName': conf.browser})
            .build();
    }

    getDriver(){
        return this.driver;
    }

    quitDriver () {
        return this.driver.quit();
    }
}


module.exports = WebdriverSingleton;
