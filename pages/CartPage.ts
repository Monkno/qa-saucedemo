import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_list .cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  async removeFirstItem() {
    const removeBtn = this.page.locator('button:has-text("Remove")').first();
    await expect(removeBtn).toBeVisible();
    await removeBtn.click();
  }

  async expectItemCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async clickCheckout() {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
  }
}