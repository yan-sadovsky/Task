import { Page } from '@playwright/test';
import { report } from '@services/reporter/report';

export type ComponentProps = {
  page: Page;
  locator: string;
  name?: string;
  iframe?: string;
};

export abstract class Component {
  protected page: Page;
  protected locator: string;
  private readonly name: string | undefined;
  private readonly iframe: string | undefined;

  public constructor({ page, locator, name, iframe }: ComponentProps) {
    this.page = page;
    this.locator = locator;
    this.name = name;
    this.iframe = iframe;
  }

  async click(): Promise<void> {
    await report.step(`Perform click on ${this.name} on iframe ${this.iframe}`, async () => {
      throw new Error('Method should be implemented');
    });
  }
}
