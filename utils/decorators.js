import { logger } from './logger';
import { stepIncrementer } from './stepIncrementer';


export function step(target, name, descriptor, stepDescription) {
    const original = descriptor.value;
    if (typeof original === 'function') {
        // eslint-disable-next-line func-names,no-param-reassign
        descriptor.value = async function (...args) {
            const stepNumber = stepIncrementer.incrementStep();
            const stepName = `Step ${stepNumber} (${name}): ${stepDescription(args !== [] ? args[0] : undefined)}`;
            logger.log(stepName);
            logger.log(`Arguments: ${args.length === 1 && Array.isArray(args[0]) ? JSON.stringify(args[0], null, ' ') : JSON.stringify(args)}`);
            try {
                return await allure.createStep(stepName, async () => {
                    const originalApplied = await original.apply(this, args)
                        .catch(async (e) => {
                            await allure.createAttachment(`Logs ERROR. Step ${stepNumber} (${name})`, (logger.logs.map((x) => `${x.timestamp}: ${x.message}`)).join('\n'));
                            throw e;
                        });

                    await allure.createAttachment(`Logs ${name}`, (logger.logs.map((x) => `${x.timestamp}: ${x.message}`)).join('\n'));
                    await logger.clear();

                    return originalApplied;
                })();
            } catch (e) {
                logger.log(`Error: ${e}`);
                throw e;
            }
        };
    }
    return descriptor;
}
