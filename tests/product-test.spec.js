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

    test('Verify sort product function by names and prices',{tag: '@akubingung'},  async ({page}) => {
        await page.waitForURL('https://www.saucedemo.com/inventory.html')
        
        // User click sorting by name A-Z
        await page.locator('[data-test="product-sort-container"]').selectOption('az');

        // User can see Product listing's attributes with sorting by name A-Z
        let first_AZ = await page.locator('.inventory_item').first()
        let first_AZ_name = await first_AZ.locator('.inventory_item_name').textContent()
        let last_AZ = await page.locator('.inventory_item').last()
        let last_AZ_name = await last_AZ.locator('.inventory_item_name').textContent()

        // User click sorting by name Z-A
        await page.locator('[data-test="product-sort-container"]').selectOption('za');

        // User can see Product listing's attributes with sorting by name Z-A
        let first_ZA = await page.locator('.inventory_item').first()
        let first_ZA_name = await first_ZA.locator('.inventory_item_name').textContent()
        let last_ZA = await page.locator('.inventory_item').last()
        let last_ZA_name = await last_ZA.locator('.inventory_item_name').textContent()

        //Check sorting function name A-Z to name Z-A
        await expect.soft(first_AZ_name).toBe(last_ZA_name)
        await expect.soft(first_ZA_name).toBe(last_AZ_name)
        
        // User click sorting by price low-high
        await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

        // User can see Product listing's attributes with sorting by price low-high
        let first_lohi = await page.locator('.inventory_item').first()
        let first_lohi_price = await first_lohi.locator('.inventory_item_price').textContent()
        let last_lohi = await page.locator('.inventory_item').last()
        let last_lohi_price = await last_lohi.locator('.inventory_item_price').textContent()

        // User click sorting by price high-low
        await page.locator('[data-test="product-sort-container"]').selectOption('hilo');

        // User can see Product listing's attributes with sorting by price high-low
        let first_hilo = await page.locator('.inventory_item').first()
        let first_hilo_price = await first_hilo.locator('.inventory_item_price').textContent()
        let last_hilo = await page.locator('.inventory_item').last()
        let last_hilo_price = await last_hilo.locator('.inventory_item_price').textContent()

        //Check sorting function price lohi to price hilo
        await expect.soft(first_lohi_price).toBe(last_hilo_price)
        await expect.soft(first_hilo_price).toBe(last_lohi_price)
    })
});

test.describe("Test suite - Data Validation Test", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
    });

    test('Verify product information match across pages', async ({page}) => {
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
        let listing_img_src = await first_prod.getByRole("img").getAttribute('src')

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