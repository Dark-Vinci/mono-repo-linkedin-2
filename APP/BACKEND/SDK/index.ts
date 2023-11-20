enum DecoratorFor {
    METHOD = 'method',
  }

export function LoggerDecorator<
    DType extends { run: () => Promise<void> }
  >(
    defer?: DType
  ): any {
  return function <
    C extends { name: string; kind: string } = any
  >(
    target: any,
    context: C,
  ): any {
    if (context.kind == DecoratorFor.METHOD) {
      return async function (
        this: any, 
        ...args: any[]
      ): Promise<any> {

        try {
          const start = Date.now();

          // apply the method
          const response = await target.apply(this, args);

          // convert time to seconds
          const duration = (Date.now() - start) / 1000;

          console.log({
            duration,
            response,
            payload: args[0],
          })

          return response;
        } catch (error: unknown) {
          console.log('[ERROR] -> In the unknown universe')
          console.log({ error: (<any>error).message });
        }
      };
    }
  };
}

class Me {
  @LoggerDecorator()
  public static async me(name: string): Promise<any> {
      console.log('herehere')
      return Promise.resolve(name);
  }

  @LoggerDecorator()
  public static async err(name: string): Promise<any> {
    throw new Error(name)
    // new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     // console.
    //     reject('something bad really happened');
    //   }, 1000)
    // })
  }
}

// console.log({ abc: await Me.me() });

Me.me('okay google').then((response) => {console.log({ response })})

Me.err('nope siri').catch((error) => {console.log({ error })})