describe('Inventory Logic Flow', () => {

  const login = async () => {
    await browser.url('https://www.saucedemo.com/');

    await $('#user-name').setValue('standard_user');
    await $('#password').setValue('secret_sauce');
    await $('#login-button').click();
  };

  it('UC-1: Sorting validation (low → high)', async () => {
    await login();

    const sortDropdown = await $('//select[@class="product_sort_container"]');
    await sortDropdown.selectByVisibleText('Price (low to high)');

    const priceElements = await $$('//div[@class="inventory_item_price"]');

    const prices = [];
    for (let el of priceElements) {
      const text = await el.getText();
      prices.push(parseFloat(text.replace('$', '')));
    }

    const sorted = [...prices].sort((a, b) => a - b);

    await expect(prices).toEqual(sorted);
  });


  it('UC-2: Cart state logic', async () => {
    await login();

    const addButtons = await $$('//button[contains(text(),"Add to cart")]');

    await addButtons[0].click();
    await addButtons[1].click();

    const badge = await $('//span[@class="shopping_cart_badge"]');
    await expect(badge).toHaveText('2');

    const removeButtons = await $$('//button[contains(text(),"Remove")]');
    await removeButtons[0].click();

    await expect(badge).toHaveText('1');
  });

});