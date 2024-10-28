import {test, expect} from '@playwright/test'

/**
 * TEST dengan Skenario yang diharapkan menghasilkan error/fail
 */
test.describe("@explore - Test pass when fail", () =>{ 
    test.fail('Can not access inventory page without login', async ({page}) => {
        await page.goto('https://www.saucedemo.com/inventory.html');

        await expect(page.locator('.inventory_container')).toBeVisible();
    })

    test.fail('Can not access inventory-item page without login', async ({page}) => {
        await page.goto('https://www.saucedemo.com/inventory-item.html?id=4')

        await expect(page.locator('#inventory_item_container')).toBeVisible();
    })

    test.fail('Can not access cart page without login', async ({page}) => {
        await page.goto('https://www.saucedemo.com/cart.html')

        await expect(page.locator('.title')).toContainText('Your Cart');
    })

    test.fail('Can not access checkout-info page without login', async ({page}) => {
        await page.goto('https://www.saucedemo.com/checkout-step-one.html')

        await expect(page.locator('.title')).toContainText('Checkout: Your Information');
    })

    test.fail('Can not access checkout-overview page without login', async ({page}) => {
        await page.goto('https://www.saucedemo.com/checkout-step-two.html')

        await expect(page.locator('.title')).toContainText('Checkout: Overview');
    })

    test.fail('Can not access checkout-complete page without login', async ({page}) => {
        await page.goto('https://www.saucedemo.com/checkout-complete.html')

        await expect(page.locator('.title')).toContainText('Checkout: Complete!');
    })

    // masih kotret-kotret untuk belajar bagaimana kerja Github Actions
    test.fail('Test Github Actions - hasilnya failed', async ({page}) => {
        // Prerequisites condition: User already log in (sementara copas aja)
        await page.goto('https://www.saucedemo.com/');
        //problem_user
        await page.locator('[data-test="username"]').fill('problem_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        await page.waitForURL('https://www.saucedemo.com/inventory.html')

        //expect error buat test github action
        await expect.soft(page.locator('#item_4_img_link > img:nth-child(1)')).not.toBeVisible()
        // await expect.soft(page.locator('#item_4_img_link > img:nth-child(1)')).toBeVisible()

        // failed soft assertions do not terminate test execution, but mark the test as failed.
        await expect(page.locator('.inventory_container')).toBeVisible();
        await expect(page.locator('[data-test="title"]')).toContainText('Products');
    })
})