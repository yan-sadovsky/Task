import { test } from '@playwright/test';
import { SocketService } from '@services/socket/socket.service';
import { AuthSocketService } from '@services/auth/auth.socket.service';

export type SocketFixtures = {
  defaultSocket: SocketService;
  authSocketService: AuthSocketService;
};

export const socketFixture = test.extend<SocketFixtures>({});
