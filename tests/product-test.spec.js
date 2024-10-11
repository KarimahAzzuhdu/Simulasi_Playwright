import {test, expect} from '@playwright/test'

//Pelajari cara bikin modular function disini
// function LoginFunc() {
//     await page.goto('https://www.saucedemo.com/');
//     await page.locator('[data-test="username"]').fill('standard_user');
//     await page.locator('[data-test="password"]').fill('secret_sauce');
//     await page.locator('[data-test="login-button"]').click();
// }

test('', async ({page}) => {
    // Prerequisites condition: User already log in (sementara copas aja)
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.goto('https://www.saucedemo.com/inventory.html')

})

/** hasil codegen
test('test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
    await expect(page.locator('[data-test="title"]')).toContainText('Products');
    await expect(page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
    await expect(page.locator('[data-test="inventory-list"]')).toContainText('$29.99');
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toContainText('Add to cart');
    await expect(page.locator('[data-test="inventory-list"]')).toContainText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
    await page.locator('[data-test="item-4-title-link"]').click();
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
    await expect(page.locator('[data-test="item-sauce-labs-backpack-img"]')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
    await expect(page.locator('[data-test="inventory-item-desc"]')).toContainText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
    await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$29.99');
    await expect(page.locator('[data-test="add-to-cart"]')).toContainText('Add to cart');
    await page.locator('[data-test="back-to-products"]').click();
    await page.getByText('Name (A to Z)Name (A to Z)').click();
    await page.locator('[data-test="product-sort-container"]').selectOption('za');
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
    await page.getByText('Name (Z to A)Name (A to Z)').click();
    await page.getByText('Name (Z to A)Name (A to Z)').click();
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
    await page.getByText('Name (Z to A)Name (A to Z)').click();
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
    await page.getByText('Price (low to high)Name (A to').click();
    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
    await expect(page.locator('[data-test="inventory-list"]')).toContainText('$49.99');
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    await expect(page.locator('[data-test="inventory-list"]')).toContainText('$7.99');
    await page.locator('[data-test="product-sort-container"]').selectOption('za');
    await expect(page.locator('[data-test="item-3-title-link"] [data-test="inventory-item-name"]')).toContainText('Test.allTheThings() T-Shirt (Red)');
    await page.getByText('Name (Z to A)Name (A to Z)').click();
    await page.locator('[data-test="product-sort-container"]').selectOption('az');
    await expect(page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
    await expect(page.locator('[data-test="item-4-img-link"]')).toBeVisible();
    await page.locator('[data-test="primary-header"] div').filter({ hasText: 'Swag Labs' }).first().click();
    await expect(page.locator('div').filter({ hasText: /^All ItemsAboutLogoutReset App State$/ })).toBeVisible();
    await page.locator('[data-test="reset-sidebar-link"]').click();
    await page.locator('div').filter({ hasText: /^All ItemsAboutLogoutReset App State$/ }).click();
});

 */