/* eslint-disable no-await-in-loop */
module.exports = async function arrayDeepResolver(arr) {
    const treeResoled = [];
    for (const el of arr) {
        if (Array.isArray(el)) {
            treeResoled.push(await arrayDeepResolver(el));
        } else {
            treeResoled.push(await el);
        }
    }
    return treeResoled;
};
