async function waitLoader(driver) {
    console.log('loader is visible! Loading page...');

    await driver.wait(() => {
        return driver.findElement(By.xpath("//div[@class='loader']"))
            .then((el) => {
                return false
            })
            .catch((err) => {
                if (err.name === 'NoSuchElementError') {
                    return true
                }
            })
    }, 30000)
        .catch((err) => {
            if (err.name === 'TimeoutError') {
                assert.throw("Loader is hung =( " + err)
            } else {
                assert.throw(err)
            }
        });
}

module.exports = waitLoader;
