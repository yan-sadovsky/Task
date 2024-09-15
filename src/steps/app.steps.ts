import { BrowserContext, Page } from '@playwright/test';
import { LoginPageSteps } from './login.steps';

export class AppSteps {
  public loginPage: LoginPageSteps;

  public constructor(page: Page, context: BrowserContext) {
    this.loginPage = new LoginPageSteps(page, context);
  }
}
