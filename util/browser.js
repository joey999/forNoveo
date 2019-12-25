const webdriver = require('selenium-webdriver');
const proxy = require('selenium-webdriver/proxy');
const conf = require('./hostConfig');


module.exports = function describeWithBrowser(name, callback, body) {
    let browser;
    describe(name, () => {

        beforeEach(async () => {

            let capabilities;
            if (conf.browser === 'ie') {
                capabilities = {
                    'se:ieOptions': {
                        "ie.ensureCleanSession": true,
                    },
                    "timeouts": {
                        "script": 300000
                    },
                    'browserName': 'internet explorer',
                }
            } else {
                capabilities = {'browserName': conf.browser}
            }

            browser = new webdriver.Builder()
                .usingServer(conf.selenium)
                .withCapabilities(capabilities)
                // .setProxy(proxy.manual(conf.proxy))
                .build();
            await browser.get(conf.host);
            if (!process.env.local) {
                await browser.manage().window().maximize();
            }
            callback(browser);
        });

        body();

        afterEach(() => {
            return browser.quit();
        });
    });
};
