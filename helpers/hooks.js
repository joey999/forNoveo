import { beforeEach, afterEach } from 'mocha';
import { screenshotWithCircle, logger, stepIncrementer } from '../utils';
import Singleton from './driver';
import { conf } from '../hostConfig';
// const logger = Logger.instance;


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
