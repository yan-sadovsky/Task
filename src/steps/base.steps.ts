import { BrowserContext, Page } from '@playwright/test';
import { step } from '@services/reporter/step.decorator';
import { report } from '@services/reporter/report';

export abstract class BaseSteps {
  public abstract get path(): string;

  protected constructor(
    protected readonly page: Page,
    protected readonly context: BrowserContext) {
  }

  @step('Opening the url "{0}"')
  async visit(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }

  async reload(): Promise<void> {
    const currentUrl = this.page.url();
    await report.step(`Reloading page with url "${currentUrl}"`, async () => {
      await this.page.reload({ waitUntil: 'domcontentloaded' });
    });
  }
}
