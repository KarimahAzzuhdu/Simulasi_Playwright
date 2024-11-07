import {test, expect} from '@playwright/test';
import * as allure from "allure-js-commons";

test.describe("Functionality Test - Cart", () => {
    test.beforeEach(async ({ page }) => {
        /** METADATA ALLURE REPORT*/
        await allure.owner("Karimah Azzuhdu")
        await allure.tags("Web Interface", "Cart")
        await allure.severity("critical")

        //suite structure
        await allure.parentSuite("Web Interface Test")
        await allure.suite("Cart")
        await allure.subSuite("Functionality")

        //behaviour structure
        await allure.epic("Web Interface");
        await allure.feature("Cart");

        await allure.step("go to web demo", async () => {
            await page.goto('https://www.saucedemo.com/');
        })
        await allure.step("User Login", async () => {
            await allure.step("User click & fill username field", async () => {
                await page.locator('[data-test="username"]').click();
                await page.locator('[data-test="username"]').fill('standard_user');
            });
            await allure.step("User click & fill password field", async () => {
                await page.locator('[data-test="password"]').click();
                await page.locator('[data-test="password"]').fill('secret_sauce');
            });
            await allure.step("User click Login button", async () => {
                await page.locator('[data-test="login-button"]').click();
            });
            await allure.step("User successfully login and Inventory Page loaded", async () => {
                await page.waitForURL('https://www.saucedemo.com/inventory.html');
            });
        })
    });

    test('Verify Cart Page', async ({page}) => {
        /** METADATA ALLURE REPORT*/
        await allure.description("This test visibility cart page.")
        await allure.story("Cart page visual")

        await allure.step("User click cart icon", async () => {
            await page.locator('[data-test="shopping-cart-link"]').click();
        })

        await allure.step("User saw Cart Page", async () => {
            //Assertion: User can see Cart's attributes
            await expect(page.locator('[data-test="title"]')).toContainText('Your Cart');
            await expect.soft(page.locator('.cart_quantity_label')).toContainText('QTY');
            await expect.soft(page.locator('.cart_desc_label')).toContainText('Description');
            await expect.soft(page.locator('#continue-shopping')).toContainText('Continue Shopping');
            await expect.soft(page.locator('#checkout')).toContainText('Checkout');
        })
    })

    test('Verify adding product to cart at inventory page', async ({page}) => {
        /** METADATA ALLURE REPORT*/
        await allure.description("This test functionality add products to cart at inventory page.")
        await allure.story("User adding product to cart")
        
        /** first product on PRODUCT LISTING */
        let first_prod = await page.locator('.inventory_item').first()
        let listing_name = await first_prod.locator('.inventory_item_name').textContent()
        let listing_desc = await first_prod.locator('.inventory_item_desc').textContent()
        let listing_price = await first_prod.locator('.inventory_item_price').textContent()
        
        await allure.step("Add a product to the cart from inventory page", async () => {
            // await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
            await first_prod.getByRole('button', {name: 'Add to cart'}).click()
        })

        await allure.step("User click cart icon", async () => {
            await page.locator('[data-test="shopping-cart-link"]').click();
        })

        await allure.step("Product successfully added in cart", async () => {
            //Assertion: User saw product added in cart
            await expect(page.locator('.cart_list')).toBeVisible();
            await expect(page.locator('.cart_item').first()).toBeVisible();
        })

        /** first product in CART */
        let first_cart = await page.locator('.cart_item').first()
        let cart_name = await first_cart.locator('.inventory_item_name').textContent()
        let cart_desc = await first_cart.locator('.inventory_item_desc').textContent()
        let cart_price = await first_cart.locator('.inventory_item_price').textContent()

        await allure.step("Product information match across pages", async () => {
            //Assertion: product information match across pages
            await expect.soft(cart_name).toBe(listing_name)
            await expect.soft(cart_desc).toBe(listing_desc)
            await expect.soft(cart_price).toBe(listing_price)
        })
    })

    test('Verify removing product from cart at cart page', async ({page}) => {
        /** METADATA ALLURE REPORT*/
        await allure.description("This test functionality remove products from cart at cart page.")
        await allure.story("User remove product to cart")

        await allure.step("User add two product to cart", async () => {
            await allure.step("User add two product to the cart from inventory page", async () => {
                await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
                await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
            })
            await allure.step("User click cart icon", async () => {
                await page.locator('[data-test="shopping-cart-link"]').click();
                await page.waitForSelector('.cart_list');
            })
            await allure.step("Product successfully added in cartt", async () => {
                await expect(page.locator('.cart_item').first()).toBeVisible();
            })
        })

        /** first product in CART */
        let first_cart = await page.locator('.cart_item').first()
        let fcart_name = await first_cart.locator('.inventory_item_name').textContent()

        await allure.step("User remove first product from cart", async () => {
            await first_cart.getByRole('button', {name: 'Remove'}).click()
        })
        
        /** new first product in CART (Updated)*/
        let new_first_cart = await page.locator('.cart_item').first()
        let new_fcart_name = await new_first_cart.locator('.inventory_item_name').textContent()
        
        await allure.step("First Product successfully removed", async () => {
            //Assertion: first product in cart updated
            await expect.soft(fcart_name).not.toBe(new_fcart_name)
        })
    })
});