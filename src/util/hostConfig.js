module.exports = {
    host: 'https://noveogroup.ru',
    proxy: {
        http: process.env.http_proxy,
        https: process.env.https_proxy,
    },
    browser: 'chrome',
    selenium: 'http://localhost:4444/wd/hub',
};
