const { expect } = require('chai');
const Base = require('./BasePage');
const { logger, screenshotWithCircle, arrayDeepResolver } = require('../utils');


class locators {
    static get vacancies() {
        return `//div[contains(@class, 'vacancies_page')]//*[contains(@class, 'vacancies-unit__title')]`;
    }

    static get title() {
        return `//*[contains(@class, 'title_page')]`;
    }
}

class Vacancies extends Base {
    async checkVacancies(arrVacancies) {
        const elsVac = await this.elementsLocated(locators.vacancies);
        logger.log(`Количество вакансий на странице: '${elsVac.length}'; Ожидаем: '${arrVacancies.length}'`);
        expect(elsVac.length).to.equal(arrVacancies.length);

        const textOfElements = await arrayDeepResolver(
            elsVac.map((x) => [x.getText(), x]),
        );

        for (const expectVacancy of arrVacancies) {
            const foundVacancy = textOfElements.find((x) => x.includes(expectVacancy));
            expect(foundVacancy).to.not.equal(undefined, `'${expectVacancy}' на странице не найдено!`);

            // eslint-disable-next-line no-await-in-loop
            await this.scrollToElement(foundVacancy[1]);
            // eslint-disable-next-line no-await-in-loop
            await screenshotWithCircle(this.driver, `Проверка вакансии '${expectVacancy}' на странице`, foundVacancy[1]);
        }
    }

    async checkTitle(expectTitle) {
        const elTitle = await this.elementLocated(locators.title);

        await screenshotWithCircle(this.driver, `Проверка тайтла страницы 'Вакансии'`, elTitle);
        expect(expectTitle).to.equal(await elTitle.getText(), 'Неверный тайтл!');
    }
}

module.exports = Vacancies;
