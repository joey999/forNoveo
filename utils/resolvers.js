/* eslint-disable no-await-in-loop */
export async function arrayDeepResolver(arr) {
    const treeResoled = [];
    for (const el of arr) {
        if (Array.isArray(el)) {
            treeResoled.push(await arrayDeepResolver(el));
        } else {
            treeResoled.push(await el);
        }
    }
    return treeResoled;
}
