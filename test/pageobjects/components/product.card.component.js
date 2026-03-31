const { $ } = require('@wdio/globals')

class ProductCardComponent {
    constructor(rootSelector) {
        this.rootSelector = rootSelector
    }

    get root() {
        return $(this.rootSelector)
    }

    get title() {
        return this.root.$('.//div[contains(@class,"inventory_item_name")]')
    }

    get price() {
        return this.root.$('.//div[contains(@class,"inventory_item_price")]')
    }

    get actionButton() {
        return this.root.$('.//button')
    }

    async getTitle() {
        return this.title.getText()
    }

    async getPrice() {
        const text = await this.price.getText()
        return parseFloat(text.replace('$', ''))
    }

    async clickActionButton() {
        await this.actionButton.click()
    }
}

module.exports = ProductCardComponent