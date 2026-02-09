import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('SauceDemo - POM Basic Suite', () => {
  test('TC1 - Login exitoso', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.loginExpectSuccess('standard_user', 'secret_sauce');
    await inventory.expectLoaded();
  });

  test('TC2 - Login fallido (credenciales inválidas)', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('invalid_user', 'invalid_pass');
    await login.expectErrorContains('do not match');
  });

  test('TC3 - Agregar producto al carrito', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.loginExpectSuccess('standard_user', 'secret_sauce');
    await inventory.expectLoaded();
    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.expectCartBadgeCount(1);
  });

  test('TC4 - Remover producto del carrito', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await login.goto();
    await login.loginExpectSuccess('standard_user', 'secret_sauce');
    await inventory.expectLoaded();

    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();
    await cart.expectLoaded();

    await cart.expectItemCount(1);
    await cart.removeFirstItem();
    await cart.expectItemCount(0);
  });

  test('TC5 - Completar checkout', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await login.goto();
    await login.loginExpectSuccess('standard_user', 'secret_sauce');
    await inventory.expectLoaded();

    await inventory.addProductToCart('Sauce Labs Backpack');
    await inventory.goToCart();
    await cart.expectLoaded();

    await cart.clickCheckout();
    await checkout.fillStepOne('Luis', 'Urea', '1000');
    await checkout.finish();

    await expect(page.locator('.complete-header')).toContainText('Thank you');
  });
});