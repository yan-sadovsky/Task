import { Page } from '@playwright/test';
import { Title } from '@components/title';

export class LoginPage {
  public readonly title: Title;

  constructor(private readonly page: Page) {
    this.title = new Title({ page: this.page, locator: 'title', name: 'login page title' });
  }
}
