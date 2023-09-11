/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoggerService, Logger } from '@nestjs/common';
import {
  format,
  createLogger,
  transports,
  Logger as WinstonLogger,
} from 'winston';

export class GlobalLogger extends Logger {
  public constructor(
    private readonly logFilePath: string,
    private readonly errorFilePath: string,
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

  public constructor(private readonly logger: WinstonLogger) {}

  public setContext(fileName: string, methodName: string, requestId: string) {
    this.fileName = fileName;
    this.methodName = methodName;
    this.requestId = requestId;
  }

  log(message: string, ..._optionalParams: any[]) {
    const body = {
      fileName: this.fileName,
      methodName: this.methodName,
      requestId: this.requestId,
      timeStamp: new Date().toISOString(),
      message: message,
    };

    this.logger.info(JSON.stringify(body));
  }

  public error(message: string, ..._optionalParams: any[]) {
    // throw new Error('Method not implemented.');
    const body = {
      fileName: this.fileName,
      methodName: this.methodName,
      requestId: this.requestId,
      timeStamp: new Date().toISOString(),
      message: message,
    };

    this.logger.error(JSON.stringify(body));
  }

  public warn(message: string, ..._optionalParams: any[]) {
    const body = {
      fileName: this.fileName,
      methodName: this.methodName,
      requestId: this.requestId,
      timeStamp: new Date().toISOString(),
      message: message,
    };

    this.logger.warn(JSON.stringify(body));
  }

  public debug(message: string, ..._optionalParams: any[]) {
    const body = {
      fileName: this.fileName,
      methodName: this.methodName,
      requestId: this.requestId,
      timeStamp: new Date().toISOString(),
      message: message,
    };

    this.logger.debug(JSON.stringify(body));
  }

  public verbose(message: string, ..._optionalParams: any[]) {
    const body = {
      fileName: this.fileName,
      methodName: this.methodName,
      requestId: this.requestId,
      timeStamp: new Date().toISOString(),
      message: message,
    };

    this.logger.verbose(JSON.stringify(body));
  }
}
