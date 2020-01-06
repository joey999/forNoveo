const { describe, it } = require('mocha');
const Pages = require('../pageObjects');
require('../helpers/hooks');


describe('Check lending ', () => {
    describe('Open https://noveogroup.ru/', () => {
        // it(`and check header text 'Noveo' `, async () => {
        //     const startPage = new Pages.Start();
        //     await startPage.page();
        //
        //     await startPage.checkHeader('Noveo');
        // });
        it(`and scroll to 'Горячие вакансии' and click to button 'Все вакансии' and check redirect`, async () => {
            const startPage = new Pages.Start();
            await startPage.page();
            await startPage.scrollToTitle('Горячие вакансии');
            await startPage.clickButton('Все вакансии');

            await startPage.checkRedirect('https://job.noveogroup.ru/');

            const vacanciesPage = new Pages.Vacancies();
            await vacanciesPage.checkTitle('Все вакансии2');
        });
        it(`check vacancies list in page 'Все вакансии' `, async () => {
            const vacanciesPage = new Pages.Vacancies();
            await vacanciesPage.page('https://job.noveogroup.ru/');

            await vacanciesPage.checkTitle('Все вакансии');

            await vacanciesPage.checkVacancies([
                'Ruby on Rails-разработчик',
                'Golang-разработчик',
                'Менеджер проектов',
                'iOS-разработчик',
                'PHP-разработчик',
                'Разработчик React Native',
                'Ruby on Rails-разработчик',
                'Разработчик C/C++ (embedded systems)',
                'HR-manager',
                'Преподаватель английского языка',
                'Tестировщик ПО / QA engineer',
            ]);
        });
    });
});

class o {
    b(){
        return console.log('pisl')
    }
}
Object.defineProperty(o, "b", {value : function(){ return console.log('asdf'); },
    writable : true,
    enumerable : true,
    configurable : true});


