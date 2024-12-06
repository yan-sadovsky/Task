import { test } from '@fixtures/fixtures';
import { expect } from '@playwright/test';

test('Open page login, click library - library contains correct html book', async ({ app }) => {
  /*
2 - E2E тест
Предусловие:
Для каждого запуска теста нужен новый зарегистрированный пользователь. Создать
пользователя можно только через API бекенда
- зарегистрировать пользователя по сценарию из API теста
*/

  const user = {
    name: 'auto.test@email.aa1',
    password: 'Psw@12345',
  };
  // - открыть браузер и перейти на страницу https://gof.work.gd
  await app.loginPage.openPage();
  // - авторизоваться зарегистрированным пользователем
  await app.loginPage.login(user);
  // - нажать на меню “Library” в панели навигации
  await app.homePage.openMenu('Library');
  // - выбрать пункт “Internet” –> “Hello! HTML5 & CSS3”
  await app.homePage.openSubMenu('Internet', 'Hello! HTML5 & CSS3');
  // - проверить, что карточка содержит верный title и автора “Rob Crowther”
  // - проверить что карточка содержит “isbn : 1935182897”
  // - проверить что карточка содержит “pageCount : 325”
  const expectedCardInfo = {
    title: 'Hello! HTML5 & CSS3',
    authour: 'Rob Crowther',
    isbn: '1935182897',
    pageCount: '325',
  };

  expect(await app.card.getInfo()).toEqual(expectedCardInfo);

  //await page.getByRole('link', { name: 'Library' }).click();
  //await page.getByRole('link', { name: 'Internet' }).click();
  //await page.getByRole('link', { name: 'Hello! HTML5 & CSS3 PUBLISH' }).click();
  //await page.getByRole('heading', { name: 'Rob Crowther' }).click();
  //await expect(page.getByRole('main')).toContainText('isbn : 1935182897pageCount : 325');

  // https://gof.work.gd/categories/Internet/65
});
