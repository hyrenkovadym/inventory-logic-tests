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
        const priceElements = await $$('//div[contains(@class,"inventory_item_price")]')
        const prices = []

        for (const priceEl of priceElements) {
            const text = await priceEl.getText()
            prices.push(parseFloat(text.replace('$', '')))
        }

        return prices
    }

    async addProductToCartByName(productName) {
        const button = await $(
            `//div[@class="inventory_item"][.//div[contains(@class,"inventory_item_name") and normalize-space(text())="${productName}"]]//button[contains(text(),"Add to cart")]`
        )
        await button.click()
    }

    async removeProductByName(productName) {
        const button = await $(
            `//div[@class="inventory_item"][.//div[contains(@class,"inventory_item_name") and normalize-space(text())="${productName}"]]//button[contains(text(),"Remove")]`
        )
        await button.click()
    }

    async getCartBadgeText() {
        const exists = await this.cartBadge.isExisting()
        if (!exists) {
            return '0'
        }
        return await this.cartBadge.getText()
    }

    async openCart() {
        await this.cartLink.click()
    }
}

module.exports = new InventoryPage()