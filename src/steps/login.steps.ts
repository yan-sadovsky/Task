import { BaseSteps } from './base.steps';
import { BrowserContext, Page } from '@playwright/test';

export class LoginPageSteps extends BaseSteps {
  public get path(): string {
    return '/login';
  }

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
  }

  async openPage(): Promise<void> {
    await this.visit(this.path);
  }

  async assertLoginButtonIsVisible(): Promise<void> {
    // TODO
  }
}
