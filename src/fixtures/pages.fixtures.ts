import { test } from '@playwright/test';
import { AppSteps } from '@steps/app.steps';

export type AppFixtures = {
  app: AppSteps;
};

export const appFixture = test.extend<AppFixtures>({});
