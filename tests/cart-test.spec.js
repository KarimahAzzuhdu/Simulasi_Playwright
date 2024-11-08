import {test, expect} from '@playwright/test'

test.describe("Functionality Test - Cart", () => {
    test.beforeEach(async ({ page }) => {
        // go to web demo and login with valid credentials
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
        await page.waitForURL('https://www.saucedemo.com/inventory.html');
    });

    test('Verify Cart Page', async ({page}) => {
        //go to cart page
        await page.locator('[data-test="shopping-cart-link"]').click();

        //User can see Cart's attributes
        await expect(page.locator('[data-test="title"]')).toContainText('Your Cart');
        await expect.soft(page.locator('.cart_quantity_label')).toContainText('QTY');
        await expect.soft(page.locator('.cart_desc_label')).toContainText('Description');
        await expect.soft(page.locator('#continue-shopping')).toContainText('Continue Shopping');
        await expect.soft(page.locator('#checkout')).toContainText('Checkout');
    })

    test('Verify adding product to cart at inventory page', async ({page}) => {
        /** first product on PRODUCT LISTING */
        let first_prod = await page.locator('.inventory_item').first()
        let listing_name = await first_prod.locator('.inventory_item_name').textContent()
        let listing_desc = await first_prod.locator('.inventory_item_desc').textContent()
        let listing_price = await first_prod.locator('.inventory_item_price').textContent()

        // Add a product to the cart from inventory page
        await first_prod.getByRole('button', {name: 'Add to cart'}).click()

        // go to cart 
        await page.locator('[data-test="shopping-cart-link"]').click();
            
        //Assertion: User saw product added in cart
        await expect(page.locator('.cart_list')).toBeVisible();
        await expect(page.locator('.cart_item').first()).toBeVisible();

        /** first product in CART */
        let first_cart = await page.locator('.cart_item').first()
        let cart_name = await first_cart.locator('.inventory_item_name').textContent()
        let cart_desc = await first_cart.locator('.inventory_item_desc').textContent()
        let cart_price = await first_cart.locator('.inventory_item_price').textContent()

        //Assertion: product information match across pages
        await expect.soft(cart_name).toBe(listing_name)
        await expect.soft(cart_desc).toBe(listing_desc)
        await expect.soft(cart_price).toBe(listing_price)
    })

    test('Verify adding product to cart at inventory-item page', async ({page}) => {
        // User click one product on Inventory Page
        await page.locator('[data-test="item-4-title-link"]').click();
        await page.waitForSelector('#inventory_item_container')
        
        //User saw Inventory Item Page
        await expect(page.locator('[data-test="inventory-item-name"]')).toBeVisible()
        await expect(page.locator('[data-test="back-to-products"]')).toBeVisible()

        /* PRODUCT DETAIL PAGE */
        let detail_name = await page.locator('[data-test="inventory-item-name"]').textContent()
        let detail_desc = await page.locator('.inventory_details_desc').textContent()
        let detail_price = await page.locator('.inventory_details_price').textContent()

        //add to cart from inventory item page
        await page.locator('[data-test="add-to-cart"]').click();

        // go to cart    
        await page.locator('[data-test="shopping-cart-link"]').click();

        //Assertion: User saw product added in cart
        await expect(page.locator('.cart_list')).toBeVisible();
        await expect(page.locator('.cart_item').first()).toBeVisible();

        /** first product in CART */
        let first_cart = await page.locator('.cart_item').first()
        let cart_name = await first_cart.locator('.inventory_item_name').textContent()
        let cart_desc = await first_cart.locator('.inventory_item_desc').textContent()
        let cart_price = await first_cart.locator('.inventory_item_price').textContent()

        //Assertion: product information match across pages
        await expect.soft(cart_name).toBe(detail_name)
        await expect.soft(cart_desc).toBe(detail_desc)
        await expect.soft(cart_price).toBe(detail_price)
    })

    test('Verify removing product from cart at cart page', async ({page}) => {
        //User add two product to cart
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.waitForSelector('.cart_list');
        await expect(page.locator('.cart_item').first()).toBeVisible();

        /** first product in CART */
        let first_cart = await page.locator('.cart_item').first()
        let fcart_name = await first_cart.locator('.inventory_item_name').textContent()

        //User remove first product from cart at cart page
        await first_cart.getByRole('button', {name: 'Remove'}).click()
        
        /** new first product in CART (Updated)*/
        let new_first_cart = await page.locator('.cart_item').first()
        let new_fcart_name = await new_first_cart.locator('.inventory_item_name').textContent()
        
        //Assertion: first product in cart updated
        await expect.soft(fcart_name).not.toBe(new_fcart_name)
    })

    test('Verify removing product from cart at inventory page', async ({page}) => {
        //User add two product to cart
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.waitForSelector('.cart_list');
        await expect(page.locator('.cart_item').first()).toBeVisible();

        /** first product in CART */
        let first_cart = await page.locator('.cart_item').first()
        let fcart_name = await first_cart.locator('.inventory_item_name').textContent()

        //back to inventory page
        await page.locator('[data-test="continue-shopping"]').click();
        
        //User remove first product from cart at inventory page
        await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

        //go to cart
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.waitForSelector('.cart_list');

        /** new first product in CART (Updated)*/
        let new_first_cart = await page.locator('.cart_item').first()
        let new_fcart_name = await new_first_cart.locator('.inventory_item_name').textContent()
        
        //Assertion: first product in cart updated
        await expect.soft(fcart_name).not.toBe(new_fcart_name)
    })

    test('Verify removing product from cart at inventory-item page @allure.id:TC_CART_06', async ({page}) => {
        //User add two product to cart
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.waitForSelector('.cart_list');
        await expect(page.locator('.cart_item').first()).toBeVisible();

        /** first product in CART */
        let first_cart = await page.locator('.cart_item').first()
        let fcart_name = await first_cart.locator('.inventory_item_name').textContent()

        //go to Inventory Page
        await page.locator('[data-test="continue-shopping"]').click();

        //go to product detail of first product from cart
        await page.locator('[data-test="item-4-title-link"]').click();
        
        //User remove first product from cart at inventory-item page
        await page.locator('[data-test="remove"]').click();

        //go to cart
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.waitForSelector('.cart_list');
        
        /** new first product in CART (Updated)*/
        let new_first_cart = await page.locator('.cart_item').first()
        let new_fcart_name = await new_first_cart.locator('.inventory_item_name').textContent()
        
        //Assertion: first product in cart updated
        await expect.soft(fcart_name).not.toBe(new_fcart_name)
    })
});