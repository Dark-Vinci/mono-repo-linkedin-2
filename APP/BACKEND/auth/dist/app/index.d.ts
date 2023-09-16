import { RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
export declare class ExceptionFilter implements RpcExceptionFilter<RpcException> {
    catch(exception: RpcException, _host: ArgumentsHost): Observable<never>;
}
