const Mocha = require('mocha');
const config = require('./config');


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

        // Iterate over all tests.
        await asyncForEach(config.tests, async testCase => {

            // Create our Mocha instance
            let mocha = new Mocha({
                timeout: testCase.timeout,
                reporter: "mocha-multi"
            });

            return new Promise((resolve, reject) => {
                mocha.suite.on('require', function (global, file) {
                    delete require.cache[file];
                });

                // Just so we can see what tests are executed in the console.
                console.log(`Running ${testCase.file} against ${browser.browserName} on ${browser.os}`);

                mocha.addFile(`${testCase.file}`);

                mocha.run()
                    // Callback whenever a test fails.
                    .on('fail', test => reject(new Error(`Selenium test (${test.title}) failed.`)))
                    // When the test is over the Promise can be resolved.
                    .on('end', () => resolve());
            });
        });
    });
})();
