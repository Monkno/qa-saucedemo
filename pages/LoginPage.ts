import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorBox = page.locator('[data-test="error"]');
  }

  async loginExpectSuccess(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await Promise.all([
      this.page.waitForURL(/inventory\.html/, { timeout: 10000 }),
      this.loginButton.click(),
    ]);
  }

  async goto() {
    await this.page.goto('/');
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.loginButton.click();
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submit();
  }

  async expectErrorContains(text: string) {
    await expect(this.errorBox).toBeVisible();
    await expect(this.errorBox).toContainText(text);
  }
}