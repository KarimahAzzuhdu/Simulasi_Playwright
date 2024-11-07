import {test, expect} from '@playwright/test';
import * as allure from "allure-js-commons";

test.describe("Functionality Test - Login", async () => {
    test.beforeEach(async ({ page }) => {
        /** METADATA ALLURE REPORT*/
        await allure.owner("Karimah Azzuhdu")
        await allure.tags("Web Interface", "Login")
        await allure.severity("critical")

        //suite structure
        await allure.parentSuite("Web Interface Test")
        await allure.suite("Login")
        await allure.subSuite("Functionality")

        //behaviour structure
        await allure.epic("Web Interface");
        await allure.feature("Authentication");

        await allure.step("go to web demo", async () => {
            await page.goto('https://www.saucedemo.com/');
        })
    });
    
    test('Verify Login Page @allure.id:TC_LOG_01', async ({page}) => {
        /** METADATA ALLURE REPORT*/
        await allure.description("This test visibility login page.")
        await allure.story("Login page visual")

        await allure.step("User saw the Login Page", async () => {
            //Assertion : User can see login-container, username input field, password input field, and login button
            await expect(page.locator('[data-test="login-container"] div').filter({ hasText: 'Login' }).first()).toBeVisible();
            await expect(page.locator('[data-test="username"]').first()).toBeVisible();
            await expect(page.locator('[data-test="password"]').first()).toBeVisible();
            await expect(page.locator('[data-test="login-button"]').first()).toBeVisible();
        })
    })

    test('Verify login process with valid credentials @allure.id:TC_LOG_02', async ({page}) => {
        /** METADATA ALLURE REPORT*/
        await allure.description("This test functionality login with valid credentials.")
        await allure.tag("smoke")
        await allure.story("Valid User login to the web");
        
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
    
        await allure.step("User successfully login and saw logout option", async () => {
            await page.getByRole('button', { name: 'Open Menu' }).click();
        
            //Assertion: User can see Logout Button when open menu
            await expect(page.locator('[data-test="logout-sidebar-link"]')).toBeVisible();
        });

    })

    test('Verify logout process @allure.id:TC_LOG_06', async ({page}) => {
        /** METADATA ALLURE REPORT*/
        await allure.description("This test functionality logout.")
        await allure.tag("smoke")
        await allure.story("Valid User login to the web");

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
    
        await allure.step("User Logout", async () => {
            await allure.step("User click menu button", async () => {
                await page.getByRole('button', { name: 'Open Menu' }).click();
            })
            await allure.step("User click logout button", async () => {
                await page.locator('[data-test="logout-sidebar-link"]').click();
            })
            await allure.step("User successfully logout", async () => {
                //Assertion: User successfully redirect back to login page
                await expect(page.locator('[data-test="login-container"] div').filter({ hasText: 'Login' }).first()).toBeVisible();
            })
        })        
    })
});

test.describe("Error Handling Test - Login", async () => {
    test.beforeEach(async ({ page }) => {
        /** METADATA ALLURE REPORT*/
        await allure.owner("Karimah Azzuhdu")
        await allure.tags("Web Interface", "Login", "Error Handling")
        await allure.severity("normal")
        await allure.description("This test error message visibility when login with invalid credentials.")

        //suite structure
        await allure.parentSuite("Web Interface Test")
        await allure.suite("Login")
        await allure.subSuite("Error Handling")

        //behaviour structure
        await allure.epic("Web Interface");
        await allure.feature("Authentication");
        await allure.story("Invalid User login to the web");

        await allure.step("go to web demo", async () => {
            await page.goto('https://www.saucedemo.com/');
        })
    });

    test('Verify error message for blank username field @allure.id:TC_LOG_03', async ({page}) => {

        await allure.step("User click login button with blank username field", async () => {
            await page.locator('[data-test="login-button"]').click();
        });
    
        await allure.step("User saw Error Message displayed", async () => {
            //Assertion: Display "Username is required" message then close error message
            await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
        })

        await allure.step("User close error message", async () => {
            await page.locator('[data-test="error-button"]').click();
        })
    })
    
    test('Verify error message for blank password field @allure.id:TC_LOG_04', async ({page}) => {

        await allure.step("User click & fill username field", async () => {
                await page.locator('[data-test="username"]').click();
                await page.locator('[data-test="username"]').fill('standard_user');
            });
        
        await allure.step("User click login button with blank password field", async () => {
            await page.locator('[data-test="login-button"]').click();
        });

        await allure.step("User saw Error Message displayed", async () => {
            //Assertion: Display "Password is required" message then close error message
            await expect(page.locator('[data-test="error"]')).toContainText('Password is required');
        })

        await allure.step("User close error message", async () => {
            await page.locator('[data-test="error-button"]').click();
        })
    })
    
    test('Verify error message for incorrect password @allure.id:TC_LOG_05', async ({page}) => {
        await allure.step("User Login with invalid credentials", async () => {
            await allure.step("User click & fill username field with invalid username", async () => {
                await page.locator('[data-test="username"]').click();
                await page.locator('[data-test="username"]').fill('not_a_user');
            });
        
            await allure.step("User click & fill password field with invalid password", async () => {
                await page.locator('[data-test="password"]').click();
                await page.locator('[data-test="password"]').fill('not_a_sauce');
            });
        
            await allure.step("User click Login button with invalid credentials", async () => {
                await page.locator('[data-test="login-button"]').click();
            });
        })
    
        await allure.step("User saw Error Message displayed", async () => {
            //Assertion: Display "Username and password do not match any user in this service" message then close error message
            await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match any user in this service');
        })

        await allure.step("User close error message", async () => {
            await page.locator('[data-test="error-button"]').click();
        })
    })
});

test.describe("Error Handling Test - Access Web when Not Login", () => {
    test.beforeEach(async ({ page }) => {
        /** METADATA ALLURE REPORT*/
        await allure.owner("Karimah Azzuhdu")
        await allure.tags("Web Interface", "Login", "Error Handling")
        await allure.severity("normal")

        //suite structure
        await allure.parentSuite("Web Interface Test")
        await allure.suite("Login")
        await allure.subSuite("Error Handling")

        //behaviour structure
        await allure.epic("Web Interface");
        await allure.feature("Authentication");
        await allure.story("User access Web without Login");
    });

    test('Verify error message for cart page without login', async ({page}) => {
        /** METADATA ALLURE REPORT*/
        await allure.description("This test error message visibility access cart page without Login.")

        await allure.step("User go to cart page without Login", async () => {
            await page.goto('https://www.saucedemo.com/cart.html')
        })

        await allure.step("User redirect to login page", async () => {
            await page.waitForURL('https://www.saucedemo.com/')
        })

        await allure.step("User saw Error Message displayed", async () => {
            //Assertion: Display "You can only access '/inventory.html' when you are logged in." message
            await expect(page.locator('[data-test="error"]')).toContainText("You can only access '/cart.html' when you are logged in");
        })
    })

    test('Verify error message for access inventory page without login', async ({page}) => {
        /** METADATA ALLURE REPORT*/
        await allure.description("This test error message visibility access inventory page without Login.")

        await allure.step("User go to inventory page without Login", async () => {
            await page.goto('https://www.saucedemo.com/inventory.html')
        })
    
        await allure.step("User redirect to login page", async () => {
            await page.waitForURL('https://www.saucedemo.com/')
        })

        await allure.step("User saw Error Message displayed", async () => {
            //Assertion: Display "You can only access '/inventory.html' when you are logged in." message
            await expect(page.locator('[data-test="error"]')).toContainText("You can only access '/inventory.html' when you are logged in");
        })
    })
    
    test('Verify error message for access inventory-item page without login', async ({page}) => {
        /** METADATA ALLURE REPORT*/
        await allure.description("This test error message visibility access inventory-item page without Login.")

        await allure.step("User go to inventory-item page without Login", async () => {
            await page.goto('https://www.saucedemo.com/inventory-item.html?id=4')
        })
    
        await allure.step("User redirect to login page", async () => {
            await page.waitForURL('https://www.saucedemo.com/')
        })

        await allure.step("User saw Error Message displayed", async () => {
            //Assertion: Display "You can only access '/inventory.html' when you are logged in." message
            await expect(page.locator('[data-test="error"]')).toContainText("You can only access '/inventory-item.html' when you are logged in");
        })
    })

    test('Verify error message for checkout-information page without login', async ({page}) => {
        /** METADATA ALLURE REPORT*/
        await allure.description("This test error message visibility access checkout-information page without Login.")

        await allure.step("User go to checkout-information page without Login", async () => {
            await page.goto('https://www.saucedemo.com/checkout-step-one.html')
        })
    
        await allure.step("User redirect to login page", async () => {
            await page.waitForURL('https://www.saucedemo.com/')
        })

        await allure.step("User saw Error Message displayed", async () => {
            //Assertion: Display "You can only access '/inventory.html' when you are logged in." message
            await expect(page.locator('[data-test="error"]')).toContainText("You can only access '/checkout-step-one.html' when you are logged in");
        })
    })

    test('Verify error message for checkout-overview inventory page without login', async ({page}) => {
        /** METADATA ALLURE REPORT*/
        await allure.description("This test error message visibility access checkout-overview page without Login.")

        await allure.step("User go to checkout-overview page without Login", async () => {
            await page.goto('https://www.saucedemo.com/checkout-step-two.html')
        })
    
        await allure.step("User redirect to login page", async () => {
            await page.waitForURL('https://www.saucedemo.com/')
        })

        await allure.step("User saw Error Message displayed", async () => {
            //Assertion: Display "You can only access '/inventory.html' when you are logged in." message
            await expect(page.locator('[data-test="error"]')).toContainText("You can only access '/checkout-step-two.html' when you are logged in");
        })
    })

    test('Verify error message for checkout-complete inventory page without login', async ({page}) => {
        /** METADATA ALLURE REPORT*/
        await allure.description("This test error message visibility access checkout-complete page without Login.")

        await allure.step("User go to checkout-complete page without Login", async () => {
            await page.goto('https://www.saucedemo.com/checkout-complete.html')
        })
    
        await allure.step("User redirect to login page", async () => {
            await page.waitForURL('https://www.saucedemo.com/')
        })

        await allure.step("User saw Error Message displayed", async () => {
            //Assertion: Display "You can only access '/inventory.html' when you are logged in." message
            await expect(page.locator('[data-test="error"]')).toContainText("You can only access '/checkout-complete.html' when you are logged in");
        })
    })
});