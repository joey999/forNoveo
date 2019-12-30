class Logger {
    constructor() {
        this.logs = [];
    }

    get count() {
        return this.logs.length;
    }

    clear() {
        this.logs = [];
        return this.logs;
    }

    log(message) {
        const timestamp = new Date().toISOString();
        this.logs.push({ message, timestamp });
        console.log(`${timestamp} - ${message}`);
    }
}

// class Singleton {
//
//     constructor() {
//         if (!Singleton.instance) {
//             Singleton.instance = new Logger();
//         }
//     }
//
//     getInstance() {
//         return Singleton.instance;
//     }
//
// }

module.exports = new Logger();
