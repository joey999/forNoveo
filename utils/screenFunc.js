// /* eslint-disable */
import { logger } from './logger';
// const logger = Logger;


/**
 * Функция приаттачивает скриншот в степе allure
 * @param {string} name
 * @param {webdriver} browser
 * @returns {Promise<void>}
 * @private
 */
async function screen_(name = 'забыл указать имя', browser) {
    await browser.takeScreenshot().then(async (png) => {
        await allure.createAttachment(`Screenshot: ${name}`, () => new Buffer.from(png, 'base64'), 'image/png')();
    });
}
/**
 * JS-скрипт обводки
 * @param {object} rect - object with size of the DOMElement
 */
function cirleClickingObject(rect) {
    const newDiv = document.createElement('div');
    newDiv.style.background = 'red';
    newDiv.style.position = 'absolute';
    newDiv.style.height = `${rect.height + 80}px`;
    newDiv.style.width = `${rect.width + 80}px`;
    newDiv.style.border = '2px solid red';
    newDiv.style.background = 'none';
    newDiv.style.borderRadius = '50%';
    newDiv.style.top = `${rect.y - 40}px`;
    newDiv.style.left = `${rect.x - 40}px`;
    newDiv.style.zIndex = 10000;
    newDiv.className = 'circle-clicking-object';
    document.body.appendChild(newDiv);
    console.log(`${rect.x}, ${rect.y}, ${rect.width}, ${rect.height}`);
}

/**
 * Функция удаляет обводку из DOM'а
 */
function deleteCircleClickingObjectFromDOM() {
    const el = document.querySelector('.circle-clicking-object');
    document.body.removeChild(el);
}
/**
 * Главная функция скриншота
 * @param {webdriver} browser - webdriver instance
 * @param {string} text - step name for allure
 * @param {webdriver} item - object to circle
 * @param {boolean} circle - circle turn on/off
 */
export async function screenshotWithCircle(browser, text, item = null, circle = true) {
    logger.log(text);
    const rect = (circle && item) ? await item.getRect() : '';
    if (circle && item) await browser.executeScript(cirleClickingObject, rect);
    await screen_(text, browser);
    if (circle && item) await browser.executeScript(deleteCircleClickingObjectFromDOM);
}
