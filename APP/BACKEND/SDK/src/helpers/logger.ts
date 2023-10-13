/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoggerService, Logger } from '@nestjs/common';
import {
  format,
  createLogger,
  transports,
  Logger as WinstonLogger,
} from 'winston';
import('winston-mongodb');

import { Type, mongoURL } from '../constants';

export class GlobalLogger extends Logger {
  public constructor(
    private readonly logFilePath: string,
    private readonly errorFilePath: string,
    private readonly mongoCollectionName: string,
  ) {
    super();
  }

  private readonly logger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp(),
      format.json(), // Log messages as JSON objects
    ),
    transports: [
      // Log to console
      new transports.Console({
        format: format.combine(
          format.colorize(), // Apply colors to console output
          format.simple(),
        ),
      }),
      // Log to a file
      new transports.File({
        filename: this.logFilePath, // Change the path as needed
        level: 'info',
      }),
      // Log errors to a separate error file
      new transports.File({
        filename: this.errorFilePath, // Change the path as needed
        level: 'error',
      }),
      // insert into mongodb
      new transports.MongoDB({
        db: mongoURL,
        options: { useUnifiedTopology: true },
        collection: this.mongoCollectionName,
        level: 'debug',
      }),
    ],
  });

  public get getLogger(): WinstonLogger {
    return this.logger;
  }
}

export class MyLogger implements LoggerService {
  private fileName: string;
  private methodName: string;
  private requestId: string;

  public constructor(private logger: WinstonLogger) {}

  public static setContext(
    fileName: string,
    methodName: string,
    requestId: string,
    logger: WinstonLogger,
    payload: Record<string, string | any> = {},
  ): MyLogger {
    const logInstance = new MyLogger(logger);
    logInstance.fileName = fileName;
    logInstance.methodName = methodName;
    logInstance.requestId = requestId;
    logInstance.logger = logger;
    logInstance.logPayload(payload, Type.REQUEST_PAYLOAD);

    return logInstance;
  }

  public logPayload(property: Record<string, string | any>, type: Type) {
    this.logger.info({
      fileName: this.fileName,
      methodName: this.methodName,
      requestId: this.requestId,
      timestamp: new Date().toISOString(),
      message: property,
      type,
    });
  }

  log(message: string, ..._optionalParams: any[]) {
    this.logger.info({
      fileName: this.fileName,
      methodName: this.methodName,
      requestId: this.requestId,
      timestamp: new Date().toISOString(),
      message: message,
    });
  }

  public error(error: Error, ..._optionalParams: any[]) {
    this.logger.error({
      fileName: this.fileName,
      methodName: this.methodName,
      requestId: this.requestId,
      timestamp: new Date().toISOString(),
      message: error.message,
      error,
    });
  }

  public warn(message: string, ..._optionalParams: any[]) {
    this.logger.warn({
      fileName: this.fileName,
      methodName: this.methodName,
      requestId: this.requestId,
      timestamp: new Date().toISOString(),
      message: message,
    });
  }

  public debug(message: string, ..._optionalParams: any[]) {
    this.logger.debug({
      fileName: this.fileName,
      methodName: this.methodName,
      requestId: this.requestId,
      timestamp: new Date().toISOString(),
      message: message,
    });
  }

  public verbose(message: string, ..._optionalParams: any[]) {
    this.logger.verbose({
      fileName: this.fileName,
      methodName: this.methodName,
      requestId: this.requestId,
      timestamp: new Date().toISOString(),
      message: message,
    });
  }
}
