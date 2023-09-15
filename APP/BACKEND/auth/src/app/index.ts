import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    // @ts-ignore
    return undefined;
  }
  // catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
  // console.log({mymy: 'jlkdxndndfnj'})
  // return throwError(() => exception.getError());
  // catch(exception: RpcException, host: ArgumentsHost) {
  //   const error: any = exception.getError();
  //   const ctx = host.switchToHttp();
  //   const response = ctx.getResponse<Response>();
  //
  //   response.status(error.statusCode).json(error);
  //   // }
  // }
}
