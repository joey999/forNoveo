const Singleton =  require('../util/driver');
const { beforeEach, afterEach } = require('mocha');
const conf = require('../util/hostConfig');
let stepIncrementer = require('./stepIncrementer');


beforeEach('create webdriver instance', async function before() {
    let driverConstructor = Singleton.instance;
    await driverConstructor.createDriver();

    let inc = stepIncrementer.getInstance();
    inc.counterReset();

    allure.addEnvironment('BROWSER', `${conf.browser}`);
    allure.addEnvironment('ENV', `${conf.host}`);
});

afterEach('take screenshot on failure', async function after() {
    if (this.currentTest.state === 'passed') {
        // await screenshot(browser, 'СКРИНШОТ ОШИБКИ!');
        // console.log('message after test!');
    }

    let dr = Singleton.instance;
    await dr.quitDriver();

});
