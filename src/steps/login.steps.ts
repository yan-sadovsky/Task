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

  async login(user: { name: string; password: string }): Promise<void> {
    await this.page.getByPlaceholder('Enter email address here').fill(user.name);
    await this.page.getByPlaceholder('Enter password here').fill(user.password);
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  async assertLoginButtonIsVisible(): Promise<void> {
    // TODO
  }
}
