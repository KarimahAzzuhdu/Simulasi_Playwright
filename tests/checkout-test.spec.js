import { test, expect } from '@playwright/test';

test.describe("Test suite - Functionality Test", () =>{
    test.beforeEach(async ({ page }) => {
        // go to web demo and login with valid credentials
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

        // from cart goto checkout-step-one
        await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Your Information');

        // User fill checkout information
        await page.locator('[data-test="firstName"]').fill('first');
        await page.locator('[data-test="lastName"]').fill('last');
        await page.locator('[data-test="postalCode"]').fill('code1234');

        //go to checkout-step-two
        await page.locator('[data-test="continue"]').click();
        await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Overview');
        
        // User can see Checkout Overview
        await expect.soft(page.locator('[data-test="payment-info-label"]')).toContainText('Payment Information:');
        await expect.soft(page.locator('[data-test="payment-info-value"]')).toContainText('');
        await expect.soft(page.locator('[data-test="shipping-info-label"]')).toContainText('Shipping Information:');
        await expect.soft(page.locator('[data-test="shipping-info-value"]')).toContainText('');
        await expect.soft(page.locator('[data-test="subtotal-label"]')).toContainText('Item total:');
        await expect.soft(page.locator('[data-test="tax-label"]')).toContainText('Tax:');
        await expect.soft(page.locator('[data-test="total-label"]')).toContainText('Total:');

        //go to checkout-complete
        await page.locator('[data-test="finish"]').click();
        await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Complete!');

        // User finish ordering, checkout complete
        await expect.soft(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');

        //go back to product listing page - Checkout process done
        await page.locator('[data-test="back-to-products"]').click();
    })
})

test.describe("Test suite - Data Validation Test", () =>{
    test.beforeEach(async ({ page }) => {
        // User go to web and login
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        //add product to cart and go to cart page
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
    });

    test('Verify data product are accurate in checkout process', async ({page}) => {
        /**
         * CART PAGE
         */
        let first_cart = await page.locator('.cart_item').first()
        let last_cart = await page.locator('.cart_item').last()
        //NAME & Price First Item
        let cart_name_first = await first_cart.locator('.inventory_item_name').textContent()
        let cart_price_first = await first_cart.locator('.inventory_item_price').textContent()
        //NAME & Price Last Item
        let cart_name_last = await last_cart.locator('.inventory_item_name').textContent()
        let cart_price_last = await last_cart.locator('.inventory_item_price').textContent()
        
        //go to checkout page
        await page.locator('[data-test="checkout"]').click();

        // User fill checkout information and go to checkout-step-two
        await page.locator('[data-test="firstName"]').fill('first');
        await page.locator('[data-test="lastName"]').fill('last');
        await page.locator('[data-test="postalCode"]').fill('code1234');
        await page.locator('[data-test="continue"]').click();
        
        /**
         * Checkout Overview PAGE
         */
        let first_prod = await page.locator('.cart_item').first()
        let last_prod = await page.locator('.cart_item').last()
        //NAME & Price First Item
        let checkout_name_first = await first_prod.locator('.inventory_item_name').textContent()
        let checkout_price_first = await first_prod.locator('.inventory_item_price').textContent()
        //NAME & Price Last Item
        let checkout_name_last = await last_prod.locator('.inventory_item_name').textContent()
        let checkout_price_last = await last_prod.locator('.inventory_item_price').textContent()
        //Summary
        let summary_subtotal = Number.parseFloat((await page.locator('.summary_subtotal_label').textContent()).slice(13))
        let summary_tax = Number.parseFloat((await page.locator('.summary_tax_label').textContent()).slice(6))
        let summary_total = Number.parseFloat((await page.locator('.summary_total_label').textContent()).slice(8))

        /**
         * Check product information match across pages
         */
        await expect.soft(cart_name_first).toBe(checkout_name_first)
        await expect.soft(cart_price_first).toBe(checkout_price_first)
        await expect.soft(cart_name_last).toBe(checkout_name_last)
        await expect.soft(cart_price_last).toBe(checkout_price_last)

        /**
         * Check checkout overwiew information
         */
        let harga1 = Number.parseFloat(checkout_price_first.slice(1))
        let harga2 = Number.parseFloat(checkout_price_last.slice(1))
        let hitung_subtotal = harga1 + harga2
        let hitung_total = summary_tax + hitung_subtotal

        await expect.soft(hitung_subtotal).toBe(summary_subtotal)
        await expect.soft(hitung_total).toBe(summary_total)
        
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
    
    test('Verify error message for blank fields', async ({page}) => {
        // User click checkout button without fill name field
        await page.locator('[data-test="continue"]').click();
    
        // Display "First Name is required" message
        await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
        await page.locator('[data-test="error-button"]').click();

        //fill the first name field then click checkout button
        await page.locator('[data-test="firstName"]').fill('first');
        await page.locator('[data-test="continue"]').click();

        // Display "Last Name is required" message
        await expect(page.locator('[data-test="error"]')).toContainText('Last Name is required');
        await page.locator('[data-test="error-button"]').click();

        //fill the last name field then click checkout button
        await page.locator('[data-test="lastName"]').fill('last');
        await page.locator('[data-test="continue"]').click();

        // Display "Postal Code is required" message
        await expect(page.locator('[data-test="error"]')).toContainText('Postal Code is required');
        await page.locator('[data-test="error-button"]').click();

    })
});