const { beforeEach, afterEach } = require('mocha');
const Singleton = require('./driver');
const conf = require('../hostConfig');
const stepIncrementer = require('./stepIncrementer');


beforeEach('create webdriver instance', async () => {
    const driverConstructor = Singleton.instance;
    await driverConstructor.createDriver();

    const inc = stepIncrementer.getInstance();
    inc.counterReset();

    allure.addEnvironment('BROWSER', `${conf.browser}`);
    allure.addEnvironment('ENV', `${conf.host}`);
});

afterEach('take screenshot on failure', async function after() {
    if (this.currentTest.state === 'passed') {
        // await screenshot(browser, 'СКРИНШОТ ОШИБКИ!');
        // console.log('message after test!');
    }

    const dr = Singleton.instance;
    await dr.quitDriver();
});
