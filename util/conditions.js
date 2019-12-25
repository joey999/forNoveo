const WebElementCondition = require('selenium-webdriver').WebElementCondition;

exports.elementTextIs = function elementTextIs(element, text) {
    return new WebElementCondition('until element text is', function () {
        return element.getAttribute('value').then(t => t === text ? element : null);
    });
};

exports.elementTextNotEmpty = function elementTextNotEmpty(element) {
    return new WebElementCondition('until element text is', function () {
        return element.getText().then(t => t !== '' ? element : null);
    });
};
exports.elementInputNotEmpty = function elementTextNotEmpty(element) {
    return new WebElementCondition('until element text is', function () {
        return element.getAttribute("value").then(t => t !== '' ? element : null);
    });
};

exports.elementClickUntilLocated = function elementTextNotEmpty(element, locator) {
    return new WebElementCondition('click until element located', function () {
        return element.click().then(() => {
            let statusEl = element.findElement(locator)
                .then(e => true)
                .catch(err => false);
            return element || null
        });
    });
};
