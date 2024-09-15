import { test } from '@fixtures/fixtures';

test('Open page login, click library - library contains correct html book', async ({ app }) => {
  await app.loginPage.openPage();
});
