import {test, expect} from '@playwright/test';
import * as allure from "allure-js-commons";

test.describe("Functionality Test - Product", () => {
    test.beforeEach(async ({ page }) => {
        /** METADATA ALLURE REPORT*/
        await allure.owner("Karimah Azzuhdu")
        await allure.tags("Web Interface", "Product")
        await allure.severity("critical")

        //suite structure
        await allure.parentSuite("Web Interface Test")
        await allure.suite("Product")
        await allure.subSuite("Functionality")

        //behaviour structure
        await allure.epic("Web Interface");
        await allure.feature("Product Listing & Detail");

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

    test('Verify Inventory Page and Inventory Item Page @allure.id:TC_PROD_01', async ({page}) => {
        /** METADATA ALLURE REPORT*/
        await allure.description("This test visibility inventory page and inventory item page.")
        await allure.tag("smoke")
        await allure.story("Product pages visual")

        await allure.step("User saw Inventory Page", async () => {
            //Assertion: User can see Product listing's attributes
            await expect(page.locator('.inventory_container')).toBeVisible();
            await expect.soft(page.locator('[data-test="title"]')).toContainText('Products');
            await expect.soft(page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
            await expect.soft(page.locator('[data-test="inventory-list"]')).toContainText('$29.99');
            await expect.soft(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toContainText('Add to cart');
            await expect.soft(page.locator('[data-test="inventory-list"]')).toContainText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
        })
    
        await allure.step("User click title product", async () => {
            await page.locator('[data-test="item-4-title-link"]').click();
            await page.waitForSelector('#inventory_item_container')
        })

        await allure.step("User saw Inventory Item Page", async () => {
            //Assertion: User can see Product detail's attributes
            await expect(page.locator('[data-test="back-to-products"]')).toBeVisible()
        })
    })

    test('Verify sort product function by names and prices @allure.id:TC_PROD_03',  async ({page}) => {
        /** METADATA ALLURE REPORT*/
        await allure.description("This test feature sorting product on inventory page.")
        await allure.story("User sorting & filtering product")

        await allure.step("User sorting products by name", async () => {
            await allure.step("User sorting products by name A-Z", async () => {
                await page.locator('[data-test="product-sort-container"]').selectOption('az');
            })
            await allure.step("User saw products sorted by name A-Z", async () => {
                await expect(page.locator('.inventory_container')).toBeVisible();
            })

            let first_AZ = await page.locator('.inventory_item').first()
            let first_AZ_name = await first_AZ.locator('.inventory_item_name').textContent()
            let last_AZ = await page.locator('.inventory_item').last()
            let last_AZ_name = await last_AZ.locator('.inventory_item_name').textContent()

            await allure.step("User sorting products by name Z-A", async () => {
                await page.locator('[data-test="product-sort-container"]').selectOption('za');
            })
            await allure.step("User saw products sorted by name Z-A", async () => {
                await expect(page.locator('.inventory_container')).toBeVisible();
            })

            let first_ZA = await page.locator('.inventory_item').first()
            let first_ZA_name = await first_ZA.locator('.inventory_item_name').textContent()
            let last_ZA = await page.locator('.inventory_item').last()
            let last_ZA_name = await last_ZA.locator('.inventory_item_name').textContent()

            await allure.step("Check sorting function name A-Z to name Z-A", async () => {
                await expect.soft(first_AZ_name).toBe(last_ZA_name)
                await expect.soft(first_ZA_name).toBe(last_AZ_name)
            })
        })
        
        await allure.step("User sorting products by price", async () => {
            await allure.step("User sorting products by price low-high", async () => {
                await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
            })
            await allure.step("User saw products sorted by price low-high", async () => {
                await expect(page.locator('.inventory_container')).toBeVisible();
            })

            let first_lohi = await page.locator('.inventory_item').first()
            let first_lohi_price = await first_lohi.locator('.inventory_item_price').textContent()
            let last_lohi = await page.locator('.inventory_item').last()
            let last_lohi_price = await last_lohi.locator('.inventory_item_price').textContent()

            await allure.step("User sorting products by price high-low", async () => {
                await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
            })
            await allure.step("User saw products  sorted by price high-low", async () => {
                await expect(page.locator('.inventory_container')).toBeVisible();
            })

            let first_hilo = await page.locator('.inventory_item').first()
            let first_hilo_price = await first_hilo.locator('.inventory_item_price').textContent()
            let last_hilo = await page.locator('.inventory_item').last()
            let last_hilo_price = await last_hilo.locator('.inventory_item_price').textContent()

            await allure.step("Check sorting function price lohi to price hilo", async () => {
                await expect.soft(first_lohi_price).toBe(last_hilo_price)
                await expect.soft(first_hilo_price).toBe(last_lohi_price)
            })
        })
    })
});

test.describe("Data Validation Test - Product", () => {
    test.beforeEach(async ({ page }) => {
        /** METADATA ALLURE REPORT*/
        await allure.owner("Karimah Azzuhdu")
        await allure.tags("Web Interface", "Product", "Data Validation")
        await allure.severity("critical")

        //suite structure
        await allure.parentSuite("Web Interface Test")
        await allure.suite("Product")
        await allure.subSuite("Data Validation")
        
        //behaviour structure
        await allure.epic("Web Interface");
        await allure.feature("Product Listing & Detail");

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
            await allure.step("User wait for Inventory Page loaded", async () => {
                await page.waitForURL('https://www.saucedemo.com/inventory.html');
            });
        })
    });

    test('Verify product information match across pages @allure.id:TC_PROD_02', async ({page}) => {
        /** METADATA ALLURE REPORT*/
        await allure.description("This test information matched between product listing and product detail.")
        await allure.story("Product Information");

        await allure.step("User saw Inventory Page", async () => {
            await expect(page.locator('.inventory_container')).toBeVisible();
            await expect(page.locator('.inventory_item').first()).toBeVisible();
        })

        /* first product on PRODUCT LISTING PAGE */
        let first_prod = await page.locator('.inventory_item').first()
        let listing_name = await first_prod.locator('.inventory_item_name').textContent()
        let listing_desc = await first_prod.locator('.inventory_item_desc').textContent()
        let listing_price = await first_prod.locator('.inventory_item_price').textContent()
        let listing_img_src = await first_prod.getByRole("img").getAttribute('src')

        await allure.step("User click first product on Inventory Page", async () => {
            await first_prod.getByRole("img").click()
            // await first_prod.locator('.inventory_item_label > .inventory_item_name').click()
            await page.waitForSelector('#inventory_item_container')
        })

        await allure.step("User saw Inventory Item Page", async () => {
            await expect(page.locator('[data-test="inventory-item-name"]')).toBeVisible()
            await expect(page.locator('[data-test="back-to-products"]')).toBeVisible()
        })
        
        /* PRODUCT DETAIL PAGE */
        let detail_name = await page.locator('[data-test="inventory-item-name"]').textContent()
        let detail_desc = await page.locator('.inventory_details_desc').textContent()
        let detail_price = await page.locator('.inventory_details_price').textContent()
        let detail_img_src = await page.locator('.inventory_details_img').getAttribute('src')

        await allure.step("Product information match across pages", async () => {
            await expect.soft(detail_name).toBe(listing_name)
            await expect.soft(detail_desc).toBe(listing_desc)
            await expect.soft(detail_price).toBe(listing_price)
            await expect.soft(detail_img_src).toBe(listing_img_src)
        })
    })
});