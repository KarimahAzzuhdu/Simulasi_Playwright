import {test, expect} from '@playwright/test';
import * as allure from "allure-js-commons";

test.describe("Functionality Test - Checkout", () =>{
    test.beforeEach(async ({ page }) => {
        /** METADATA ALLURE REPORT*/
        await allure.owner("Karimah Azzuhdu")
        await allure.tags("Web Interface", "Checkout")
        await allure.severity("critical")

        //suite structure
        await allure.parentSuite("Web Interface Test")
        await allure.suite("Checkout")
        await allure.subSuite("Functionality")

        //behaviour structure
        await allure.epic("Web Interface");
        await allure.feature("Checkout");

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
        
        await allure.step("User click Checkout Button", async () => {
            await page.locator('[data-test="checkout"]').click();
        })
    });

    test('Verify Checkout Page @allure.id:TC_CO_01', async ({page}) => {
        /** METADATA ALLURE REPORT*/
        await allure.description("This test visibility checkout pages.")
        await allure.tag("smoke")
        await allure.story("Checkout pages visual")

        await allure.step("User saw Checkout Information page", async () => {
            //Assertion: User can see Checkout Information page's attributes
            await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Your Information');
            await expect.soft(page.locator('[data-test="firstName"]')).toBeVisible();
            await expect.soft(page.locator('[data-test="lastName"]')).toBeVisible();
            await expect.soft(page.locator('[data-test="postalCode"]')).toBeVisible();
        })

        await allure.step("User fill Checkout Information", async () => {
            await allure.step("User click & fill first name field", async () => {
                await page.locator('[data-test="firstName"]').click();
                await page.locator('[data-test="firstName"]').fill('first');
            })
            await allure.step("User click & fill last name field", async () => {
                await page.locator('[data-test="lastName"]').click();
                await page.locator('[data-test="lastName"]').fill('last');
            })
            await allure.step("User click & fill postal code field", async () => {
                await page.locator('[data-test="postalCode"]').click();
                await page.locator('[data-test="postalCode"]').fill('code1234');
            })
        })

        await allure.step("User submit checkout information", async () => {
            await page.locator('[data-test="continue"]').click();
        })

        await allure.step("User saw Checkout Overview page", async () => {
            //Assertion: User can see Checkout Overview page's attributes
            await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Overview');
            await expect.soft(page.locator('[data-test="payment-info-label"]')).toContainText('Payment Information:');
            await expect.soft(page.locator('[data-test="payment-info-value"]')).toContainText('');
            await expect.soft(page.locator('[data-test="shipping-info-label"]')).toContainText('Shipping Information:');
            await expect.soft(page.locator('[data-test="shipping-info-value"]')).toContainText('');
            await expect.soft(page.locator('[data-test="subtotal-label"]')).toContainText('Item total:');
            await expect.soft(page.locator('[data-test="tax-label"]')).toContainText('Tax:');
            await expect.soft(page.locator('[data-test="total-label"]')).toContainText('Total:');
        })

        await allure.step("User complete checkout process", async () => {
            await page.locator('[data-test="finish"]').click();
        })

        await allure.step("User saw Checkout Complete page", async () => {
            //Assertion: User can see Checkout Complete page's attributes
            await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Complete!');
            await expect.soft(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
        })
    })
})

test.describe("Data Validation Test - Checkout", () =>{
    test.beforeEach(async ({ page }) => {
        /** METADATA ALLURE REPORT*/
        await allure.owner("Karimah Azzuhdu")
        await allure.tags("Web Interface", "Checkout", "Data Validation")
        await allure.severity("critical")

        //suite structure
        await allure.parentSuite("Web Interface Test")
        await allure.suite("Checkout")
        await allure.subSuite("Data Validation")

        //behaviour structure
        await allure.epic("Web Interface");
        await allure.feature("Checkout");

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
    });

    test('Verify data product are accurate in checkout process @allure.id:TC_CO_02', async ({page}) => {
        /** METADATA ALLURE REPORT*/
        await allure.description("This test product information matched between cart and checkout pages.")
        await allure.story("Checkout Information");

        /** products informations in CART */
        let first_cart = await page.locator('.cart_item').first()
        let cart_name_first = await first_cart.locator('.inventory_item_name').textContent()
        let cart_price_first = await first_cart.locator('.inventory_item_price').textContent()
        let last_cart = await page.locator('.cart_item').last()
        let cart_name_last = await last_cart.locator('.inventory_item_name').textContent()
        let cart_price_last = await last_cart.locator('.inventory_item_price').textContent()
        
        await allure.step("User click Checkout Button", async () => {
            await page.locator('[data-test="checkout"]').click();
        })

        await allure.step("User fill Checkout Information", async () => {
            await allure.step("User click & fill first name field", async () => {
                await page.locator('[data-test="firstName"]').click();
                await page.locator('[data-test="firstName"]').fill('first');
            })
            await allure.step("User click & fill last name field", async () => {
                await page.locator('[data-test="lastName"]').click();
                await page.locator('[data-test="lastName"]').fill('last');
            })
            await allure.step("User click & fill postal code field", async () => {
                await page.locator('[data-test="postalCode"]').click();
                await page.locator('[data-test="postalCode"]').fill('code1234');
            })
        })

        await allure.step("User submit checkout information", async () => {
            await page.locator('[data-test="continue"]').click();
        })
        
        /** products informations in CHECKOUT */
        let first_prod = await page.locator('.cart_item').first()
        let checkout_name_first = await first_prod.locator('.inventory_item_name').textContent()
        let checkout_price_first = await first_prod.locator('.inventory_item_price').textContent()
        let last_prod = await page.locator('.cart_item').last()
        let checkout_name_last = await last_prod.locator('.inventory_item_name').textContent()
        let checkout_price_last = await last_prod.locator('.inventory_item_price').textContent()
        //Summary
        let summary_subtotal = Number.parseFloat((await page.locator('.summary_subtotal_label').textContent()).slice(13))
        let summary_tax = Number.parseFloat((await page.locator('.summary_tax_label').textContent()).slice(6))
        let summary_total = Number.parseFloat((await page.locator('.summary_total_label').textContent()).slice(8))
        //calculation
        let harga1 = Number.parseFloat(checkout_price_first.slice(1))
        let harga2 = Number.parseFloat(checkout_price_last.slice(1))
        let hitung_subtotal = harga1 + harga2
        let hitung_total = summary_tax + hitung_subtotal

        await allure.step("Product information match across pages", async () => {
            await expect.soft(cart_name_first).toBe(checkout_name_first)
            await expect.soft(cart_price_first).toBe(checkout_price_first)
            await expect.soft(cart_name_last).toBe(checkout_name_last)
            await expect.soft(cart_price_last).toBe(checkout_price_last)
        })

        await allure.step("Check checkout calculation", async () => {
            await expect.soft(hitung_subtotal).toBe(summary_subtotal)
            await expect.soft(hitung_total).toBe(summary_total)
        })
        
    })
})

test.describe("Error Handling Test - Checkout", () => {
    test.beforeEach(async ({ page }) => {
        /** METADATA ALLURE REPORT*/
        await allure.owner("Karimah Azzuhdu")
        await allure.tags("Web Interface", "Checkout", "Error Handling")
        await allure.severity("normal")

        //suite structure
        await allure.parentSuite("Web Interface Test")
        await allure.suite("Checkout")
        await allure.subSuite("Error Handling")

        //behaviour structure
        await allure.epic("Web Interface");
        await allure.feature("Checkout");

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
        
        await allure.step("User click Checkout Button", async () => {
            await page.locator('[data-test="checkout"]').click();
        })
    });
    
    test('Verify error message for blank fields @allure.id:TC_CO_03', async ({page}) => {
        /** METADATA ALLURE REPORT*/
        await allure.description("This test error message visibility when fill blank at checkout information fields.")
        await allure.story("User fill invalid checkout information");

        await allure.step("User submit checkout information without fill first name field", async () => {
            await page.locator('[data-test="continue"]').click();
        })
    
        await allure.step("User saw error message displayed", async () => {
            //Assertion: Display "First Name is required" message
            await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
        })

        await allure.step("User close error message", async () => {
            await page.locator('[data-test="error-button"]').click();
        })

        await allure.step("User fill first name field", async () => {
            await page.locator('[data-test="firstName"]').fill('first');
        })

        await allure.step("User submit checkout information without fill last name field", async () => {
            await page.locator('[data-test="continue"]').click();
        })
    
        await allure.step("User saw error message displayed", async () => {
            //Assertion: Display "Last Name is required" message
            await expect(page.locator('[data-test="error"]')).toContainText('Last Name is required');
        })

        await allure.step("User close error message", async () => {
            await page.locator('[data-test="error-button"]').click();
        })

        await allure.step("User fill last name field", async () => {
            await page.locator('[data-test="lastName"]').fill('last');
        })

        await allure.step("User submit checkout information without fill postal code field", async () => {
            await page.locator('[data-test="continue"]').click();
        })

        await allure.step("User saw error message displayed", async () => {
            //Assertion: Display "Postal Code is required" message
            await expect(page.locator('[data-test="error"]')).toContainText('Postal Code is required');
        })
        
        await allure.step("User close error message", async () => {
            await page.locator('[data-test="error-button"]').click();
        })

        await allure.step("User fill postal code field", async () => {
            await page.locator('[data-test="postalCode"]').fill('code1234');
        })

        await allure.step("User submit checkout information", async () => {
            await page.locator('[data-test="continue"]').click();
        })
    })
});