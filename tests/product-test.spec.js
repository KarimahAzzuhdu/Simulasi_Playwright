import {test, expect} from '@playwright/test'

//Pelajari cara bikin modular function disini
// function LoginFunc() {
//     await page.goto('https://www.saucedemo.com/');
//     await page.locator('[data-test="username"]').fill('standard_user');
//     await page.locator('[data-test="password"]').fill('secret_sauce');
//     await page.locator('[data-test="login-button"]').click();
// }

test('Verify Inventory Page and Inventory Item Page', async ({page}) => {
    // Prerequisites condition: User already log in (sementara copas aja)
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.waitForURL('https://www.saucedemo.com/inventory.html')

    /** product listing */
    await expect(page.locator('.inventory_container')).toBeVisible();
    await expect.soft(page.locator('[data-test="title"]')).toContainText('Products');
    await expect.soft(page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
    await expect.soft(page.locator('[data-test="inventory-list"]')).toContainText('$29.99');
    await expect.soft(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toContainText('Add to cart');
    await expect.soft(page.locator('[data-test="inventory-list"]')).toContainText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');

    /** product detail */ 
    await page.locator('[data-test="item-4-title-link"]').click();
    await page.waitForSelector('#inventory_item_container')
    await expect(page.locator('[data-test="back-to-products"]')).toBeVisible()
})

test.skip('Verify product information match across pages', async ({page}) => {
    // Prerequisites condition: User already log in (sementara copas aja)
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.waitForURL('https://www.saucedemo.com/inventory.html')

    await page.pause()

    // first product on the listing
    const first_product = await page.locator('#inventory-item').first()

    // product listing information
    // const listing_img_src = 
    // const listing_name = 
    // const listing_desc = 
    // const listing_price = 

    // goto detail product
    await page.locator('//*[@id="item_4_title_link"]/div').click();
    await page.waitForSelector('#inventory_item_container')

    // product detail information
    // const detail_img_src = 
    // const detail_name = 
    // const detail_desc = 
    // const detail_price = 
    
    //assertion
    // await expect(detail_img_src).toBe(listing_img_src)
    // await expect.soft(detail_name).toBe(listing_name)
    // await expect.soft(detail_desc).toBe(listing_desc)
    // await expect.soft(detail_price).toBe(listing_price)
})

test.skip('Verify sort product function by names and prices', async ({page}) => {
    // Prerequisites condition: User already log in (sementara copas aja)
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.waitForURL('https://www.saucedemo.com/inventory.html')

    // await page.getByText('Name (A to Z)Name (A to Z)').click();
    // await page.locator('[data-test="product-sort-container"]').selectOption('za');
    // await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
    // await page.getByText('Name (Z to A)Name (A to Z)').click();
    // await page.getByText('Name (Z to A)Name (A to Z)').click();
    // await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
    // await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
    // await page.getByText('Name (Z to A)Name (A to Z)').click();
    // await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    // await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
    // await page.getByText('Price (low to high)Name (A to').click();
    // await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
    // await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
    // await expect(page.locator('[data-test="inventory-list"]')).toContainText('$49.99');
    // await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    // await expect(page.locator('[data-test="inventory-list"]')).toContainText('$7.99');
    // await page.locator('[data-test="product-sort-container"]').selectOption('za');
    // await expect(page.locator('[data-test="item-3-title-link"] [data-test="inventory-item-name"]')).toContainText('Test.allTheThings() T-Shirt (Red)');
    // await page.getByText('Name (Z to A)Name (A to Z)').click();
    // await page.locator('[data-test="product-sort-container"]').selectOption('az');
    // await expect(page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
    // await expect(page.locator('[data-test="item-4-img-link"]')).toBeVisible();

})

test('Verify error message for access inventory page without login', async ({page}) => {
    await page.goto('https://www.saucedemo.com/inventory.html')

    // redirect to login page
    await page.waitForURL('https://www.saucedemo.com/')
    // Display "You can only access '/inventory.html' when you are logged in." message
    await expect(page.locator('[data-test="error"]')).toContainText("You can only access '/inventory.html' when you are logged in");
})

test('Verify error message for access inventory-item page without login', async ({page}) => {
    await page.goto('https://www.saucedemo.com/inventory-item.html?id=4')

    // redirect to login page
    await page.waitForURL('https://www.saucedemo.com/')
    // Display "You can only access '/inventory.html' when you are logged in." message
    await expect(page.locator('[data-test="error"]')).toContainText("You can only access '/inventory-item.html' when you are logged in");
})