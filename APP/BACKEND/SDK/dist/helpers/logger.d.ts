import { LoggerService, Logger } from '@nestjs/common';
import { Logger as WinstonLogger } from 'winston';
import { Type } from '../constants';
export declare class GlobalLogger extends Logger {
    private readonly logFilePath;
    private readonly errorFilePath;
    constructor(logFilePath: string, errorFilePath: string);
    private readonly logger;
    get getLogger(): WinstonLogger;
}
export declare class MyLogger implements LoggerService {
    private logger;
    private fileName;
    private methodName;
    private requestId;
    constructor(logger: WinstonLogger);
    static setContext(fileName: string, methodName: string, requestId: string, logger: WinstonLogger, payload?: Record<string, string | any>): MyLogger;
    logPayload(property: Record<string, string | any>, type: Type): void;
    log(message: string, ..._optionalParams: any[]): void;
    error(error: Error, ..._optionalParams: any[]): void;
    warn(message: string, ..._optionalParams: any[]): void;
    debug(message: string, ..._optionalParams: any[]): void;
    verbose(message: string, ..._optionalParams: any[]): void;
}
