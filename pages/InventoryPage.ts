import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryContainer: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = page.locator('#inventory_container');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.page.locator('.inventory_list')).toBeVisible();
  }

  async addFirstItemToCart() {
    const addBtn = this.page.locator('button:has-text("Add to cart")').first();
    await expect(addBtn).toBeVisible();
    await addBtn.click();
  }

  async addProductToCart(productName: string) {
    const item = this.page.locator('.inventory_item').filter({ hasText: productName });
    await item.locator('button:has-text("Add to cart")').click();
  }

  async removeProductFromCart(productName: string) {
    const item = this.page.locator('.inventory_item').filter({ hasText: productName });
    await expect(item).toBeVisible();
    await item.locator('button:has-text("Remove")').click();
  }

  async goToCart() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  async expectCartBadgeCount(expected: number) {
    const badge = this.page.locator('.shopping_cart_badge');
    if (expected === 0) {
      await expect(badge).toHaveCount(0);
    } else {
      await expect(badge).toHaveText(String(expected));
    }
  }
}