import {test, expect} from '@playwright/test'

//Pelajari cara bikin modular function disini
// function LoginFunc() {
//     await page.goto('https://www.saucedemo.com/');
//     await page.locator('[data-test="username"]').fill('standard_user');
//     await page.locator('[data-test="password"]').fill('secret_sauce');
//     await page.locator('[data-test="login-button"]').click();
// }

test('', async ({page}) => {
    // Prerequisites condition: User already log in (sementara copas aja)
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await page.goto('https://www.saucedemo.com/inventory.html')

    await page.goto('https://www.saucedemo.com/cart.html')

})