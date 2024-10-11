import {test, expect} from '@playwright/test'

test('Verify Login Page', async ({page}) => {
    await page.goto('https://www.saucedemo.com/')
    
    //User can see login-container, username input field, password input field, and login button
    await expect(page.locator('[data-test="login-container"] div').filter({ hasText: 'Login' }).first()).toBeVisible();
    await expect(page.locator('[data-test="username"]').first()).toBeVisible();
    await expect(page.locator('[data-test="password"]').first()).toBeVisible();
    await expect(page.locator('[data-test="login-button"]').first()).toBeVisible();
})

test('Verify login with valid credentials', async ({page}) => {
    await page.goto('https://www.saucedemo.com/')
    
    // User click & fill username field with valid username
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');

    // User click & fill password field with valid password
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // User click Login button
    await page.locator('[data-test="login-button"]').click();

    // User successfully navigates to product page and can see Logout Button when open menu
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await expect(page.locator('[data-test="logout-sidebar-link"]')).toBeVisible();
})

test('Verify error message for blank username fields', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');

    // User click login button without fill username field
    await page.locator('[data-test="login-button"]').click();

    // Display "Username is required" message
    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
    await page.locator('[data-test="error-button"]').click();
})

test('Verify error message for blank password fields', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');

    // User click & fill username field with valid username
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');

    // User click login button without fill password field
    await page.locator('[data-test="login-button"]').click();

    // Display "Password is required" message
    await expect(page.locator('[data-test="error"]')).toContainText('Password is required');
    await page.locator('[data-test="error-button"]').click();
})

test('Verify error message for incorrect password', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
    
    // User click & fill username field with invalid username
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('not_a_user');

    // User click & fill password field with invalid password
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('public_sauce');

    // User click login button with invalid and/or credentials
    await page.locator('[data-test="login-button"]').click();

    // Display "Username and password do not match any user in this service" message
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match any user in this service');
    await page.locator('[data-test="error-button"]').click();
})

test('Verify logout', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
    
    // User Login
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // User click Menu Button & click Logout
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();

    // User successfully redirect back to login page
    await expect(page.locator('[data-test="login-container"] div').filter({ hasText: 'Login' }).first()).toBeVisible();
})