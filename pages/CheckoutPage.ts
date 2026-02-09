import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('.complete-header');
  }

  async fillStepOne(first: string, last: string, zip: string) {
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(zip);
    await this.continueButton.click();
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
  }

  async finish() {
    await this.finishButton.click();
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.completeHeader).toBeVisible();
  }
}