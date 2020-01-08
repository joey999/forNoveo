class StepIncrementer {
    constructor() {
        this.step = 0;
    }

    incrementStep() {
        this.step += 1;
        return this.step;
    }

    counterReset() {
        this.step = 0;
    }
}

module.exports = new StepIncrementer();
