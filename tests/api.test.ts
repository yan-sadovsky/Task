import { test } from '@fixtures/fixtures';
import { SocketService } from '@services/socket/socket.service';
import { env } from '@services/environment/env.service';
import { expect } from '@playwright/test';

test('Register new user', async () => {
  //TODO: attach to allure and pass options or merge them
  const socketService = new SocketService(env.SOCKET_URL, {});
  // - подключиться по websocket к wss://gof.work.gd/v4/socket.io
  await socketService.connect();
  //- проверить, что с backend пришел push locale и имеет значение en
  const locale = await socketService.getMessage('locale');
  expect(locale).toEqual('en');
  // - проверить, что с backend пришел push с secret_key и значение не пустое
  const key = await socketService.getMessage('secret_key');
  expect(key).not.toBe(undefined);
  // - провалидировать схемы полученных пушей от backend
  // TODO:

  // - используя полученный от backend push с secret_key, отправить корректное сообщение и зарегистрировать пользователя
  const regiserUserMessage = {
    secret_key: key,
    type: 'AUTH:register',
    name: 'auto.test@email.aa1',
    password: 'Psw@12345',
  };

  await socketService.sendMessage(regiserUserMessage);

  // - проверить, что пришел успешный ответ о регистрации пользователя
  const response = await socketService.getResponse();
  expect(response).toEqual({ success: true, message: `User '${regiserUserMessage.name}' successfully registered!` });

  // - провалидировать схему ответа от backend
  // TODO:

  await socketService.disconnect();
});
