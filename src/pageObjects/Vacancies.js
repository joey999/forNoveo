const {expect} = require('chai');
const screenshotWithCircle = require('../util/screenFunc');
const conf = require('../util/hostConfig');
const Base = require('./BasePage');
const logger = require('../util/logger');


class locators {
    static get vacancies() {
        return `//div[contains(@class, 'vacancies_page')]//*[contains(@class, 'vacancies-unit__title')]`;
    }

    static get title() {
        return `//*[contains(@class, 'title_page')]`
    }
}

class Vacancies extends Base {

    async checkVacancies(arrVacancies) {
        const elsVac = await this.elementsLocated(locators.vacancies);
        logger.log(`Количество вакансий на странице: '${elsVac.length}'; Ожидаем: '${arrVacancies.length}'`);
        expect(elsVac.length).to.equal(arrVacancies.length);

        let text_of_elements = [];
        for (let el of elsVac) {
            text_of_elements.push([await el.getText(), el])
        }

        for (let expectVacancy of arrVacancies) {
            let findedVacancy = text_of_elements.find(x => x.includes(expectVacancy));
            expect(findedVacancy).to.not.equal(undefined, `'${expectVacancy}' на странице не найдено!`);

            await this.scrollToElement(findedVacancy[1]);
            await screenshotWithCircle(this.driver, `Проверка вакансии '${expectVacancy}' на странице`, findedVacancy[1]);
        }
    }

    async checkTitle(expectTitle) {
        const elTitle = await this.elementLocated(locators.title);

        await screenshotWithCircle(this.driver, `Проверка тайтла страницы 'Вакансии'`, elTitle);
        expect(expectTitle).to.equal(await elTitle.getText(), 'Неверный тайтл!');
    }

    async clickButton(buttonName) {
        const buttonEl = await this.elementLocated(this._locators('button', buttonName));

        await screenshotWithCircle(this.driver, `Нажимаем по кнопке '${buttonName}'`, buttonEl);
        await buttonEl.click();
    }

    async checkHeader(expectHeader) {
        const locator = "//h1[contains(@class, 'header')]";
        const headerEl = await this.elementLocated(locator);

        await screenshotWithCircle(this.driver, 'Проверка хидера', headerEl);

        return expect(expectHeader).to.equal(await headerEl.getText(), 'НЕВЕРНЫЙ ТАЙТЛ!!! ');
    }
}

module.exports = Vacancies;
