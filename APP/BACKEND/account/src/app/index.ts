import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catch(exception: RpcException, _host: ArgumentsHost): Observable<never> {
    return throwError(() => exception.getError());
  }
}

export { AppServiceModule as default } from './app.module';
export * from './app';
export * from './login';
export * from './signup';
