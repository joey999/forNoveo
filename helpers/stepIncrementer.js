module.exports = {
    step: 0,
    getInstance() {
        return this;
    },
    incrementStep() {
        this.step += 1;
        return this.step;
    },
    counterReset() {
        this.step = 0;
    },
};
