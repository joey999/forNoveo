const { step } = require('./index');

exports.decorationClass = function decorationClass(cls, steps) {
    // eslint-disable-next-line array-callback-return
    Object.getOwnPropertyNames(cls.prototype).map((prop) => {
        if (!['constructor', '_locators'].includes(prop)) {
            let descriptor = Object.getOwnPropertyDescriptor(cls.prototype, prop);
            descriptor = step(cls.prototype, prop, descriptor, steps[prop]);
            Object.defineProperty(cls.prototype, prop, descriptor);
        }
    });
    return cls;
};

exports.decorationMethod = function decorationMethod(cls, prop, steps) {
    let descriptor = Object.getOwnPropertyDescriptor(cls.prototype, prop);
    descriptor = step(cls.prototype, prop, descriptor, steps[prop]);
    Object.defineProperty(cls.prototype, prop, descriptor);
    return cls;
};
