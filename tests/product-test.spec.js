import {test, expect} from '@playwright/test'

test.describe("Test suite - Functionality Test", () => {
    test.beforeEach(async ({ page }) => {
        // go to web demo and login with valid credentials
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
    });

    test('Verify Inventory Page and Inventory Item Page', async ({page}) => {
        await page.waitForURL('https://www.saucedemo.com/inventory.html')
    
        // User can see Product listing's attributes
        await expect(page.locator('.inventory_container')).toBeVisible();
        await expect.soft(page.locator('[data-test="title"]')).toContainText('Products');
        await expect.soft(page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
        await expect.soft(page.locator('[data-test="inventory-list"]')).toContainText('$29.99');
        await expect.soft(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toContainText('Add to cart');
        await expect.soft(page.locator('[data-test="inventory-list"]')).toContainText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
    
        // User can see Product detail's attributes
        await page.locator('[data-test="item-4-title-link"]').click();
        await page.waitForSelector('#inventory_item_container')
        await expect(page.locator('[data-test="back-to-products"]')).toBeVisible()
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

test.describe("Test suite - Data Validation Test", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
    });

    test('Verify product information match across pages',{tag: '@need_review'}, async ({page}) => {
        await page.waitForURL('https://www.saucedemo.com/inventory.html')

        /**
         * PRODUCT LISTING PAGE
         */
        //first product on listing
        let first_prod = await page.locator('.inventory_item').first()
        //NAME
        let listing_name = await first_prod.locator('.inventory_item_name').textContent()
        //DESC
        let listing_desc = await first_prod.locator('.inventory_item_desc').textContent()
        //PRICE
        let listing_price = await first_prod.locator('.inventory_item_price').textContent()
        //IMAGE
        let listing_img_src = await page.locator('#item_4_img_link > img:nth-child(1)').getAttribute('src')

        // goto detail product
        // await page.locator('[data-test="item-'+ product_id +'-title-link"]').click();
        await first_prod.getByRole("img").click()
        // await first_prod.locator('.inventory_item_label > .inventory_item_name').click()
        await page.waitForSelector('#inventory_item_container')
    
        /**
         * PRODUCT DETAIL PAGE
         */
        //NAME
        let detail_name = await page.locator('[data-test="inventory-item-name"]').textContent()
        //DESC
        let detail_desc = await page.locator('.inventory_details_desc').textContent()
        //PRICE
        let detail_price = await page.locator('.inventory_details_price').textContent()
        //IMAGE
        let detail_img_src = await page.locator('.inventory_details_img').getAttribute('src')

        /**
         * Check product information match across pages
         */
        await expect.soft(detail_name).toBe(listing_name)
        await expect.soft(detail_desc).toBe(listing_desc)
        await expect.soft(detail_price).toBe(listing_price)
        await expect.soft(detail_img_src).toBe(listing_img_src)
    })
});