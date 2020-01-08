const { beforeEach, afterEach } = require('mocha');
const { screenshotWithCircle, stepIncrementer, logger } = require('../utils');
const Singleton = require('./driver');
const conf = require('../hostConfig');


// eslint-disable-next-line prefer-arrow-callback
beforeEach('create webdriver instance', async function before() {
    const driverConstructor = Singleton.instance;
    await driverConstructor.createDriver();

    stepIncrementer.counterReset();

    allure.addEnvironment('BROWSER', `${conf.browser}`);
    allure.addEnvironment('ENV', `${conf.host}`);
});

afterEach('take screenshot on failure', async function after() {
    const driver = Singleton.instance;
    if (this.currentTest.state !== 'passed') {
        await screenshotWithCircle(await driver.getDriver(), 'СКРИНШОТ ОШИБКИ!');
        await allure.createAttachment(`Logs ERROR.`, (logger.logs.map((x) => `${x.timestamp}: ${x.message}`)).join('\n'));
        logger.clear();
    }

    await driver.quitDriver();
});
