module.exports = {
    presets: [
        ['@babel/env', {
            targets: {
                node: 'current',
            },
        }],
    ],
    plugins: [
        ['@babel/transform-runtime'],
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
    ],
};
