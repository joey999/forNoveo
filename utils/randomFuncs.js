exports.makeRandomStringCyr = function makeRandomStringCyr(length) {
    let result = '';
    const characters = 'абвгдежзийклмнопрстуфхцчшщыэюя';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        if (i === 0) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength)).toUpperCase();
        }
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

exports.makeRandomStringLat = function makeRandomStringLat(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

exports.makeRandomNumber = function makeRandomNumber(length) {
    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    let randomInt = '';
    for (let i = 0; i < length; ++i) {
        randomInt += randomNum(1, 9);
    }

    return randomInt;
};

exports.getRandomInt = function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};
