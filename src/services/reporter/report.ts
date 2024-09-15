import { step, attachment } from 'allure-js-commons';

export const report = {
  step: <T>(name: string, body: () => Promise<T>): PromiseLike<T> => {
    return step(name, async () => {
      return await body();
    });
  },
  attach: async (value: unknown, attachmentName: string = 'Attachment'): Promise<void> => {
    const isObjectType = typeof value === 'object';
    const formatedAttachment = isObjectType ? JSON.stringify(value, null, 2) : String(value);
    const attachmentType = isObjectType ? 'application/json' : 'text/html';
    await attachment(attachmentName, formatedAttachment, attachmentType);
  },
};
