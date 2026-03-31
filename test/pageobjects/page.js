const { browser } = require('@wdio/globals')

class Page {
    open(path = '') {
        return browser.url(path)
    }
}

module.exports = Page