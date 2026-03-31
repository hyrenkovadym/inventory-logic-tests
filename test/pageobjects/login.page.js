const { $ } = require('@wdio/globals')
const Page = require('./page')

class LoginPage extends Page {

    get username() {
        return $('#user-name')
    }

    get password() {
        return $('#password')
    }

    get loginBtn() {
        return $('#login-button')
    }

    open() {
        return super.open('/')
    }

    async login(user, pass) {
        await this.username.setValue(user)
        await this.password.setValue(pass)
        await this.loginBtn.click()
    }
}

module.exports = new LoginPage()