import {test, expect} from '@playwright/test'

test.describe("Test suite - Functionality Test", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
    });

    test('Verify Inventory Page and Inventory Item Page', async ({page}) => {
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

    test('Verify product information match across pages',{tag: '@akubingung'}, async ({page}) => {
        await page.waitForURL('https://www.saucedemo.com/inventory.html')

        /**
         * PRODUCT LISTING PAGE
         */
        //first product on listing
        let first_prod = await page.locator('.inventory_item').first()
        //NAME
        let listing_name = await first_prod.locator('.inventory_item_name').textContent()
        // let listing_name = await page.locator('#item_'+ product_id +'_title_link').textContent()
        // console.log('name listing : '+listing_name)
        //DESC
        let listing_desc = await first_prod.locator('.inventory_item_desc').textContent()
        // let listing_desc = await page.locator('.inventory_item_desc').first().textContent()
        // console.log('desc listing : '+listing_desc)
        //PRICE
        let listing_price = await first_prod.locator('.inventory_item_price').textContent()
        // let listing_price = await page.locator('.inventory_item_price').first().textContent()
        // console.log('price listing : '+listing_price)

        //IMAGE
        // let listing_img_src = await page.locator('.inventory_item_img').first()
        // console.log('img listing :'+listing_img_src)

        /**
         * PRODUCT DETAIL PAGE
         */
        // goto detail product
        // await page.locator('[data-test="item-'+ product_id +'-title-link"]').click();
        await first_prod.getByRole("img").click()
        // await first_prod.locator('.inventory_item_label > .inventory_item_name').click()
        await page.waitForSelector('#inventory_item_container')
    
        //NAME
        let detail_name = await page.locator('[data-test="inventory-item-name"]').textContent()
        // console.log('name detail : '+detail_name)
        //DESC
        let detail_desc = await page.locator('.inventory_details_desc').textContent()
        // console.log('desc detail : '+detail_desc)
        //PRICE
        let detail_price = await page.locator('.inventory_details_price').textContent()
        // console.log('price detail : '+detail_price)
        //IMAGE
        // let detail_img_src = await page.locator('.inventory_details_img').screenshot()
        // console.log('img listing : '+detail_img_src)

        /**
         * Check product information match across pages
         */
        await expect.soft(detail_name).toBe(listing_name)
        await expect.soft(detail_desc).toBe(listing_desc)
        await expect.soft(detail_price).toBe(listing_price)
        // await expect(detail_img_src).toBe(listing_img_src)
    })

    test.skip('Verify sort product function by names and prices',{tag: '@akubingung'},  async ({page}) => {
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
});

test.describe("Test suite - Error Handling Test", () => {
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
});