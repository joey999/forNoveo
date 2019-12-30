module.exports = {
    step: 0,
    getInstance() {
        return this
    },
    incrementStep() {
        this.step++;
        return this.step;
    },
    counterReset() {
        this.step = 0;
    }
};
