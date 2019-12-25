function makeRandomStringCyr(length) {
    let result = '';
    let characters = 'абвгдежзийклмнопрстуфхцчшщыэюя';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        if (i === 0) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength)).toUpperCase()
        }
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

function makeRandomStringLat(length) {
    let result = '';
    let characters = 'abcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

function makeRandomNumber(length) {
    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
    }

    let random_int = '';
    for (let i = 0; i < length; ++i) {
        random_int = random_int + randomNum(1, 9)
    }

    return random_int
}


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


module.exports = {makeRandomNumber, makeRandomStringLat, makeRandomStringCyr, getRandomInt};
