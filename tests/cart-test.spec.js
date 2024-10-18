import {test, expect} from '@playwright/test'

test.describe("Test suite - Functionality Test", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
    });

    test('Verify Cart Page', async ({page}) => {
        //go to cart page
        await page.locator('[data-test="shopping-cart-link"]').click();

        //assertion
        await expect(page.locator('[data-test="title"]')).toContainText('Your Cart');
        await expect.soft(page.locator('.cart_quantity_label')).toContainText('QTY');
        await expect.soft(page.locator('.cart_desc_label')).toContainText('Description');
        await expect.soft(page.locator('#continue-shopping')).toContainText('Continue Shopping');
        await expect.soft(page.locator('#checkout')).toContainText('Checkout');
    })

    test('Verify adding product to cart and product information are accurate',{tag: '@need_review'}, async ({page}) => {
        await page.waitForURL('https://www.saucedemo.com/inventory.html')
        
        /**
         * PRODUCT LISTING
         */
        //first_prod information
        let first_prod = await page.locator('.inventory_item').first()
        let listing_name = await first_prod.locator('.inventory_item_name').textContent()
        let listing_desc = await first_prod.locator('.inventory_item_desc').textContent()
        let listing_price = await first_prod.locator('.inventory_item_price').textContent()
        //add to cart
        await first_prod.getByRole('button', {name: 'Add to cart'}).click()

        //goto cart
        await page.locator('[data-test="shopping-cart-link"]').click()

        /**
         * Check added product
         */
        await expect(page.locator('.cart_list')).toBeVisible();

        /**
         * CART PRODUCT
         */
        //first_cart information
        let first_cart = await page.locator('.cart_item').first()
        let cart_name = await first_cart.locator('.inventory_item_name').textContent()
        let cart_desc = await first_cart.locator('.inventory_item_desc').textContent()
        let cart_price = await first_cart.locator('.inventory_item_price').textContent()

        /**
         * Check product information match across pages
         */
        await expect.soft(cart_name).toBe(listing_name)
        await expect.soft(cart_desc).toBe(listing_desc)
        await expect.soft(cart_price).toBe(listing_price)
    })

    test('Verify removing product from cart',{tag: '@need_review'}, async ({page}) => {
        await page.waitForURL('https://www.saucedemo.com/inventory.html')
        await page.pause()
        
        //add product to cart
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        //goto cart
        await page.locator('[data-test="shopping-cart-link"]').click()
        await page.waitForSelector('.cart_list')

        //remove product from cart
        await page.getByRole('button', {name: 'Remove'}).click()

        /**
         * Check removed product
         */
        await expect(page.locator('.cart_item')).not.toBeVisible();
    })
});