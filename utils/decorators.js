const logger = require('./logger');
const stepIncrementer = require('./stepIncrementer');


module.exports = function step(target, name, descriptor, stepDescription) {
    const original = descriptor.value;
    if (typeof original === 'function') {
        descriptor.value = async function (...args) {
            const stepNumber = stepIncrementer.incrementStep();

            logger.log(`Step ${stepNumber}: ${name}`);
            logger.log(`Arguments: ${JSON.stringify(args)}`);
            try {

                return await allure.createStep(`Step ${stepNumber} (${name}): ${stepDescription(args !== [] ? args[0] : undefined)}`, async () => {

                    const originalApplied = await original.apply(this, args)
                        .catch(async e => {
                                await allure.createAttachment(`Logs ERROR. Step ${stepNumber} (${name})`, (logger.logs.map(x => `${x.timestamp}: ${x.message}`)).join('\n'));
                                throw e;
                            }
                        );

                    await allure.createAttachment(`Logs ${name}`, (logger.logs.map(x => `${x.timestamp}: ${x.message}`)).join('\n'));
                    await logger.clear();

                    return originalApplied;
                })();
            } catch (e) {
                logger.log(`Error: ${e}`);
                throw e;
            }
        }
    }
    return descriptor;
};
