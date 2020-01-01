const { WebElementCondition } = require('selenium-webdriver');

exports.elementTextIs = function elementTextIs(element, text) {
    return new WebElementCondition('until element text is', (
        () => element.getAttribute('value').then((t) => (t === text ? element : null))));
};

exports.elementTextNotEmpty = function elementTextNotEmpty(element) {
    return new WebElementCondition('until element text is',
        () => element.getText().then((t) => (t !== '' ? element : null)));
};
exports.elementInputNotEmpty = function elementInputNotEmpty(element) {
    return new WebElementCondition('until element text is',
        () => element.getAttribute('value').then((t) => (t !== '' ? element : null)));
};

exports.elementClickUntilLocated = function elementClickUntilLocated(element, locator) {
    return new WebElementCondition('click until element located', () => element.click().then(() => {
        element.findElement(locator)
            .then(() => true)
            .catch(() => false);
        return element || null;
    }));
};
