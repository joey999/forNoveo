const {expect} = require('chai');
const screenshotWithCircle = require('../util/screenFunc');
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
}

module.exports = Vacancies;
