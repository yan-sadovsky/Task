import { report } from './report';

type ClassMethodDecoratorContextType = {
  kind: 'method';
  name: string | symbol;
  access: { get(): unknown };
  static: boolean;
  private: boolean;
  addInitializer(initializer: () => void): void;
};

export function step(value: string, logReturnValue: boolean = false): any {
  return (target: Function, context: ClassMethodDecoratorContextType) => {
    if (context.kind !== 'method') {
      throw new Error('The "step" decorator can only be applied to method');
    }
    return function(...args: Array<any>) {
      return report.step(replaceArgs(value, ...args), async () => {
        const res = await target.apply(this, args);
        if (logReturnValue) {
          await report.attach(res);
        }
        return res;
      });
    };
  };
}

const replaceArgs = (str: string, ...params: Array<string | number>): string => {
  params.forEach((param, index) => (str = str.replace(`{${index}}`, String(param))));
  return str;
};
