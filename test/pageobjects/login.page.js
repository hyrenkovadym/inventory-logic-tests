const { $ } = require('@wdio/globals')
const Page = require('./page')

class LoginPage extends Page {
    open() {
        return browser.url('https://www.saucedemo.com/')
    }

    get username() {
        return $('#user-name')
    }

    get password() {
        return $('#password')
    }

    get loginBtn() {
        return $('#login-button')
    }

    async login(user, pass) {
        await this.username.waitForDisplayed()

        await this.username.setValue(user)
        await this.password.setValue(pass)
        await this.loginBtn.click()
    }
}

module.exports = new LoginPage()