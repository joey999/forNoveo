# forNoveo
Example of my code for Noveo group.

## Setup

1. git clone https://github.com/joey999/forNoveo.git && cd forNoveo`
2. npm install
3. Run tests via `npm test`. It will start Selenium server and perform tests, after tests will generate allure report and open automatically in your browser
4. For run tests without starting selenium server you must 

## Project structure

* **helpers/** – directory with helpers for working test-framework .
    * **hooks.js** – base class from which all pages are inherited
    * **stepIncrementer.js** – base class from which all pages are inherited
* **pageObjects/** – directory with page objects. Page object is an convenient way to create reusable actions to interact with page .
    * **BasePage.js** – base class from which all pages are inherited
    * **Pages.js** – combines all pages
    * **Start.js** – class with actions for main page https://noveogroup.ru/
    * **Vacancies.js** – class with actions for main page https://job.noveogroup.ru/
* **test/** – test files. Our setup uses [Mocha].
    * **start.js** – tests-cases example.
* **util/** - additional helpers
    * **config.js** – configuration file where specified base options for tests. Here you can change target browser or page urls
    * **browser.js** - browser provider for your tests

[allure-cli]: https://github.com/allure-framework/allure-cli
[Mocha]: http://mochajs.org
[selenium-webdriver]: https://selenium.dev/selenium/docs/api/javascript/
