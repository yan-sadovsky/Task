import { mergeTests } from '@playwright/test';
import { appFixture } from '@fixtures/pages.fixtures';
import { socketFixture } from '@fixtures/socket.fixtures';

export const test = mergeTests(appFixture, socketFixture);
