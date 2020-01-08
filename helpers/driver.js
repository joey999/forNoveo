import { By, until, Builder } from 'selenium-webdriver';
import { conf } from '../hostConfig';


// eslint-disable-next-line symbol-description
const singleton = Symbol();
// eslint-disable-next-line symbol-description
const singletonEnforcer = Symbol();

export default class WebdriverSingleton {
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
        this.driver = new Builder()
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
