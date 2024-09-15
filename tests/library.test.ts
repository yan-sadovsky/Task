import { test } from '@fixtures/fixtures';
import { LoginPageSteps } from '@steps/login.steps';

// test('Open page login, click library - library contains correct html book', async ({ app }) => {
//   await app.loginPage.openPage();
// });

test('Dummy test - should be deleted', async ({ page, context }) => {
  const loginPage = new LoginPageSteps(page, context);
  await loginPage.openPage();
  await loginPage.assertLoginButtonIsVisible();
});
