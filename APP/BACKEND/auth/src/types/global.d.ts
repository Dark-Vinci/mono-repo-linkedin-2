declare global {
  namespace NodeJS {
    interface Global {
      logger: any;
    }
  }
}

type OrNull<Type> = Type | null;

type OneOrMany<Type> = Type | Type[];

type OneOrManyOrNull = OrNull<OneOrMany<Type>>;

// declare enum MethodName {
//   PING = 'ping',
// }

interface AppController {
  readonly globalLogger: any;
  readonly appService: any;
  ping(payload: any): Promise<any>;
}
