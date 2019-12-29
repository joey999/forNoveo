const { Builder } = require('selenium-webdriver');
const Mocha = require('mocha');
const config = require('./config');
const conf = require('./util/hostConfig');

const currentDate = Date.now().toString();

// eslint-disable-next-line max-len
// ES5 native `Array.prototype.forEach` is not async; since tests are executed asynchronously we're going to need an
// async version of `forEach`
// eslint-disable-next-line func-style
const asyncForEach = async (arr, cb) => {
    for (let i = 0; i < arr.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        await cb(arr[i], i, arr);
    }
};

(async () => {
    // Iterate over all browsers.
    await asyncForEach(config.browsers, async (browser) => {
        // Assign our BrowserStack access data to our browser.
        const bsConfig = Object.assign({
            'browserstack.user': '<your browserstack name>',
            'browserstack.key': '<your browserstack key>',
            // For local testing:
            // 'browserstack.local': 'true',
            // 'browserstack.localIdentifier': '<local identifier>'
        }, browser);

        // Iterate over all tests.
        await asyncForEach(config.tests, async testCase => {
            // Set the global `driver` variable which will be used within tests.
            const driver = await new Builder()
                .usingServer(conf.selenium)
                .withCapabilities({browserName: conf.browser})
                .build();

            // Create our Mocha instance
            let mocha = new Mocha({
                timeout: testCase.timeout,
                reporter: "mocha-multi"
            });

            mocha.globals(['driver']);
            mocha.driver = driver;


            // Since tests are executed asynchronously we're going to return a Promise here.
            return new Promise((resolve, reject) => {
                // By default `require` caches files, making it impossible to require the same file multiple times.
                // Since we want to execute the same tests against many browsers we need to prevent this behaviour by
                // clearing the require cache.
                mocha.suite.on('require', function (global, file) {
                    delete require.cache[file];
                });

                // Just so we can see what tests are executed in the console.
                console.log(!browser.device
                    ? `Running ${testCase.file} against ${browser.browserName} (${browser.browser_version}) on ${browser.os} (${browser.os_version})`
                    : `Running ${testCase.file} on ${browser.device}`
                );

                mocha.addFile(`${testCase.file}`);

                mocha.run()
                //     // Callback whenever a test fails.
                //     .on('fail', test => reject(new Error(`Selenium test (${test.title}) failed.`)))
                //     // When the test is over the Promise can be resolved.
                //     .on('end', () => resolve());
            });
        });
    });
})();
