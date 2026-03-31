const { $$ } = require('@wdio/globals')
const Page = require('./page')

class CartPage extends Page {
    get cartItems() {
        return $$('//div[contains(@class,"cart_item")]')
    }

    get removeButtons() {
        return $$('//button[contains(text(),"Remove")]')
    }

    async getItemNames() {
        const items = await $$('//div[contains(@class,"inventory_item_name")]')
        const names = []

        for (const item of items) {
            names.push(await item.getText())
        }

        return names
    }

    async getItemsCount() {
        const items = await this.cartItems
        return items.length
    }

    async isProductPresent(productName) {
        const names = await this.getItemNames()
        return names.includes(productName)
    }

    async clearCart() {
        let buttons = await this.removeButtons

        while (buttons.length > 0) {
            await buttons[0].click()
            buttons = await this.removeButtons
        }
    }
}

module.exports = new CartPage()