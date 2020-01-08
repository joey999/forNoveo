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
        this.logs.push({message, timestamp});
        console.log(`${timestamp} - ${message}`);
    }
}

export const logger = new Logger();
