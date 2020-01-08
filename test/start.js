import { describe, it } from 'mocha';
import * as Pages from '../pageObjects';
import '../helpers/hooks';

describe('Лендинг ', () => {
    describe('https://noveogroup.ru/', () => {
        it(`проверка текста в хидере 'Noveo' `, async () => {
            const startPage = new Pages.Start();
            await startPage.page();

            await startPage.checkHeader('Noveo');
        });
        it(`проверка фиксированность хидера 'Noveo' после срола`, async () => {
            allure.description('Проверка зафиксированного хидера при скроле');

            const startPage = new Pages.Start();
            await startPage.page();

            await startPage.scrollToTitle('Горячие вакансии');
            await startPage.checkHeader('Noveo');
        });
        it(`скролл в 'Горячие вакансии' и клик по кнопке 'Все вакансии' и проверка редиректа`, async () => {
            allure.description(`Проверка редиректа после нажатия на кнопку 'Все вакансии'`);

            const startPage = new Pages.Start();
            await startPage.page();
            await startPage.scrollToTitle('Горячие вакансии');
            await startPage.clickButton('Все вакансии');

            await startPage.checkRedirect('https://job.noveogroup.ru/');

            const vacanciesPage = new Pages.Vacancies();
            await vacanciesPage.checkTitle('Все вакансии');
        });
        it(`проверка списка вакансий на странице 'Все вакансии' (Пример ассерта)`, async () => {
            allure.description(`Проверка списка вакансий`);

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
                'Tестировщик автоматизатор / QA automation engineer',
            ]);
        });
    });
});
