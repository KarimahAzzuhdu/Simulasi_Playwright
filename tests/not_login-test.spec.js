import {test, expect} from '@playwright/test'

test.describe("Error Handling Test - Access Web when Not Login", () => {

    test('Verify error message for cart page without login', async ({page}) => {
        await page.goto('https://www.saucedemo.com/cart.html')

        // redirect to login page
        await page.waitForURL('https://www.saucedemo.com/')
        // Display "You can only access '/inventory.html' when you are logged in." message
        await expect(page.locator('[data-test="error"]')).toContainText("You can only access '/cart.html' when you are logged in");
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

    test('Verify error message for checkout-info page without login', async ({page}) => {
        await page.goto('https://www.saucedemo.com/checkout-step-one.html')
    
        // redirect to login page
        await page.waitForURL('https://www.saucedemo.com/')
        // Display "You can only access '/inventory.html' when you are logged in." message
        await expect(page.locator('[data-test="error"]')).toContainText("You can only access '/checkout-step-one.html' when you are logged in");
        await page.pause()
    })

    test('Verify error message for checkout-overview inventory page without login', async ({page}) => {
        await page.goto('https://www.saucedemo.com/checkout-step-two.html')
    
        // redirect to login page
        await page.waitForURL('https://www.saucedemo.com/')
        // Display "You can only access '/inventory.html' when you are logged in." message
        await expect(page.locator('[data-test="error"]')).toContainText("You can only access '/checkout-step-two.html' when you are logged in");
        await page.pause()
    })

    test('Verify error message for checkout-complete inventory page without login', async ({page}) => {
        await page.goto('https://www.saucedemo.com/checkout-complete.html')
    
        // redirect to login page
        await page.waitForURL('https://www.saucedemo.com/')
        // Display "You can only access '/inventory.html' when you are logged in." message
        await expect(page.locator('[data-test="error"]')).toContainText("You can only access '/checkout-complete.html' when you are logged in");
        await page.pause()
    })
});