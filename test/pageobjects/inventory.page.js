const { $, $$ } = require('@wdio/globals')
const Page = require('./page')

class InventoryPage extends Page {
    get sortDropdown() {
        return $('//select[contains(@class,"product_sort_container")]')
    }

    get cartBadge() {
        return $('//span[contains(@class,"shopping_cart_badge")]')
    }

    get productsTitle() {
        return $('//span[contains(@class,"title")]')
    }

    get inventoryItems() {
        return $$('//div[contains(@class,"inventory_list")]//div[contains(@class,"inventory_item")]')
    }

    get cartLink() {
        return $('//a[contains(@class,"shopping_cart_link")]')
    }

    async isLoaded() {
        await this.productsTitle.waitForDisplayed()
    }

    async sortByVisibleText(text) {
        await this.sortDropdown.selectByVisibleText(text)
    }

    async getAllPrices() {
        const items = await this.inventoryItems
        const prices = []

        for (const item of items) {
            const priceEl = await item.$('.//div[contains(@class,"inventory_item_price")]')
            const text = await priceEl.getText()
            prices.push(parseFloat(text.replace('$', '')))
        }

        return prices
    }

    async addProductToCartByName(productName) {
        const button = await $(
            `//div[contains(@class,"inventory_item")][.//div[contains(@class,"inventory_item_name") and normalize-space(text())="${productName}"]]//button[contains(text(),"Add to cart")]`
        )
        await button.click()
    }

    async removeProductByName(productName) {
        const button = await $(
            `//div[contains(@class,"inventory_item")][.//div[contains(@class,"inventory_item_name") and normalize-space(text())="${productName}"]]//button[contains(text(),"Remove")]`
        )
        await button.click()
    }

    async getCartBadgeText() {
        const isExisting = await this.cartBadge.isExisting()
        if (!isExisting) {
            return '0'
        }
        return this.cartBadge.getText()
    }

    async openCart() {
        await this.cartLink.click()
    }
}

module.exports = new InventoryPage()