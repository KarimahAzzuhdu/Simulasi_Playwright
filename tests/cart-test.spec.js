import {test, expect} from '@playwright/test'

//Pelajari cara bikin modular function disini
// function LoginFunc() {
//     await page.goto('https://www.saucedemo.com/');
//     await page.locator('[data-test="username"]').fill('standard_user');
//     await page.locator('[data-test="password"]').fill('secret_sauce');
//     await page.locator('[data-test="login-button"]').click();
// }

test('Verify Cart Page', async ({page}) => {
    // Prerequisites condition: User already log in (sementara copas aja)
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="title"]')).toContainText('Your Cart');
    await expect.soft(page.locator('.cart_quantity_label')).toContainText('QYT');
    await expect.soft(page.locator('.cart_desc_label')).toContainText('Description');
    await expect.soft(page.locator('#continue-shopping')).toContainText('Continue Shopping');
    await expect.soft(page.locator('#checkout')).toContainText('Checkout');
})

test.skip('Verify adding product to cart and product information are accurate', async ({page}) => {
    // Prerequisites condition: User already log in (sementara copas aja)
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.pause()

})

test.skip('Verify removing product from cart', async ({page}) => {
    // Prerequisites condition: User already log in (sementara copas aja)
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.pause()

})

test('Verify error message for cart page without login', async ({page}) => {
    await page.goto('https://www.saucedemo.com/cart.html')

    // redirect to login page
    await page.waitForURL('https://www.saucedemo.com/')
    // Display "You can only access '/inventory.html' when you are logged in." message
    await expect(page.locator('[data-test="error"]')).toContainText("You can only access '/cart.html' when you are logged in");
})

// test('record', async ({ page }) => {
//     await page.goto('https://www.saucedemo.com/');
//     await page.locator('[data-test="username"]').click();
//     await page.locator('[data-test="username"]').fill('standard_user');
//     await page.locator('[data-test="username"]').press('Tab');
//     await page.locator('[data-test="password"]').fill('secret_sauce');
//     await page.locator('[data-test="password"]').press('Tab');
//     await page.locator('[data-test="login-button"]').press('Enter');
//     await page.locator('[data-test="login-button"]').click();
//     await page.locator('[data-test="shopping-cart-link"]').click();
//     await expect(page.locator('[data-test="title"]')).toContainText('Your Cart');
//     await page.locator('[data-test="continue-shopping"]').click();
//     await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
//     await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
//     await page.locator('[data-test="shopping-cart-link"]').click();
//     await expect(page.locator('[data-test="cart-list"]')).toBeVisible();
//     await expect(page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
//     await expect(page.locator('[data-test="cart-list"]')).toContainText('$29.99');
//     await expect(page.locator('[data-test="item-1-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Bolt T-Shirt');
//     await expect(page.locator('[data-test="cart-list"]')).toContainText('$15.99');
//     await page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
//     await expect(page.locator('[data-test="cart-list"]')).toBeVisible();
//     await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('1');
//     await page.locator('[data-test="continue-shopping"]').click();
//     await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
//     await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('2');
//     await page.locator('[data-test="shopping-cart-link"]').click();
//     await expect(page.locator('[data-test="cart-list"]')).toBeVisible();
//     await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
//     await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
//     await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
//     await expect(page.locator('[data-test="cart-list"]')).toBeVisible();
// });