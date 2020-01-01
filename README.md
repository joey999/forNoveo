# forNoveo
Example of my test-framework code for Noveo group.

## Setup

1. git clone https://github.com/joey999/forNoveo.git && cd forNoveo`
2. npm install
3. Run tests via `npm test`. It will start Selenium server and perform tests,
after tests will generate allure report and open automatically in your browser

For run tests without starting selenium server you must use command `npm run test:mocha` 
before that change the address of selenium grid in hostConfig.js `selenium: 'http://localhost:4444/wd/hub'`

For run tests in programmatically style use `npm run runner`

## Project structure

* **helpers/** – directory with helpers for working test-framework .
    * **hooks.js** – base class from which all pages are inherited
    * **stepIncrementer.js** – base class from which all pages are inherited
* **pageObjects/** – directory with page objects.
    * **BasePage.js** – base class from which all pages are inherited
    * **index.js** – combines all pages
    * **Start.js** – class with actions for main page https://noveogroup.ru/
    * **Vacancies.js** – class with actions for main page https://job.noveogroup.ru/
* **test/** – test files. Our setup uses [Mocha].
    * **start.js** – tests-cases example.
* **util/** - some utils .
    * **conditions.js** – custom conditions
    * **driver.js** - driver singleton class from library [selenium-webdriver]
    * **logger.js** - logger singleton class
    * **randomFuncs.js** - functions for generate random data 
    * **screenFunc.js** - function for write circle around webelement
    
* **hostConfig.js** - configuration webdriver
* **runner.js** - file for runnins mocha in programmatically-style
* **mocha.opts** - mocha configuration [Mocha-opts]
* **configForRunner.js** - config for runner.js 

[Mocha]: http://mochajs.org
[Mocha-opts]: https://mochajs.org/index.html#mochaopts
[selenium-webdriver]: https://selenium.dev/selenium/docs/api/javascript/
