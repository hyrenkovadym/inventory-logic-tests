const LoginPage = require('../pageobjects/login.page')
const InventoryPage = require('../pageobjects/inventory.page')
const CartPage = require('../pageobjects/cart.page')
const { isSorted } = require('../utils/sort.utils')

describe('Inventory Logic Flow', () => {
    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await InventoryPage.isLoaded()

        const badgeText = await InventoryPage.getCartBadgeText()

        if (badgeText !== '0') {
            await InventoryPage.openCart()
            await CartPage.clearCart()
            await browser.back()
            await InventoryPage.isLoaded()
        }
    })

    it('should validate sorting from low to high', async () => {
        await InventoryPage.sortByVisibleText('Price (low to high)')

        const prices = await InventoryPage.getAllPrices()

        await expect(isSorted(prices, 'asc')).toEqual(true)
    })

    it('should validate cart badge and cart content after add/remove actions', async () => {
        await expect(await InventoryPage.getCartBadgeText()).toEqual('0')

        await InventoryPage.addProductToCartByName('Sauce Labs Backpack')
        await InventoryPage.addProductToCartByName('Sauce Labs Bike Light')

        await expect(await InventoryPage.getCartBadgeText()).toEqual('2')

        await InventoryPage.openCart()

        await expect(await CartPage.getItemsCount()).toEqual(2)
        await expect(await CartPage.isProductPresent('Sauce Labs Backpack')).toEqual(true)
        await expect(await CartPage.isProductPresent('Sauce Labs Bike Light')).toEqual(true)

        await browser.back()
        await InventoryPage.isLoaded()

        await InventoryPage.removeProductByName('Sauce Labs Backpack')

        await expect(await InventoryPage.getCartBadgeText()).toEqual('1')

        await InventoryPage.openCart()

        await expect(await CartPage.getItemsCount()).toEqual(1)
        await expect(await CartPage.isProductPresent('Sauce Labs Backpack')).toEqual(false)
        await expect(await CartPage.isProductPresent('Sauce Labs Bike Light')).toEqual(true)
    })
})