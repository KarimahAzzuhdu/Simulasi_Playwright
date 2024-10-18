import { test, expect } from '@playwright/test';

test.describe("Test suite - Functionality Test", () =>{
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        //add product to cart and go to cart page
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        
        //go to checkout page
        await page.locator('[data-test="checkout"]').click();
    });

    test('Verify Checkout Page', async ({page}) => {
        await page.pause()
    })

    test('Verify data product are accurate in checkout process', async ({page}) => {
        await page.pause()
    })
})

test.describe("Test suite - Error Handling Test", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();
    });
    
    test('Verify error message for first name field', async ({page}) => {
        await page.pause()
    })

    test('Verify error message for last name field', async ({page}) => {
        await page.pause()
    })

    test('Verify error message for postal code field', async ({page}) => {
        await page.pause()
    })
});

// test('test', async ({ page }) => {
//     await page.locator('[data-test="shopping-cart-link"]').click();
//     await expect(page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
//     await expect(page.locator('[data-test="item-1-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Bolt T-Shirt');
//     await page.locator('[data-test="checkout"]').click();
//     await page.locator('[data-test="firstName"]').click();
//     await page.locator('[data-test="firstName"]').fill('a');
//     await page.locator('[data-test="lastName"]').click();
//     await page.locator('[data-test="lastName"]').fill('bc');
//     await page.locator('[data-test="postalCode"]').click();
//     await page.locator('[data-test="postalCode"]').fill('cd');
//     await page.locator('[data-test="continue"]').click();
//     await expect(page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
//     await expect(page.locator('[data-test="cart-list"]')).toContainText('$29.99');
//     await expect(page.locator('[data-test="item-1-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Bolt T-Shirt');
//     await expect(page.locator('[data-test="cart-list"]')).toContainText('$15.99');
//     await expect(page.locator('[data-test="subtotal-label"]')).toContainText('Item total: $45.98');
//     await expect(page.locator('[data-test="tax-label"]')).toContainText('Tax: $3.68');
//     await expect(page.locator('[data-test="total-label"]')).toContainText('Total: $49.66');
//     await page.locator('[data-test="finish"]').click();
//     await expect(page.locator('[data-test="pony-express"]')).toBeVisible();
//     await page.locator('[data-test="back-to-products"]').click();
// });